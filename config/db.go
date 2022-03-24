package config

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct {
	Client *mongo.Client
	DB     *mongo.Database
}

var MgDB MongoInstance

func ConnectDB() {
	client, err := mongo.NewClient(options.Client().ApplyURI(GetConfig().Mongo.URI))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	db := client.Database(GetConfig().Mongo.MongoDBName)

	if err != nil {
		fmt.Println(strings.Repeat("!", 40))
		fmt.Println("☹️  Could Not Establish Mongo DB Connection")
		fmt.Println(strings.Repeat("!", 40))

		log.Fatal(err)
	}

	// err = client.Ping(ctx, readpref.Primary())
	// if err != nil {
	// 	log.Fatal(err)
	// }

	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("😀 Connected To Mongo DB")
	fmt.Println(strings.Repeat("-", 40))

	MgDB = MongoInstance{
		Client: client,
		DB:     db,
	}
}
