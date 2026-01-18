package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"time"
)

var apis = []any{
	&Spaces{},
	&Api1{}, &Api2{},
}

func main() {
	dbInit()
	for _, api := range apis {
		tPtr := reflect.TypeOf(api)
		tStruct := tPtr.Elem()
		apiName := (tStruct.Name())
		allCodegenTodos[apiName] = map[string][2]reflect.Type{}
		api := reflect.ValueOf(api)
		for i := 0; i < tPtr.NumMethod(); i++ {
			method := tPtr.Method(i)
			if !method.IsExported() {
				continue
			}
			typeIn := method.Type.In(2)
			typeOut := method.Type.Out(0)
			allCodegenTodos[apiName][method.Name] = [2]reflect.Type{typeIn, typeOut}
			http.HandleFunc("/"+apiName+"/"+method.Name, func(w http.ResponseWriter, r *http.Request) {
				defer catch(w)()

				ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
				defer cancel()

				payload, err := io.ReadAll(r.Body)
				if err != nil {
					panic(err)
				}

				in := reflect.New(typeIn).Interface()
				if err := json.Unmarshal(payload, &in); err != nil {
					panic(err)
				}

				out := method.Func.Call([]reflect.Value{api, reflect.ValueOf(ctx), reflect.ValueOf(in)})[0].Interface()
				respData, err := json.Marshal(out)
				if err != nil {
					panic(err)
				}

				w.Header().Add("Content-Type", "application/json")
				w.Write(respData)
			})
		}
	}

	go codegenAll()
	panic(http.ListenAndServe(":54321", nil))
}

func catch(w http.ResponseWriter) func() {
	return func() {
		err := recover()
		if err != nil {
			http.Error(w, fmt.Sprintf("%v", err), 500)
		}
	}
}
