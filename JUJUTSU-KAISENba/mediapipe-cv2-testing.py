import cv2
import mediapipe as mp

# Initialize MediaPipe Holistic
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

# Open the default camera
cam = cv2.VideoCapture(0)

# Get frame dimensions
frame_width = int(cam.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cam.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('output.mp4', fourcc, 20.0, (frame_width, frame_height))

# Use the Holistic model in a context manager
with mp_holistic.Holistic(
    static_image_mode=False,
    model_complexity=1, # 1 is a good balance of speed/accuracy, use 2 for better analysis
    refine_face_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
) as holistic:

    while cam.isOpened():
        ret, frame = cam.read()
        if not ret:
            break

        # MediaPipe needs RGB, OpenCV uses BGR
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False # Performance optimization
        
        # Process the frame
        results = holistic.process(image)

        # Draw landmarks back onto the BGR frame
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Draw Face, Pose, and Hand landmarks
        mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_CONTOURS)
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
        mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
        mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

        # Write the processed frame to the file
        out.write(image)

        # Display the result
        cv2.imshow('MediaPipe Holistic', image)

        # Press 'q' to exit
        if cv2.waitKey(1) == ord('q'):
            break

# Cleanup
cam.release()
out.release()
cv2.destroyAllWindows()