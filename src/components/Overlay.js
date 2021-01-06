import Spinner from "./Spinner.js";

function Overlay(props) {
  return (
    <div className={`overlay ${props.active ? "" : "hidden"}`}>
      <Spinner
        shouldSpin={!props.listId}
        listId={props.listId}
        removeOverlay={props.removeOverlay}
      />
    </div>
  );
}

export default Overlay;
