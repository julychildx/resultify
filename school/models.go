package school

import "gorm.io/gorm"

type Class struct {
	gorm.Model
	Id             int    `gorm:"primaryKey"`
	Name           string `json:"name"`
	Arm            string `json:"arm"`
	Section        string `json:"section"`
	LowestAverage  string `json:"lowestAverage"`
	HighestAverage string `json:"highestAverage"`
}
type ClassList []Class

type Student struct {
	gorm.Model
	Id             int    `gorm:"primaryKey"`
	Name           string `json:"name"`
	Arm            string `json:"arm"`
	Section        string `json:"section"`
	LowestAverage  string `json:"lowestAverage"`
	HighestAverage string `json:"highestAverage"`
}
type StudentList []Student

type Teacher struct {
	gorm.Model
	Id             int    `gorm:"primaryKey"`
	Name           string `json:"name"`
	Arm            string `json:"arm"`
	Section        string `json:"section"`
	LowestAverage  string `json:"lowestAverage"`
	HighestAverage string `json:"highestAverage"`
}
type TeacherList []Teacher

type Admin struct {
	gorm.Model
	Id             int    `gorm:"primaryKey"`
	Name           string `json:"name"`
	Arm            string `json:"arm"`
	Section        string `json:"section"`
	LowestAverage  string `json:"lowestAverage"`
	HighestAverage string `json:"highestAverage"`
}
type AdminList []Admin

