import cv2
import sys
import imutils
import numpy as np
import svgwrite


# All points are considered to be (x, y) with the origin being top left corner and positive y is south.


SCANNER_SIZE = 3
FILLED_THRESHOLD = 127
TRAVERSE_STEP = 2

# if SCANNER_SIZE % TRAVERSE_STEP != 0 and TRAVERSE_STEP % SCANNER_SIZE != 0:
#     raise Exception("FILLED_THRESHOLD must be divisible by TRAVERSE_STEP or vice versa.")


def display_image(img):
    cv2.imshow("Image", img)
    cv2.waitKey(0)


def draw_point(img, center_point):
    cv2.circle(img, center_point, 1, (0, 255, 0), 2)


def is_within_threshold(val):
    return val < FILLED_THRESHOLD


def is_in_range(img, point):
    return point[0] > 0 and point[0] < np.size(img, 1) - SCANNER_SIZE and point[1] > 0 and point[1] < np.size(img, 0) - SCANNER_SIZE


def percentage_filled(img, starting_top_left):
    roi = img[starting_top_left[1]:starting_top_left[1]+SCANNER_SIZE, starting_top_left[0]:starting_top_left[0]+SCANNER_SIZE]
    if np.size(roi) <= 0:
        return 255
    return roi.mean()


def traverse_img(img, curr_point, visited, c):

    max_point = None
    max_val = None

    for y in range(curr_point[1] - SCANNER_SIZE, curr_point[1] + SCANNER_SIZE, TRAVERSE_STEP):
        for x in range(curr_point[0] - SCANNER_SIZE, curr_point[0] + SCANNER_SIZE, TRAVERSE_STEP):
            index = "%d%d" % (x, y)
            if x == curr_point[0] and y == curr_point[1] or index in visited:
                continue
            visited[index] = True

            # cop = np.copy(img)
            # cv2.rectangle(cop, (x, y), (x + SCANNER_SIZE, y + SCANNER_SIZE), (0, 255, 0), 1)
            # display_image(cop)

            val = percentage_filled(img, (x, y))
            if max_val is None or val > max_val:
                max_val = val
                max_point = (x, y)

    if max_val is not None and is_within_threshold(max_val):
        draw_point(c, max_point)
        traverse_img(img, max_point, visited)


def adjust_starting_point(img, curr_point):
    adjustment_radius = 8
    min_val = None
    min_point = None
    for y in range(curr_point[1] - adjustment_radius, curr_point[1] + adjustment_radius):
        for x in range(curr_point[0] - adjustment_radius, curr_point[0] + adjustment_radius):
            if is_in_range(img, (x, y)):
                val = percentage_filled(img, (x, y))
                if min_val is None or val > min_val:
                    min_val = val
                    min_point = (x, y)
    return min_point


def get_direction(points):
    sumx, sumy = 0, 0
    for i in range(len(points) - 1):
        sumx += points[i + 1][0] - points[i][0]
        sumy += points[i + 1][1] - points[i][1]
    return sumx, sumy


def trace(img, curr_point, points = []):

    qualifying_points = []

    for y in range(curr_point[1] - SCANNER_SIZE, curr_point[1] + SCANNER_SIZE + 1, SCANNER_SIZE):
        for x in range(curr_point[0] - SCANNER_SIZE, curr_point[0] + SCANNER_SIZE + 1, SCANNER_SIZE):
            if (x, y) == curr_point or not is_in_range(img, curr_point) or (x, y) in points:
                continue
            if is_within_threshold(percentage_filled(img, (x, y))):
                qualifying_points.append((x, y))

    for p in qualifying_points:
        c = 255 - np.zeros(np.shape(img))
        for idx, k in enumerate(points):
            if idx % 4 == 0:
                draw_point(c, k)
        display_image(c)
        trace(img, p, points + [p])


def scan_img(img):
    visited = {}

    c = 255 - np.zeros(np.shape(img))

    z = 0
    for y in range(0, np.size(img, 0), SCANNER_SIZE):
        for x in range(0, np.size(img, 1), SCANNER_SIZE):

            # index = "%d%d" % (x, y)
            # if index in visited:
            #     continue
            # visited[index] = True

            if is_within_threshold(percentage_filled(img, (x, y))):
                starting_point = adjust_starting_point(img, (x, y))
                print("new")
                trace(img, starting_point)

            # if is_within_threshold(percentage_filled(img, (x, y))):
            #     draw_point(c, (x, y))
            #     traverse_img(img, (x, y), visited, c)

    # display_image(c)


img = cv2.imread(sys.argv[1], 0)
resizedImg = imutils.resize(img, width=500)

th3 = cv2.adaptiveThreshold(resizedImg, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 11)
th3 = cv2.GaussianBlur(th3, (5, 5), 0)
th3 = cv2.morphologyEx(th3, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5)))

brush = np.array([
    [ 12,  61, 115,  61,  12],
    [ 61, 162, 230, 162,  61],
    [115, 230, 255, 230, 115],
    [ 61, 162, 230, 162,  61],
    [ 12,  61, 115,  61,  12],
])
brush = brush / 255

threshold = 100
visited = {}
brush_jump = 2


def get_brush_threshold_at_point(point):
    roi = th3[point[1]:point[1] + brush.shape[0], point[0]:point[0] + brush.shape[1]]
    if roi.shape == brush.shape:
        output = roi * brush
        return output.mean()
    return None


def traverse(point, path):
    min_thresh = None
    min_point = None
    for y in range(point[1] - brush.shape[0] * brush_jump, point[1] + brush.shape[0] * brush_jump + 1, brush.shape[0] * brush_jump):
        for x in range(point[0] - brush.shape[1] * brush_jump, point[0] + brush.shape[1] * brush_jump + 1, brush.shape[1] * brush_jump):
            if "%d,%d" % (x, y) not in visited:
                visited["%d,%d" % (x, y)] = True
                thresh = get_brush_threshold_at_point((x, y))
                if min_thresh is None or thresh < min_thresh:
                    min_thresh = thresh
                    min_point = (x, y)
    if min_point is not None and min_thresh < threshold:
        path = traverse(min_point, path + [(x, y)])
    return path


drawing = svgwrite.Drawing(width=th3.shape[1], height=th3.shape[0])
for y in range(0, np.size(th3, 0), brush.shape[0]):
    for x in range(0, np.size(th3, 1), brush.shape[1]):
        if "%d,%d" % (x, y) not in visited:
            visited["%d,%d" % (x, y)] = True
            thresh = get_brush_threshold_at_point((x, y))
            if thresh is not None and thresh < threshold:
                path = traverse((x, y), [(x, y)])
                for i in range(0, len(path) - 2):
                    drawing.add(drawing.add(drawing.line(path[i], path[i + 1], stroke=svgwrite.rgb(10, 10, 16, '%'))))

drawing.saveas("Testing.svg")