package app

import (
	"fmt"
	"resultify/app/controller"
	"resultify/config"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/swaggo/swag/example/basic/docs"
)

func Run(cfg config.Config) {

	app := fiber.New()

	// Default Log Middleware
	app.Use(logger.New())

	// Recovery Middleware
	app.Use(recover.New())

	// cors
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Accept, Origin, Content-Type",
	}))

	controller.SetupRoutes(app)

	// FIXME, In Production, Port Should not be added to the Swagger Host
	docs.SwaggerInfo.Host = cfg.Host + ":" + cfg.Port

	// Run the app and listen on given port
	port := fmt.Sprintf(":%s", cfg.Port)
	app.Listen(port)
}
