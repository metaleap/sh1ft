package main

import (
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func appInitMenus() *menu.Menu {
	menu_main := menu.NewMenu()
	menu_main.Append(menu.AppMenu())
	menu_main.Append(menu.EditMenu())

	menu_file := menu_main.AddSubmenu("File")
	menu_file.AddText("Hide", keys.CmdOrCtrl("w"), func(*menu.CallbackData) {
		runtime.Hide(app.ctx)
	})
	menu_file.AddText("Quit", keys.CmdOrCtrl("q"), func(*menu.CallbackData) {
		runtime.Quit(app.ctx)
	})

	menu_view := menu_main.AddSubmenu("View")
	menu_view.AddRadio("Use system theme", app.config.Theme == ColorThemeSystem, nil, func(*menu.CallbackData) {
		app.config.Theme = ColorThemeSystem
		app.config.save()
		runtime.WindowSetSystemDefaultTheme(app.ctx)
	})
	menu_view.AddRadio("Use dark theme", app.config.Theme == ColorThemeDark, nil, func(*menu.CallbackData) {
		app.config.Theme = ColorThemeDark
		app.config.save()
		runtime.WindowSetDarkTheme(app.ctx)
	})
	menu_view.AddRadio("Use light theme", app.config.Theme == ColorThemeLight, nil, func(*menu.CallbackData) {
		app.config.Theme = ColorThemeLight
		app.config.save()
		runtime.WindowSetLightTheme(app.ctx)
	})

	return menu_main
}
