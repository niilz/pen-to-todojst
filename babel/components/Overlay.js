function Overlay(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: `overlay ${props.active ? "" : "hidden"}`
  }, props.feature);
}

export default Overlay;