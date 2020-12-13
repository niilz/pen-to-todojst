import Spinner from "./Spinner.js";

function Overlay(props) {
  return (
    <div className={`overlay ${props.active ? "" : "hidden"}`}>
      <Spinner />
    </div>
  );
}

export default Overlay;
