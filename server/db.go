package main

import (
	"os"
	"path/filepath"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func dbInit() {
	osCfgDirPath, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}
	dbFilePath := filepath.Join(osCfgDirPath, "sh1ft.db")

	db, err = gorm.Open(sqlite.Open(dbFilePath), &gorm.Config{})
	if err != nil {
		panic(err)
	}

}
