package main

func iIf[T any](b bool, t T, f T) T {
	if b {
		return t
	}
	return f
}
