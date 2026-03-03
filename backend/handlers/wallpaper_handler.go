package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"theaiclip/backend/models"
	"theaiclip/backend/utils"

	"github.com/gin-gonic/gin"
	minio "github.com/minio/minio-go/v7"
	"gorm.io/gorm"
)

type WallpaperHandler struct {
	DB *gorm.DB
}

func (h *WallpaperHandler) GetWallpapers(c *gin.Context) {
	var wallpapers []models.Wallpaper
	h.DB.Preload("Category").Find(&wallpapers)
	c.JSON(http.StatusOK, wallpapers)
}

func (h *WallpaperHandler) GetWallpaper(c *gin.Context) {
	id := c.Param("id")
	var wallpaper models.Wallpaper
	if err := h.DB.Preload("Category").First(&wallpaper, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Wallpaper not found"})
		return
	}
	c.JSON(http.StatusOK, wallpaper)
}

func (h *WallpaperHandler) CreateWallpaper(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No image uploaded"})
		return
	}

	title := c.PostForm("title")
	description := c.PostForm("description")
	categoryID := c.PostForm("category_id")
	wallpaperType := c.PostForm("type") // "mobile" or "desktop"

	// Upload to MinIO
	openedFile, _ := file.Open()
	defer openedFile.Close()

	fileName := fmt.Sprintf("%s-%s", wallpaperType, file.Filename)
	_, err = utils.MinioClient.PutObject(context.Background(), utils.BucketName, fileName, openedFile, file.Size, minio.PutObjectOptions{
		ContentType: file.Header.Get("Content-Type"),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload to storage"})
		return
	}

	imageURL := fmt.Sprintf("%s/%s/%s", os.Getenv("MINIO_PUBLIC_URL"), utils.BucketName, fileName)

	var catID uint
	fmt.Sscanf(categoryID, "%d", &catID)

	wallpaper := models.Wallpaper{
		Title:       title,
		Description: description,
		URL:         imageURL,
		Thumbnail:   imageURL,
		Type:        wallpaperType,
		CategoryID:  catID,
	}

	if err := h.DB.Create(&wallpaper).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save wallpaper"})
		return
	}

	c.JSON(http.StatusCreated, wallpaper)
}
