package main

import (
	"context"
	"fmt"
)

type App struct {
	ctx context.Context

	config Config
}

func (me *App) Greet(name string) (string, error) {
	println("Greetin")
	return fmt.Sprintf("Hola %s, it's Show Time!", name), nil
}
