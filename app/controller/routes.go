package controller

import (
	// Middlewares

	"resultify/pkg/middlewares"
	"resultify/pkg/models"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
)

type Resp struct {
	Message interface{} `json:"message"`
	Error   string      `json:"error"`
}

// SetupRoutes setups router
func SetupRoutes(app *fiber.App) {
	models.SetRepoDb()

	// Prepare a static middleware to serve the built React files.
	app.Static("/", "./web/build")

	// Prepare a fallback route to always serve the 'index.html', had there not be any matching routes.
	app.Static("*", "./web/build/index.html")

	// app.Get("/web/*", func(ctx *fiber.Ctx) error {
	// 	return ctx.SendFile("./dist/index.html")
	// })

	api := app.Group("/api")

	v1 := api.Group("/v1")

	v1.Use("/docs", swagger.HandlerDefault)

	v1.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Welcome to API Version One Home",
		})
	})

	// v1.Get("/home", ctl.HomeController)

	// Auth Group
	auth := v1.Group("/auth")
	auth.Post("/register", user.register)
	auth.Post("/login", user.login)

	// User Routes
	u := v1.Group("/user")
	u.Post("/", user.create)
	u.Get("/", user.getAll)

	//Authenticated Routes
	u.Post("/student", middlewares.RequireLoggedIn(), user.create)
}
