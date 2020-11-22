import logo from "./logo.jpg";
import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  let [imgBlob, setImgBlob] = useState();
  let [firstAction, setFirstAction] = useState(true);

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);

  return (
    <div className="App">
      <h1>
        pen-to-todo<em>js</em>t
      </h1>
      <Video
        onSnapShot={handleSnapShot}
        firstAction={firstAction}
        onFirstAction={() => setFirstAction(false)}
      />
      <button onClick={() => totodoist(imgBlob)}>add to list</button>
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
    props.onFirstAction();
  };

  const turnOffCamera = () => {
    vid.current.srcObject.getVideoTracks()[0].stop();
    vid.current.srcObject = null;
  };

  return (
    <>
      <div className="outer-video-frame">
        <div className="video-frame">
          <div className="invisible-wrapper">
            <video ref={vid} autoPlay />
          </div>
        </div>
      </div>
      <div className="video-frame-overlay" />
      <div className="controlls">
        <button onClick={startCamera}>
          {props.firstAction ? "Enable Camera" : "Reset Photo"}
        </button>
        <button onClick={getSnapShotFrame}>TakePhoto</button>
        <button onClick={turnOffCamera}>OFF</button>
      </div>
    </>
  );
}

function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    fetch("http://localhost:8080/to-do", {
      method: "POST",
      body: imgData64,
    })
      .then((backendResponse) => backendResponse.text())
      .then((body) => console.log("ResponseBody:", body));
  };
}

export default App;
