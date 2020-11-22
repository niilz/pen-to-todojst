import logo from "./logo.jpg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  let [imgBlob, setImgBlob] = useState();

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);

  return (
    <div className="App">
      <button onClick={() => totodoist(imgBlob)}>Send image Data</button>
      <Video onSnapShot={handleSnapShot} />
    </div>
  );
}

function Video(props) {
  let vid = useRef();

  // Async does not work here...
  const getSnapShotFrame = () => {
    let videoTrack = vid.current.srcObject.getVideoTracks()[0];
    vid.current.pause();
    new ImageCapture(videoTrack)
      .grabFrame(videoTrack)
      .then((imageFrame) => getSnapShotDataFromFrame(imageFrame));
  };

  const getSnapShotDataFromFrame = (snapShotFrame) => {
    let offscreenCanvas = new OffscreenCanvas(1000, 1000);
    let ctx = offscreenCanvas.getContext("2d");
    ctx.drawImage(
      snapShotFrame,
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height
    );
    offscreenCanvas
      .convertToBlob({ type: "image/jpeg" })
      .then((blob) => props.onSnapShot(blob));
  };

  const startCamera = async () => {
    let videoStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 500, height: 500 },
    });
    vid.current.srcObject = videoStream;
  };

  const turnOffCamera = () => {
    vid.current.srcObject.getVideoTracks()[0].stop();
    vid.current.srcObject = null;
  };

  return (
    <>
      <video ref={vid} autoPlay />
      <button onClick={startCamera}>
        {props.isFirst ? "Enable Camera" : "Reset Photo"}
      </button>
      <button onClick={getSnapShotFrame}>TakePhoto</button>
      <button onClick={turnOffCamera}>OFF</button>
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
