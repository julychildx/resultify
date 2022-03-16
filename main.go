// the main module
package main

import (
	// import packages
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	// import modules
	"resultify/database"
	"resultify/school"
)

// App config => App denotes the Fiber application.
func setupV1(app *fiber.App) {
    // Group is used for Routes with common prefix to define a new sub-router with optional middleware.
    v1 := app.Group("/v1")
    //Each route will have /v1 prefix
    setupSchoolsRoutes(v1)
}

// Router defines all router handle interface includes app and group router
func setupSchoolsRoutes(grp fiber.Router) {
    // Group is used for Routes with common prefix => Each route will have /school prefix
    todosRoutes := grp.Group("/school")
    // Route for Get all school -> navigate to => http://127.0.0.1:3000/v1/school/
    todosRoutes.Get("/", school.GetAll)
    // Route for Get a todo -> navigate to => http://127.0.0.1:3000/v1/school/<todo's id>
    todosRoutes.Get("/:id", school.GetOne)
    // Route for Add a todo -> navigate to => http://127.0.0.1:3000/v1/school/
    todosRoutes.Post("/", school.AddSchool)
    // Route for Delete a todo -> navigate to => http://127.0.0.1:3000/v1/school/<todo's id>
    todosRoutes.Delete("/:id", school.DeleteSchool)
    // Route for Update a todo -> navigate to => http://127.0.0.1:3000/v1/school/<todo's id>
    todosRoutes.Patch("/:id", school.UpdateSchool)
}

// Database Connect function
func initDatabase() {
    // define error here to prevent overshadowing the global DB
    var err error
    // Create school sqlite file & Config GORM config
    // GORM performs single create, update, delete operations in transactions by default to ensure database data integrity
    database.DBConn, err = gorm.Open(sqlite.Open("school.db"), &gorm.Config{})

    // Connect to database
    if err != nil {
        // Database was connected
        panic("failed to connect database")
    }

    fmt.Println("Database successfully connected")

    // AutoMigrate run auto migration for gorm model
    database.DBConn.AutoMigrate(&school.School{})
    // Initialize Database connection
    fmt.Println("Database Migrated")
}

// entry point to our program
func main() {
    // call the New() method - used to instantiate a new Fiber App
    app := fiber.New()

    // call the initDatabase() method
    initDatabase()
    // call the setupV1(app) method
    setupV1(app)

    // Simple route => Middleware function
    app.Get("/", func(c *fiber.Ctx) error {
        // Returns plain text.
        return c.SendString("Hello, World!")
        // navigate to => http://127.0.0.1:3000
    })

    // sets up logger
    // Use middlewares for each route
    // This method will match all HTTP verbs: GET, POST, PUT etc Then create a log when every HTTP verb get invoked
    app.Use(logger.New(logger.Config{ // add Logger middleware with config
        Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
    }))

    // listen/Serve the new Fiber app on port 3000
    err := app.Listen(":3000")

    // handle panic errors => panic built-in function that stops the execution of a function and immediately normal execution of that function with an error
    if err != nil {
        panic(err)
    }
}
