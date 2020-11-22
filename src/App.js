import logo from "./logo.jpg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  let [snapShotData, setSnapShotData] = useState();
  let [imgBlob, setImgBlob] = useState();

  const handleSnapShot = (newSnapShotData) => {
    setSnapShotData(newSnapShotData);
  };

  return (
    <div className="App">
      <Canvas imageData={snapShotData} onData={setImgBlob} />
      <button onClick={() => totodoist(imgBlob)}>Send image Data</button>
      <Video onSnapShot={handleSnapShot} />
    </div>
  );
}

function Video(props) {
  let vid = useRef();

  async function startCamera() {
    let videoStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 500, height: 500 },
    });
    vid.current.srcObject = videoStream;
  }

  function turnOffCamera() {
    vid.current.srcObject.getVideoTracks()[0].stop();
    vid.current.srcObject = null;
  }

  // Async does not work here...
  function getSnapShotData() {
    let videoTrack = vid.current.srcObject.getVideoTracks()[0];
    new ImageCapture(videoTrack)
      .grabFrame(videoTrack)
      .then((frameData) => props.onSnapShot(frameData));
  }
  async function _getSnapShotData() {
    let videoTrack = vid.current.srcObject.getVideoTracks()[0];
    let imageCapture = new ImageCapture(videoTrack);
    let frameData = await imageCapture.grabFrame(videoTrack);
    props.onSnapShot(frameData);
  }

  return (
    <>
      <video ref={vid} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={() => props.onSnapShot(getSnapShotData())}>
        TakePhoto
      </button>
      <button onClick={turnOffCamera}>OFF</button>
    </>
  );
}

function Canvas(props) {
  const canvas = useRef();

  const handleDraw = () => {
    if (!props.imageData) return;
    let offscreenCanvas = new OffscreenCanvas(1000, 1000);
    let ctx = offscreenCanvas.getContext("2d");
    ctx.drawImage(
      props.imageData,
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height
    );
    let imageBitmap = offscreenCanvas.transferToImageBitmap();
    canvas.current
      .getContext("bitmaprenderer")
      .transferFromImageBitmap(imageBitmap);
    canvas.current.toBlob((blob) => props.onData(blob), "image/jpeg");
  };

  const _handleDraw = () => {
    if (!props.imageData) return;
    let ctx = canvas.current.getContext("2d");
    ctx.drawImage(
      props.imageData,
      0,
      0,
      canvas.current.width,
      canvas.current.height
    );
    canvas.current.toBlob((blob) => props.onData(blob), "image/jpeg");
  };
  useEffect(handleDraw);
  return (
    <>
      <canvas ref={canvas} width="500px" height="500px" />
    </>
  );
}

function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    console.log(imgData64);
    fetch("http://localhost:8080/to-do", {
      method: "POST",
      body: imgData64,
    }).then((backendResponse) =>
      console.log("JS: translated snapShot! Response: ", backendResponse)
    );
  };
}

export default App;
