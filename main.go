package main

import (
	"resultify/app"
	"resultify/config"
)

func main() {
	config.LoadConfig()
	cfg := config.GetConfig()

	config.ConnectDB()

	app.Run(cfg)
}
