package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (me *App) startup(ctx context.Context) {
	me.ctx = ctx
}

// Greet returns a greeting for the given name
func (me *App) Greet(name string) (string, error) {
	println("Greetin")
	runtime.MenuUpdateApplicationMenu(me.ctx)
	return fmt.Sprintf("Hola %s, it's Show Time!", name), nil
}
