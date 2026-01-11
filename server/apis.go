package main

import (
	"context"
)

type Api1 struct {
}

func (me *Api1) Hola(_ context.Context, in struct{ Name string }) (ret struct{ Greeting string }) {
	ret.Greeting = "Hola, " + in.Name + "!"
	return
}

type Api2 struct {
}

func (me *Api2) Double(_ context.Context, in struct{ Num int }) (ret struct{ Doubled int }) {
	ret.Doubled = in.Num * 2
	return
}
