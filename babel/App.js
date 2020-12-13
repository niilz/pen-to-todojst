import Video from "./components/Video.js";
import { totodoist } from "./utils.js";
import Overlay from "./components/Overlay.js";

function App() {
  let [imgBlob, setImgBlob] = React.useState();
  let [firstAction, setFirstAction] = React.useState(true);

  const handleSnapShot = newSnapShotData => setImgBlob(newSnapShotData);

  const onAddItems = () => {
    setIsLoading(true);
    totodoist(imgBlob, onDone);
  };

  const onDone = _listId => setIsLoading(false);

  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("h1", null, "pen-to-todo", /*#__PURE__*/React.createElement("em", null, "js"), "t"), /*#__PURE__*/React.createElement(Video, {
    onSnapShot: handleSnapShot,
    firstAction: firstAction,
    onFirstAction: () => setFirstAction(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAddItems
  }, "Add Items")));
}

export default App;