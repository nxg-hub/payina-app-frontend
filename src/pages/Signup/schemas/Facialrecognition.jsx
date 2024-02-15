import React, { Component } from 'react';

class FacialRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: false // Initially not showing the camera
    };
    this.video = React.createRef();
    this.canvas = React.createRef();
  }

  startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.current.srcObject = stream;
        this.video.current.play();
      })
      .catch(err => console.error('Error accessing the camera:', err));
  }

  componentDidMount() {
    // Start the camera when the component mounts if showCamera is true
    if (this.state.showCamera) {
      this.startCamera();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Start or stop the camera based on the state change
    if (this.state.showCamera !== prevState.showCamera) {
      if (this.state.showCamera) {
        this.startCamera();
      } else {
        const stream = this.video.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    }
  }

  captureImage = () => {
    const canvas = this.canvas.current;
    const context = canvas.getContext('2d');
    context.drawImage(this.video.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL
    const imageDataURL = canvas.toDataURL('image/png');
    
    // Pass the image data URL to the parent component or perform further processing
    this.props.onImageCapture(imageDataURL);
  }

  handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        this.props.onImageCapture(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div>
        {/* Render the camera component only if showCamera is true */}
        {this.state.showCamera && (
          <div>
            <video ref={this.video} autoPlay></video>
            <canvas ref={this.canvas} style={{ display: 'none' }}></canvas>
          </div>
        )}

        {/* Button to toggle showing the camera */}
        <button onClick={() => this.setState({ showCamera: true })}>Start Facial Recognition</button>

        {/* Input for selecting image files */}
        <input type="file" accept="image/*" onChange={this.handleFileSelect} />
        
        {/* Button to capture an image */}
        {this.state.showCamera && (
          <button onClick={this.captureImage}>Capture Image</button>
        )}
      </div>
    );
  }
}

export default FacialRecognition;
