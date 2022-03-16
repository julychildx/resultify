// the schools module
package school

import (
	// import modules
	"resultify/database"
	"strconv"

	// import packages
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// School is a struct holding the schools settings.
type School struct {
	gorm.Model
	Id             int         `gorm:"primaryKey"`
	Name           string      `json:"name"`
	Arm            string      `json:"arm"`
	Section        string      `json:"section"`
	LowestAverage  string      `json:"lowestAverage"`
	HighestAverage string      `json:"highestAverage"`
	TeacherList    TeacherList `json:"teacherList"`
    
}

// @ func GetAll -> function that fetches a single all schools (Get all schools)
// @param c *fiber.Ctx -- fiber context
func GetAll(c *fiber.Ctx) error {
	db := database.DBConn
	var schools []School
	db.Find(&schools)
	// If the database read is successful
	return c.Status(fiber.StatusOK).JSON(schools)
}

// @ func GetOne -> function that fetches a single school (Get single school)
// @param c *fiber.Ctx -- fiber context
func GetOne(ctx *fiber.Ctx) error {
	paramsId := ctx.Params("id")
	id, err := strconv.Atoi(paramsId)
	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse id",
		})
		return err
	}

	db := database.DBConn

	var school School
	db.Find(&school, id)

	// If the database read is successful
	if int(school.Id) == id {
		return ctx.Status(fiber.StatusOK).JSON(school)
	}

	// If the database fails to read the id parameter
	return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
		"error": "school not found",
	})
}

// @func AddSchool -> function that stores a new data (Create new school)
// @param c *fiber.Ctx -- fiber context
func AddSchool(ctx *fiber.Ctx) error {
	db := database.DBConn
	type request struct {
		Name string `json:"name"`
	}
	// Parse POST data
	var body request
	err := ctx.BodyParser(&body)
	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse json",
		})
		return err
	}
	// Get the json struct that is required to send
	id := uuid.New()
	school := School{
		Id:   int(id.ID()),
		Name: body.Name,
		//Completed: false,
	}
	// Insert to DB
	db.Create(&school)

	return ctx.Status(fiber.StatusOK).JSON(school)
}

// @func DeleteSchool -> a function that deletes the data (Delete school)
// @param c *fiber.Ctx -- fiber context
func DeleteSchool(ctx *fiber.Ctx) error {
	db := database.DBConn
	paramsId := ctx.Params("id")
	id, err := strconv.Atoi(paramsId)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse id",
		})
	}

	var school School
	db.First(&school, id)

	if int(school.Id) != id {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "school not found",
		})
	}

	db.Delete(&school)

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "school deleted successfully",
	})
}

// @func UpdateSchool -> a function that ulters a school data (Update school)
// @param c *fiber.Ctx -- fiber context
func UpdateSchool(ctx *fiber.Ctx) error {
	db := database.DBConn

	type request struct {
		Name      *string `json:"name"`
		Completed *bool   `json:"completed"`
	}

	paramsId := ctx.Params("id")
	id, err := strconv.Atoi(paramsId)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse id",
		})
	}

	var body request

	err = ctx.BodyParser(&body)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse body",
		})
	}

	var school School
	// Check if school exist, if exist assign it value to school
	db.First(&school, id)

	// handling 404 error
	if int(school.Id) != id {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "school not found",
		})
	}

	if body.Name != nil {
		school.Name = *body.Name
	}

	// if body.Completed != nil {
	// 	school.Completed = *body.Completed
	// }

	db.Save(&school)

	return ctx.Status(fiber.StatusOK).JSON(school)
}
