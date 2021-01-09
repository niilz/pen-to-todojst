function Overlay(props) {
  return (
    <div className={`overlay ${props.active ? "" : "hidden"}`}>
      {props.children}
    </div>
  );
}

export default Overlay;
