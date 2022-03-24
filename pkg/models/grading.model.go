package models

import (
	"context"
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type Grading struct {
	utils.Base
	Grade    string `json:"grade"`
	MinPoint int    `json:"min_point"`
	MaxPoint int    `json:"max_point"`
	Arm      string `json:"arm"`
}

type GradingList []Grading

/**
CRUD functions
*/

// Create creates a new candidate record
func (m *Grading) Create() error {
	_, err := db.Collection(m.Doc).InsertOne(context.TODO(), &m)
	if err != nil {
		return err
	}
	return nil
}

// FetchByID fetches Grading by id
func (m *Grading) FetchByID() error {
	err := db.Collection(m.Doc).FindOne(context.TODO(), bson.M{"_id": m.ID}).Decode(&m)
	if err != nil {
		return err
	}
	return nil
}

// FetchAll fetchs all Gradings
func (m *Grading) FetchAll(cl *GradingList) error {
	cursor, err := db.Collection(m.Doc).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	if err = cursor.All(context.TODO(), &cl); err != nil {
		return err
	}
	return nil
}

// UpdateOne updates a given candidate
func (m *Grading) UpdateOne() error {
	update := bson.M{
		"$inc": bson.M{"copies": 1},
	}
	_, err := db.Collection(m.Doc).UpdateOne(context.TODO(), bson.M{"_id": m.ID}, update)
	if err != nil {
		return err
	}
	return nil
}

// Delete deletes candidate by id
func (m *Grading) Delete() error {
	_, err := db.Collection(m.Doc).DeleteOne(context.TODO(), bson.M{"_id": m.ID})
	if err != nil {
		return err
	}
	return nil
}

func (m *Grading) DeleteMany() error {
	_, err := db.Collection(m.Doc).DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	return nil
}
