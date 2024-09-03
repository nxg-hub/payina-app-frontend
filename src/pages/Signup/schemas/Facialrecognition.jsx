import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FacialRecognition = ({ onImageCapture }) => {
  const [showCamera, setShowCamera] = useState(false); // Initially not showing the camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => console.error('Error accessing the camera:', err));
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL
    const imageDataURL = canvas.toDataURL('image/png');
    
    // Pass the image data URL to the parent component or perform further processing
    onImageCapture(imageDataURL);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        onImageCapture(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Start the camera when the component mounts if showCamera is true
    if (showCamera) {
      startCamera();
    }
  }, [showCamera]);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required('Image is required'),
  });

  return (
    <Formik
      initialValues={{ image: '' }}
      validationSchema={validationSchema}
      onSubmit={() => {
        captureImage();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            {/* Render the camera component only if showCamera is true */}
            {showCamera && (
              <div>
                <video ref={videoRef} autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              </div>
            )}

            {/* Button to toggle showing the camera */}
            <button type="button" onClick={() => setShowCamera(true)}>Start Facial Recognition</button>

            {/* Input for selecting image files */}
            <Field type="file" name="image" accept="image/*" onChange={handleFileSelect} />
            <ErrorMessage name="image" component="div" />

            {/* Button to capture an image */}
            {showCamera && (
              <button type="submit">Capture Image</button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FacialRecognition;
