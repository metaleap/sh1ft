package main

import (
	"context"

	"gorm.io/gorm"
)

type Space struct {
	gorm.Model
	Name string
}

type Spaces struct{}

func (*Spaces) Create(ctx context.Context, args struct{ Space Space }) (ret struct{ Id uint }) {
	result := gorm.WithResult()
	err := gorm.G[Space](db, result).Create(ctx, &args.Space)
	if err != nil {
		panic(err)
	}
	ret.Id = args.Space.ID
	return
}
