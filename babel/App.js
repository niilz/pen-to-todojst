import Video from "./components/Video.js";
import { init, fromHandwriting, getAllProjects } from "./utils.js";
import Overlay from "./components/Overlay.js";
import ProjectList from "./components/ProjectList.js";
import Spinner from "./components/Spinner.js";
import Checkbox from "./components/Checkbox.js";

function App() {
  const [imgBlob, setImgBlob] = React.useState();
  const [isLoading, setIsLoading] = React.useState(undefined);
  const [isTransmitting, setIsTransmitting] = React.useState(false);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [largestItemOnly, setLargestItemOnly] = React.useState(false); // Initialize wasm-module (only once)

  React.useEffect(() => {
    init().then(() => console.log("Wasm module has been initialized"));
  }, []);

  const openOpentions = () => {
    if (!imgBlob) return;
    setIsLoading(true);
    loadProjects();
    setIsLoading(false);
    setOptionsOpen(true);
  };

  const loadProjects = () => {
    getAllProjects().then(projs => {
      setIsTransmitting(false);
      setProjects(projs);
    });
  };

  const handleSnapShot = newSnapShotData => setImgBlob(newSnapShotData);

  const onConfirmedProject = listId => {
    setOptionsOpen(false);
    setIsTransmitting(true);
    fromHandwriting(listId, imgBlob, onDone, largestItemOnly);
  };

  const onDone = _listId => setIsTransmitting(false);

  const feature = isLoading ? /*#__PURE__*/React.createElement(Spinner, null) : /*#__PURE__*/React.createElement(ProjectList, {
    projects: projects,
    onConfirm: onConfirmedProject
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("h1", null, "pen-to-todo", /*#__PURE__*/React.createElement("em", null, "js"), "t"), /*#__PURE__*/React.createElement(Video, {
    onSnapShot: handleSnapShot,
    isTransmitting: isTransmitting,
    resetImgData: () => setImgBlob(null)
  }), /*#__PURE__*/React.createElement(Overlay, {
    active: optionsOpen
  }, feature), /*#__PURE__*/React.createElement("div", {
    className: "add-button-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "add-button"
  }, /*#__PURE__*/React.createElement("button", {
    className: `${imgBlob ? "" : "disabled"}`,
    onClick: openOpentions
  }, "Add Items")), /*#__PURE__*/React.createElement(Checkbox, {
    labelId: "largest-item-only-label",
    handleOnChange: setLargestItemOnly,
    labelText: "largest item only"
  })));
}

export default App;