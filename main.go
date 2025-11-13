package main

import (
	"context"
	"embed"
	"runtime"

	"github.com/adrg/xdg"
	"github.com/energye/systray"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	wails_rt "github.com/wailsapp/wails/v2/pkg/runtime"
)

var app = &App{}

//go:embed all:frontend/dist
var appAssets embed.FS

//go:embed build/windows/icon.ico
var appIconIco []byte

//go:embed build/appicon.png
var appIconPng []byte

func main() {
	xdg.Reload()
	app.config.load()

	systrayNow, systrayBye := appInitSystray()
	err := wails.Run(&options.App{
		Bind: []any{
			app,
		},
		Title:             "Loading...",
		Width:             1024,
		Height:            768,
		HideWindowOnClose: true,
		StartHidden:       app.config.StartHidden,
		Menu:              appInitMenus(),
		AssetServer: &assetserver.Options{
			Assets: appAssets,
		},
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId: "8e396f31-cd0c-4f84-b594-e2093d235ce1",
			OnSecondInstanceLaunch: func(data options.SecondInstanceData) {
				wails_rt.WindowUnminimise(app.ctx)
				wails_rt.Show(app.ctx)
				go wails_rt.EventsEmit(app.ctx, "launchArgs", data.Args)
			},
		},

		OnStartup: func(ctx context.Context) {
			app.ctx = ctx
			systrayNow()
		},
		OnDomReady: func(ctx context.Context) {
			wails_rt.WindowCenter(ctx)
			wails_rt.WindowSetTitle(ctx, "123")
		},
		OnShutdown: func(context.Context) {
			systrayBye()
		},
	})
	if err != nil {
		panic(err)
	}
}

func appInitSystray() (func(), func()) {
	return systray.RunWithExternalLoop(func() {
		systray.SetOnRClick(func(menu systray.IMenu) {
			if err := menu.ShowMenu(); err != nil {
				println(err.Error())
			}
		})
		systray.SetOnClick(func(menu systray.IMenu) {
			wails_rt.Show(app.ctx)
		})
		systray.SetOnDClick(func(menu systray.IMenu) {
			wails_rt.Show(app.ctx)
		})
		systray.SetIcon(iIf(runtime.GOOS == "windows", appIconIco, appIconPng))
		systray.SetTooltip("sh1ft")
		systray.SetTitle("Hola?")
		systray.CreateMenu()
		systray.AddMenuItem("Show", "").Click(func() {
			wails_rt.WindowUnminimise(app.ctx)
			wails_rt.Show(app.ctx)
		})
		systray.AddMenuItem("Hide (Ctrl+W)", "").Click(func() {
			wails_rt.Hide(app.ctx)
		})
		systray.AddMenuItem("Quit (Ctrl+Q)", "").Click(func() {
			wails_rt.Quit(app.ctx)
		})
	},
		systray.Quit)
}
