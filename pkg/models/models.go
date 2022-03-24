package models

import (
	"resultify/pkg/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MUser struct {
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
type MUserList []User

type MClass struct {
	utils.Base
	Tag            string    `json:"tag"`
	Name           string    `json:"name"`
	Arm            string    `json:"arm"`
	Section        string    `json:"section"`
	LowestAverage  string    `json:"lowestAverage"`
	HighestAverage string    `json:"highestAverage"`
	TeacherList    []User    `json:"teachers"`
	StudentList    []Student `json:"students"`
}

type MStudent struct {
	utils.Base
	FirstName    string             `json:"first_name"`
	LastName     string             `json:"last_name"`
	OtherName    string             `json:"other_name"`
	Gender       string             `json:"gender"`
	ClassID      primitive.ObjectID `json:"class_id"`
	Absent       bool               `json:"absent"`
	Present      string             `json:"present"`
	Opened       string             `json:"opened"`
	TotalScore   float64            `json:"total_score"`
	AverageScore float64            `json:"average_score"`
	SubjectList  []Subject          `json:"subjects"`
	Rating       []Rating           `json:"rating"`
}

type MSubject struct {
	utils.Base
	Tag            string             `json:"tag"`
	Name           string             `json:"name"`
	Arm            string             `json:"arm"`
	ClassID        primitive.ObjectID `json:"class_id"`
	AssessmentList []Assessment       `json:"assessments"`
}

type MAssessment struct {
	utils.Base
	Name      string             `json:"name"`
	SubjectID primitive.ObjectID `json:"subject_id"`
	Score     int                `json:"score"`
	MaxScore  int                `json:"max_score"`
}

type MGradig struct {
	utils.Base
	Grade    string `json:"grade"`
	MinPoint int    `json:"min_point"`
	MaxPoint int    `json:"max_point"`
	Arm      string `json:"arm"`
}

type MRating struct {
	utils.Base
	Name string `json:"name"`
	Rate int    `json:"score"`
}
