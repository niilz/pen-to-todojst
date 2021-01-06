import Video from "./components/Video.js";
import { totodoist } from "./utils.js";
import Overlay from "./components/Overlay.js";

function App() {
  const [imgBlob, setImgBlob] = React.useState();
  const [firstAction, setFirstAction] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayListId, setDisplayListId] = React.useState(false);
  const [listId, setListId] = React.useState();

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);
  const onAddItems = () => {
    setIsLoading(true);
    totodoist(imgBlob, onDone);
  };
  const onDone = (listId) => {
    setIsLoading(false);
    setListId(listId);
    setDisplayListId(true);
  };

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
      <Overlay
        active={displayListId}
        listId={listId}
        removeOverlay={() => setDisplayListId(false)}
      />
      <div className="button-container">
        <button onClick={onAddItems}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
