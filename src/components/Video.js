import React, { useRef } from "react";
import "./Video.css";

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
      video: { width: 3, height: 4 },
    });
    vid.current.srcObject = videoStream;
    props.onFirstAction();
  };

  const turnOffCamera = () => {
    vid.current.srcObject.getVideoTracks()[0].stop();
    vid.current.srcObject = null;
  };

  return (
    <div className="video-area">
      <div className="outer-video-frame">
        <div className="video-frame">
          <div className="invisible-wrapper">
            <video ref={vid} autoPlay />
          </div>
        </div>
      </div>
      <div className="video-frame-overlay" />
      <div className="controls">
        <button onClick={startCamera}>
          {props.firstAction ? "Enable Camera" : "Reset Photo"}
        </button>
        <button onClick={getSnapShotFrame}>Take Photo</button>
        <button onClick={turnOffCamera}>Camera Off</button>
      </div>
    </div>
  );
}

export default Video;
