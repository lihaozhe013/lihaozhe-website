.PHONY: dev run format

default: run

run:
	hugo server

dev:
	hugo server -D

format:
	prettier . --write