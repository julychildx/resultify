package models

import (
	"context"
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type Subject struct {
	utils.Base
	Tag            string       `json:"tag"`
	Name           string       `json:"name"`
	Arm            string       `json:"arm"`
	ClassID        string       `json:"class_id"`
	AssessmentList []Assessment `json:"assessments"`
}

type SubjectList []Subject

/**
CRUD functions
*/

// Create creates a new candidate record
func (m *Subject) Create() error {
	_, err := db.Collection(m.Doc).InsertOne(context.TODO(), &m)
	if err != nil {
		return err
	}
	return nil
}

// FetchByID fetches Subject by id
func (m *Subject) FetchByID() error {
	err := db.Collection(m.Doc).FindOne(context.TODO(), bson.M{"_id": m.ID}).Decode(&m)
	if err != nil {
		return err
	}
	return nil
}

// FetchAll fetchs all Subjects
func (m *Subject) FetchAll(cl *SubjectList) error {
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
func (m *Subject) UpdateOne() error {
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
func (m *Subject) Delete() error {
	_, err := db.Collection(m.Doc).DeleteOne(context.TODO(), bson.M{"_id": m.ID})
	if err != nil {
		return err
	}
	return nil
}

func (m *Subject) DeleteMany() error {
	_, err := db.Collection(m.Doc).DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	return nil
}
