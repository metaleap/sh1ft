package main

import (
	"os"
	"reflect"
	"strings"
	"time"
)

var allCodegenTodos = map[string]map[string][2]reflect.Type{}

func codegenAll() {
	if len(os.Args) < 2 {
		return
	}
	tsFilePath := os.Args[1]
	tsSrc := "// codegen'd at " + time.Now().Format(time.DateTime) + "\n\n"
	tsSrc += "import { doFetch } from './util/doFetch'\n\n"

	var buf strings.Builder
	for apiName, methods := range allCodegenTodos {
		for methodName, inOutTypes := range methods {
			codegenTypes(&buf, apiName, methodName, inOutTypes[0], inOutTypes[1])
		}
	}
	tsSrc += buf.String()

	for apiName, methods := range allCodegenTodos {
		tsSrc += "export const " + apiName + " = {\n"
		for methodName := range methods {
			tInName, tOutName := apiName+methodName+"Args", apiName+methodName+"Result"
			tsSrc += "  " + methodName + ": (async (_: " + tInName + "): Promise<" + tOutName + "> => {\n"
			tsSrc += "    return doFetch<" + tInName + ", " + tOutName + ">('" + "/" + apiName + "/" + methodName + "', _)\n"
			tsSrc += "  })\n\n"
		}
		tsSrc += "}\n\n"
	}
	err := os.WriteFile(tsFilePath, []byte(tsSrc), os.ModePerm)
	if err != nil {
		panic(err)
	}
}

func codegenTypes(buf *strings.Builder, apiName string, methodName string, tIn reflect.Type, tOut reflect.Type) {
	buf.WriteString("export type " + apiName + methodName + "Args = ")
	codegenType(buf, tIn)

	buf.WriteString("export type " + apiName + methodName + "Result = ")
	codegenType(buf, tOut)
}

func codegenType(buf *strings.Builder, t reflect.Type) {
	switch t.Kind() {
	case reflect.Bool:
		buf.WriteString("boolean")
	case reflect.String:
		buf.WriteString("string")
	case reflect.Int, reflect.Uint, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Float32, reflect.Float64:
		buf.WriteString("number")
	case reflect.Struct:
		buf.WriteString("{\n")
		for i := 0; i < t.NumField(); i++ {
			field := t.Field(i)
			if !field.IsExported() {
				continue
			}
			buf.WriteString("  " + field.Name + ": ")
			codegenType(buf, field.Type)
			buf.WriteString("\n")
		}
		buf.WriteString("}\n\n")
	default:
		panic(t.Kind().String() + ": " + t.String())
	}
}
