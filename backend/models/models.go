package models

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name       string      `gorm:"uniqueIndex;not null" json:"name"`
	Slug       string      `gorm:"uniqueIndex;not null" json:"slug"`
	Wallpapers []Wallpaper `json:"wallpapers"`
}

type Wallpaper struct {
	gorm.Model
	Title       string   `json:"title"`
	Description string   `json:"description"`
	URL         string   `json:"url"` // MinIO URL
	Thumbnail   string   `json:"thumbnail"`
	Type        string   `json:"type"` // "mobile" (9:16) or "desktop" (16:9)
	CategoryID  uint     `json:"category_id"`
	Category    Category `json:"category"`
	Tags        string   `json:"tags"` // Comma separated tags
	Views       int      `json:"views" gorm:"default:0"`
	Downloads   int      `json:"downloads" gorm:"default:0"`
}

type BlogPost struct {
	gorm.Model
	Title     string `gorm:"not null" json:"title"`
	Slug      string `gorm:"uniqueIndex;not null" json:"slug"`
	Content   string `gorm:"type:text" json:"content"`
	ImageURL  string `json:"image_url"` // Always 16:9
	Author    string `json:"author"`
	Published bool   `gorm:"default:false" json:"published"`
}

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex;not null" json:"username"`
	Password string `json:"-"` // Hashed password
}
