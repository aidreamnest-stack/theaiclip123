package main

import (
	"log"
	"os"

	"theaiclip/backend/handlers"
	"theaiclip/backend/models"
	"theaiclip/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func initDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=theaiclip port=5432 sslmode=disable"
	}
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate
	db.AutoMigrate(&models.Category{}, &models.Wallpaper{}, &models.User{}, &models.BlogPost{})
}

func main() {
	godotenv.Load()
	initDB()
	utils.InitMinio()

	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	wallpaperHandler := handlers.WallpaperHandler{DB: db}
	categoryHandler := handlers.CategoryHandler{DB: db}
	blogHandler := handlers.BlogHandler{DB: db}

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "pong"})
		})

		api.GET("/wallpapers", wallpaperHandler.GetWallpapers)
		api.GET("/wallpapers/:id", wallpaperHandler.GetWallpaper)
		api.POST("/wallpapers", wallpaperHandler.CreateWallpaper)
		api.DELETE("/wallpapers/:id", wallpaperHandler.DeleteWallpaper)

		api.GET("/categories", categoryHandler.GetCategories)
		api.POST("/categories", categoryHandler.CreateCategory)

		api.GET("/posts", blogHandler.GetPosts)
		api.GET("/posts/:slug", blogHandler.GetPost)
		api.POST("/posts", blogHandler.CreatePost)
		api.DELETE("/posts/:id", blogHandler.DeletePost)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
