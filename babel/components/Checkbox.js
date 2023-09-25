function Checkbox(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Checkbox"
  }, /*#__PURE__*/React.createElement("input", {
    id: props.labelId,
    type: "checkbox",
    onChange: e => props.handleOnChange(e.target.checked)
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: props.labelId
  }, props.labelText));
}

export default Checkbox;