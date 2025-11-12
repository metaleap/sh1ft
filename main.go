package main

import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := &App{}

	// Create application with options

	menu_main := menu.NewMenu()
	menu_main.Append(menu.AppMenu())
	menu_main.Append(menu.EditMenu())
	menu_file := menu_main.AddSubmenu("File")
	menu_file.AddText("Hola", &keys.Accelerator{Key: "n"}, func(cd *menu.CallbackData) {
		println("HolaMondo")
	})
	menu_file.Append(menu.AppMenu())
	menu_file.Append(menu.EditMenu())

	err := wails.Run(&options.App{
		Title:  "Loading...",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour:   &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		Menu:               menu_main,
		SingleInstanceLock: &options.SingleInstanceLock{UniqueId: "8e396f31-cd0c-4f84-b594-e2093d235ce1"},
		OnStartup:          app.startup,
		OnDomReady: func(ctx context.Context) {
			// runtime.MenuSetApplicationMenu(app.ctx, da_menu)
			runtime.WindowCenter(app.ctx)
			runtime.WindowSetTitle(app.ctx, "123")
		},
		Bind: []any{
			app,
		},
	})

	if err != nil {
		panic(err)
	}
}
