function Overlay(props) {
  return (
    <div className={`overlay ${props.active ? "" : "hidden"}`}>
      {props.feature}
    </div>
  );
}

export default Overlay;
