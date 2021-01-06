function Spinner(props) {
  return (
    <div className="spinner-wrapper">
      <div
        onClick={props.removeOverlay}
        className={`spinner ${props.shouldSpin ? "spin" : ""}`}
      >
        <p>{props.listId}</p>
      </div>
    </div>
  );
}

export default Spinner;
