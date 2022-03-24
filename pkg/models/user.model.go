package models

import (
	"context"
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	utils.Base
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Email        string `json:"email"`
	Gender       string `json:"gender"`
	AvatarUrl    string `json:"avatar"`
	ClassID      string `json:"class_id"`
	Role         string `json:"role"`
	Arm          string `json:"arm"`
	PasswordSalt string
	PasswordHash []byte
	SubjectList  []Subject `json:"subjects"`
}
type UserList []User

/**
CRUD functions
*/

// Create creates a new candidate record
func (m *User) Create() error {
	_, err := db.Collection(m.Doc).InsertOne(context.TODO(), &m)
	if err != nil {
		return err
	}
	return nil
}

// FetchByID fetches User by id
func (m *User) FetchByID() error {
	err := db.Collection(m.Doc).FindOne(context.TODO(), bson.M{"_id": m.ID}).Decode(&m)
	if err != nil {
		return err
	}
	return nil
}

// FetchAll fetchs all Users
func (m *User) FetchAll(cl *UserList) error {
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
func (m *User) UpdateOne() error {
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
func (m *User) Delete() error {
	_, err := db.Collection(m.Doc).DeleteOne(context.TODO(), bson.M{"_id": m.ID})
	if err != nil {
		return err
	}
	return nil
}

func (m *User) DeleteMany() error {
	_, err := db.Collection(m.Doc).DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		return err
	}
	return nil
}
