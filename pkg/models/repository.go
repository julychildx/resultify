package models

import (
	"resultify/config"

	"go.mongodb.org/mongo-driver/mongo"
)

var (
	db       *mongo.Database
	Gradings []Grading
)

func init() {
	Gradings = GradingList{
		Grading{Grade: "A", MinPoint: 94, MaxPoint: 100},
	}
}

func SetRepoDb() {
	db = config.MgDB.DB
}
