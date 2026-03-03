package utils

import (
	"context"
	"log"
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var MinioClient *minio.Client
var BucketName string

func InitMinio() {
	endpoint := os.Getenv("MINIO_ENDPOINT")
	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	BucketName = os.Getenv("MINIO_BUCKET")
	useSSL := false // Set to true if using SSL

	if endpoint == "" {
		endpoint = "localhost:9000"
		accessKey = "minioadmin"
		secretKey = "minioadmin"
		BucketName = "wallpapers"
	}

	var err error
	MinioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalln("Failed to initialize MinIO client:", err)
	}

	// Create bucket if not exists
	ctx := context.Background()
	exists, err := MinioClient.BucketExists(ctx, BucketName)
	if err != nil {
		log.Fatalln("Failed to check bucket existence:", err)
	}
	if !exists {
		err = MinioClient.MakeBucket(ctx, BucketName, minio.MakeBucketOptions{})
		if err != nil {
			log.Fatalln("Failed to create bucket:", err)
		}

		// Set public policy for the bucket so images can be accessed directly
		policy := `{
			"Version": "2012-10-17",
			"Statement": [
				{
					"Effect": "Allow",
					"Principal": {"AWS": ["*"]},
					"Action": ["s3:GetBucketLocation", "s3:ListBucket"],
					"Resource": ["arn:aws:s3:::` + BucketName + `"]
				},
				{
					"Effect": "Allow",
					"Principal": {"AWS": ["*"]},
					"Action": ["s3:GetObject"],
					"Resource": ["arn:aws:s3:::` + BucketName + `/*"]
				}
			]
		}`
		err = MinioClient.SetBucketPolicy(ctx, BucketName, policy)
		if err != nil {
			log.Fatalln("Failed to set bucket policy:", err)
		}
	}
}
