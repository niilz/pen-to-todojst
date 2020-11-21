import logo from "./logo.jpg";
import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  let [data, setData] = useState();
  return (
    <div className="App">
      <Canvas onData={(imgData) => setData(imgData)} />
      <button onClick={() => totodoist(data)}>Send image Data</button>
      <Video />
    </div>
  );
}

function Video() {
  let vid = useRef();

  const handleVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 500, height: 500 } })
      .then((stream) => {
        vid.current.srcObject = stream;
        console.log("stream", stream);
        console.log("srcObject", vid.current.srcObject);
        console.log("vid.current:", vid.current);
      });
  };

  return (
    <>
      <video ref={vid} onLoad={() => console.log("LOOADED")} />
      <button onClick={handleVideo}>start Video</button>
    </>
  );
}

function Canvas(props) {
  const canvas = useRef();
  const image = useRef();

  const draw = () => {
    let width = canvas.current.width;
    let height = canvas.current.height;
    let ctx = canvas.current.getContext("2d");
    ctx.drawImage(image.current, 0, 0, width, height);
    canvas.current.toBlob((blob) => props.onData(blob), "image/jpeg");
  };
  return (
    <>
      <canvas width="500px" height="500px" ref={canvas} />
      <img
        ref={image}
        src={logo}
        onLoad={draw}
        className="App-logo"
        alt="logo"
      />
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
