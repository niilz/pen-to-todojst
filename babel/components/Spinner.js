function Spinner(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "spinner-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: props.removeOverlay,
    className: `spinner ${props.shouldSpin ? "spin" : ""}`
  }, /*#__PURE__*/React.createElement("p", null, props.listId)));
}

export default Spinner;