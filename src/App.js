import Video from "./components/Video.js";
import { totodoist } from "./utils.js";
import Overlay from "./components/Overlay.js";

function App() {
  let [imgBlob, setImgBlob] = React.useState();
  let [firstAction, setFirstAction] = React.useState(true);

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);
  const onAddItems = () => {
    setIsLoading(true);
    totodoist(imgBlob, onDone);
  };
  const onDone = (_listId) => setIsLoading(false);

  return (
    <div className="App">
      <h1>
        pen-to-todo<em>js</em>t
      </h1>
      <Video
        onSnapShot={handleSnapShot}
        firstAction={firstAction}
        onFirstAction={() => setFirstAction(false)}
      />
      <div className="button-container">
        <button onClick={onAddItems}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
