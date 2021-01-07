import Overlay from "./Overlay.js";
import Spinner from "./Spinner.js";

export function Video(props) {
  let vid = React.useRef();

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
      // width and height are inverted because on Android
      // the orientation seems to be inverted aswell...
      // TODO: Detect device and handle width/height accordingly
      video: {
        width: 1720,
        height: 1180,
        facingMode: "environment",
      },
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
            <Overlay active={props.isLoading} feature={<Spinner />} />
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
