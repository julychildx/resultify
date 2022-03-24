package models

import (
	"context"
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type Student struct {
	utils.Base
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	OtherName    string    `json:"other_name"`
	Gender       string    `json:"gender"`
	Absent       bool      `json:"absent"`
	Present      string    `json:"present"`
	Opened       string    `json:"opened"`
	TotalScore   float64   `json:"total_score"`
	AverageScore float64   `json:"average_score"`
	SubjectList  []Subject `json:"subjects"`
	Rating       []Rating  `json:"rating"`
}

type StudentList []Student

/**
CRUD functions
*/

// Create creates a new candidate record
func (m *Student) Create() error {
	_, err := db.Collection(m.Doc).InsertOne(context.TODO(), &m)
	if err != nil {
		return err
	}
	return nil
}

// FetchByID fetches Student by id
func (m *Student) FetchByID() error {
	err := db.Collection(m.Doc).FindOne(context.TODO(), bson.M{"_id": m.ID}).Decode(&m)
	if err != nil {
		return err
	}
	return nil
}

// FetchAll fetchs all Students
func (m *Student) FetchAll(cl *StudentList) error {
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
func (m *Student) UpdateOne() error {
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
func (m *Student) Delete() error {
	_, err := db.Collection(m.Doc).DeleteOne(context.TODO(), bson.M{"_id": m.ID})
	if err != nil {
		return err
	}
	return nil
}

func (m *Student) DeleteMany() error {
	_, err := db.Collection(m.Doc).DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	return nil
}
