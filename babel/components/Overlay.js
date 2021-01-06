import Spinner from "./Spinner.js";

function Overlay(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: `overlay ${props.active ? "" : "hidden"}`
  }, /*#__PURE__*/React.createElement(Spinner, {
    shouldSpin: !props.listId,
    listId: props.listId,
    removeOverlay: props.removeOverlay
  }));
}

export default Overlay;