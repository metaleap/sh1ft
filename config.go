package main

import (
	"encoding/json"
	"os"

	"github.com/adrg/xdg"
)

type Config struct {
	Theme       ColorTheme
	StartHidden bool
}

type ColorTheme int

const (
	ColorThemeSystem ColorTheme = iota
	ColorThemeDark
	ColorThemeLight
)

func (me *Config) filePath() (string, error) {
	return xdg.ConfigFile("sh1ft/config.json")
}

func (me *Config) save() error {
	file_path, err := me.filePath()
	if err != nil {
		return err
	}
	json_data, err := json.Marshal(me)
	if err != nil {
		return err
	}
	return os.WriteFile(file_path, json_data, os.ModePerm)
}

func (me *Config) load() error {
	file_path, err := me.filePath()
	if err != nil {
		return err
	}
	json_data, err := os.ReadFile(file_path)
	if err != nil {
		return err
	}
	return json.Unmarshal(json_data, me)
}
