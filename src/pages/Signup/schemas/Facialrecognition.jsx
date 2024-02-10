import React, { Component } from 'react';

class Facialrecognition extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.startCamera();
  }

  startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.current.srcObject = stream;
        this.video.current.play();
      })
      .catch(err => console.error('Error accessing the camera:', err));
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
        <video ref={this.video} autoPlay></video>
        <canvas ref={this.canvas} style={{ display: 'none' }}></canvas>

        {/* Button to capture an image */}
        <button onClick={this.captureImage}>Capture Image</button>

        {/* Input for selecting image files */}
        <input type="file" accept="image/*" onChange={this.handleFileSelect} />
      </div>
    );
  }
}

export default Facialrecognition;
