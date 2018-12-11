
IMG_DIR := ./samples/
IMAGE?=simple_1.jpg

all: run

run:
	python3 src/main.py $(IMG_DIR)$(IMAGE)

install:
	pip3 install -r requirements.txt