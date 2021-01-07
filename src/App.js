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
  const [projects, setProjects] = React.useState([]);

  // Initialize wasm-module (only once)
  React.useEffect(() => {
    init().then(() => {
      initProjects();
    });
  }, []);

  const initProjects = () => {
    getAllProjects().then((projs) => {
      setIsLoading(false);
      setProjects(projs);
    });
  };

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);
  const onConfirmedProject = (listId) => {
    setOptionsOpen(false);
    setIsLoading(true);
    fromHandwriting(listId, imgBlob, onDone);
  };
  const onDone = (_listId) => setIsLoading(false);

  const feature =
    projects.length > 0 ? (
      <ProjectList projects={projects} onConfirm={onConfirmedProject} />
    ) : (
      <Spinner />
    );

  return (
    <div className="App">
      <h1>
        pen-to-todo<em>js</em>t
      </h1>
      <Video
        onSnapShot={handleSnapShot}
        firstAction={firstAction}
        onFirstAction={() => setFirstAction(false)}
        isLoading={isLoading}
      />
      <Overlay active={optionsOpen} feature={feature} />
      <div className="button-container">
        <button onClick={() => setOptionsOpen(true)}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
