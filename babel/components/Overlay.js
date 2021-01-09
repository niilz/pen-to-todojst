function Overlay(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: `overlay ${props.active ? "" : "hidden"}`
  }, props.children);
}

export default Overlay;