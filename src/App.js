import Video from "./components/Video.js";
import { init, fromHandwriting, getAllProjects } from "./utils.js";
import Overlay from "./components/Overlay.js";
import ProjectList from "./components/ProjectList.js";
import Spinner from "./components/Spinner.js";

function App() {
  const [imgBlob, setImgBlob] = React.useState();
  const [isLoading, setIsLoading] = React.useState(undefined);
  const [isTransmitting, setIsTransmitting] = React.useState(false);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  // Initialize wasm-module (only once)
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
    getAllProjects().then((projs) => {
      setIsTransmitting(false);
      setProjects(projs);
    });
  };

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);
  const onConfirmedProject = (listId) => {
    setOptionsOpen(false);
    setIsTransmitting(true);
    fromHandwriting(listId, imgBlob, onDone);
  };
  const onDone = (_listId) => setIsTransmitting(false);

  const feature = isLoading ? (
    <Spinner />
  ) : (
    <ProjectList projects={projects} onConfirm={onConfirmedProject} />
  );

  return (
    <div className="App">
      <h1>
        pen-to-todo<em>js</em>t
      </h1>
      <Video
        onSnapShot={handleSnapShot}
        isTransmitting={isTransmitting}
        resetImgData={() => setImgBlob(null)}
      />
      <Overlay active={optionsOpen}>{feature}</Overlay>
      <div className="add-button">
        <button
          className={`${imgBlob ? "" : "disabled"}`}
          onClick={openOpentions}
        >
          Add Items
        </button>
      </div>
    </div>
  );
}

export default App;
