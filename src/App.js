import logo from "./logo.jpg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  let [data, setData] = useState();

  const handleSnapShot = (imageData) => {
    setData(imageData);
  };

  return (
    <div className="App">
      <Canvas imageData={data} />
      <button onClick={() => totodoist(data)}>Send image Data</button>
      <Video onSnapShot={handleSnapShot} />
    </div>
  );
}

function Video(props) {
  let vid = useRef();

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        vid.current.srcObject = stream;
      });
  }

  function getSnapShotData() {
    let videoTrack = vid.current.srcObject.getVideoTracks()[0];
    new ImageCapture(videoTrack)
      .grabFrame(videoTrack)
      .then((frameData) => props.onSnapShot(frameData));
  }

  return (
    <>
      <video ref={vid} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={() => props.onSnapShot(getSnapShotData())}>
        TakePhoto
      </button>
    </>
  );
}

function Canvas(props) {
  const canvas = useRef();
  // const image = useRef();

  const handleDraw = () => {
    console.log("HANDLE-DRAAAW");
    if (!props.imageData) return;
    let ctx = canvas.current.getContext("2d");
    ctx.drawImage(
      props.imageData,
      0,
      0,
      canvas.current.width,
      canvas.current.height
    );
    // canvas.current.toBlob((blob) => props.onData(blob), "image/jpeg");
  };
  useEffect(handleDraw);
  return (
    <>
      <canvas ref={canvas} width="500px" height="500px" />
      {/*<img ref={image} className="App-logo" alt="logo" />*/}
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
    }).then(console.log);
  };
}

export default App;
