import Spinner from "./Spinner.js";

function Overlay(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: `overlay ${props.active ? "" : "hidden"}`
  }, /*#__PURE__*/React.createElement(Spinner, null));
}

export default Overlay;