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

type BlogHandler struct {
	DB *gorm.DB
}

func (h *BlogHandler) GetPosts(c *gin.Context) {
	var posts []models.BlogPost
	h.DB.Order("created_at desc").Find(&posts)
	c.JSON(http.StatusOK, posts)
}

func (h *BlogHandler) GetPost(c *gin.Context) {
	slug := c.Param("slug")
	var post models.BlogPost
	if err := h.DB.Where("slug = ?", slug).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}
	c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) CreatePost(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cover image is required (16:9)"})
		return
	}

	title := c.PostForm("title")
	slug := c.PostForm("slug")
	content := c.PostForm("content")

	// Upload Cover Image to MinIO
	openedFile, _ := file.Open()
	defer openedFile.Close()

	fileName := fmt.Sprintf("blog-%s", file.Filename)
	_, err = utils.MinioClient.PutObject(context.Background(), utils.BucketName, fileName, openedFile, file.Size, minio.PutObjectOptions{
		ContentType: file.Header.Get("Content-Type"),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload cover image"})
		return
	}

	imageURL := fmt.Sprintf("%s/%s/%s", os.Getenv("MINIO_PUBLIC_URL"), utils.BucketName, fileName)

	post := models.BlogPost{
		Title:     title,
		Slug:      slug,
		Content:   content,
		ImageURL:  imageURL,
		Published: true,
	}

	if err := h.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save post"})
		return
	}

	c.JSON(http.StatusCreated, post)
}

func (h *BlogHandler) DeletePost(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.BlogPost{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}
