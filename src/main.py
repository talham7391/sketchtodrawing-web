import cv2
import sys
import imutils
import numpy as np


# All points are considered to be (x, y) with the origin being top left corner and positive y is south.


SCANNER_SIZE = 4
FILLED_THRESHOLD = 127
# TRAVERSE_STEP


def display_image(img):
    cv2.imshow("Image", img)
    cv2.waitKey(0)


def draw_point(img, center_point):
    cv2.circle(img, center_point, 1, (0, 255, 0), 2)


def is_within_threshold(val):
    return val < FILLED_THRESHOLD


def percentage_filled(img, starting_top_left):
    roi = img[starting_top_left[1]:starting_top_left[1]+SCANNER_SIZE, starting_top_left[0]:starting_top_left[0]+SCANNER_SIZE]
    if np.size(roi) <= 0:
        return 255
    return roi.mean()


def traverse_img(img, curr_point, visited, c):

    max_point = None
    max_val = None
    for y in range(curr_point[1] - SCANNER_SIZE, curr_point[1] + SCANNER_SIZE, SCANNER_SIZE):
        for x in range(curr_point[0] - SCANNER_SIZE, curr_point[0] + SCANNER_SIZE, SCANNER_SIZE):

            index = "%d%d" % (x, y)
            if x == curr_point[0] and y == curr_point[1] or index in visited:
                continue
            visited[index] = True

            val = percentage_filled(img, (x, y))
            if max_val is None or val > max_val:
                max_val = val
                max_point = (x, y)

    if max_val is not None and is_within_threshold(max_val):
        draw_point(c, max_point)
        traverse_img(img, max_point, visited)


def scan_img(img):
    visited = {}

    c = 255 - np.zeros(np.shape(img))

    for y in range(0, np.size(img, 0), SCANNER_SIZE):
        for x in range(0, np.size(img, 1), SCANNER_SIZE):

            index = "%d%d" % (x, y)
            if index in visited:
                continue
            visited[index] = True

            if is_within_threshold(percentage_filled(img, (x, y))):
                draw_point(c, (x, y))
                traverse_img(img, (x, y), visited, c)

    display_image(c)


img = cv2.imread(sys.argv[1], 0)
resizedImg = imutils.resize(img, width=500)
reducedImg = resizedImg[19:192, 400:460]

th3 = cv2.adaptiveThreshold(reducedImg, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 11)

scan_img(th3)
display_image(th3)