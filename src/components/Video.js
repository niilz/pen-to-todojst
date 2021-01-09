import Overlay from "./Overlay.js";
import Spinner from "./Spinner.js";
import Warning from "./Warning.js";

export function Video(props) {
  let vid = React.useRef();
  let [isCameraEnabled, setCameraEnabled] = React.useState(false);
  let [showsSnapshot, setShowsSnapshot] = React.useState(false);

  // Async does not work here...
  const getSnapShotFrame = () => {
    if (!isCameraEnabled) return;
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
    offscreenCanvas.convertToBlob({ type: "image/jpeg" }).then((blob) => {
      props.onSnapShot(blob);
      if (blob != null) setShowsSnapshot(true);
    });
  };

  const turnOnCamera = async () => {
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
    setCameraEnabled(true);
    setShowsSnapshot(false);
  };

  const turnOffCamera = () => {
    vid.current.srcObject.getVideoTracks()[0].stop();
    vid.current.srcObject = null;
    setCameraEnabled(false);
    setShowsSnapshot(false);
  };

  return (
    <div className="video-area">
      <div className="outer-video-frame">
        <div className="video-frame">
          <div className="invisible-wrapper">
            <video ref={vid} autoPlay />
            <Overlay active={props.isLoading}>
              <Spinner />
            </Overlay>
            <Overlay active={!isCameraEnabled}>
              <Warning text="Enable Camera before taking a photo" />
            </Overlay>
          </div>
        </div>
      </div>
      <div className="video-frame-overlay" />
      <div className="controls">
        <button
          onClick={showsSnapshot ? turnOnCamera : () => {}}
          className={`${showsSnapshot ? "" : "disabled"}`}
        >
          Reset Camera
        </button>
        <button onClick={getSnapShotFrame}>Take Photo</button>
        <button onClick={isCameraEnabled ? turnOffCamera : turnOnCamera}>
          {`Turn ${isCameraEnabled ? "OFF" : "ON"} Camera`}
        </button>
      </div>
    </div>
  );
}

export default Video;
