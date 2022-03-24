package models

import (
	"context"
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type Class struct {
	utils.Base
	Tag            string    `json:"tag"`
	Name           string    `json:"name"`
	Arm            string    `json:"arm"`
	Section        string    `json:"section"`
	LowestAverage  string    `json:"lowestAverage"`
	HighestAverage string    `json:"highestAverage"`
	TeacherList    []Class   `json:"teachers"`
	StudentList    []Student `json:"students"`
}

type ClassList []Class

/**
CRUD functions
*/

// Create creates a new candidate record
func (m *Class) Create() error {
	_, err := db.Collection(m.Doc).InsertOne(context.TODO(), &m)
	if err != nil {
		return err
	}
	return nil
}

// FetchByID fetches Class by id
func (m *Class) FetchByID() error {
	err := db.Collection(m.Doc).FindOne(context.TODO(), bson.M{"_id": m.ID}).Decode(&m)
	if err != nil {
		return err
	}
	return nil
}

// FetchAll fetchs all Classs
func (m *Class) FetchAll(cl *ClassList) error {
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
func (m *Class) UpdateOne() error {
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
func (m *Class) Delete() error {
	_, err := db.Collection(m.Doc).DeleteOne(context.TODO(), bson.M{"_id": m.ID})
	if err != nil {
		return err
	}
	return nil
}

func (m *Class) DeleteMany() error {
	_, err := db.Collection(m.Doc).DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	return nil
}
