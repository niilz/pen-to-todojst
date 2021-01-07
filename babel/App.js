import Video from "./components/Video.js";
import { init, fromHandwriting, getAllProjects } from "./utils.js";
import Overlay from "./components/Overlay.js";
import ProjectList from "./components/ProjectList.js";
import Spinner from "./components/Spinner.js";

function App() {
  const [imgBlob, setImgBlob] = React.useState();
  const [firstAction, setFirstAction] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]); // Initialize wasm-module (only once)

  React.useEffect(() => {
    init().then(() => {
      initProjects();
    });
  }, []);

  const initProjects = () => {
    getAllProjects().then(projs => {
      setIsLoading(false);
      setProjects(projs);
    });
  };

  const handleSnapShot = newSnapShotData => setImgBlob(newSnapShotData);

  const onConfirmedProject = listId => {
    setOptionsOpen(false);
    setIsLoading(true);
    fromHandwriting(listId, imgBlob, onDone);
  };

  const onDone = _listId => setIsLoading(false);

  const feature = projects.length > 0 ? /*#__PURE__*/React.createElement(ProjectList, {
    projects: projects,
    onConfirm: onConfirmedProject
  }) : /*#__PURE__*/React.createElement(Spinner, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("h1", null, "pen-to-todo", /*#__PURE__*/React.createElement("em", null, "js"), "t"), /*#__PURE__*/React.createElement(Video, {
    onSnapShot: handleSnapShot,
    firstAction: firstAction,
    onFirstAction: () => setFirstAction(false),
    isLoading: isLoading
  }), /*#__PURE__*/React.createElement(Overlay, {
    active: optionsOpen,
    feature: feature
  }), /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOptionsOpen(true)
  }, "Add Items")));
}

export default App;