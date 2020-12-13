import Video from "./components/Video.js";
import { totodoist } from "./utils.js";

function App() {
  const [imgBlob, setImgBlob] = React.useState();
  const [firstAction, setFirstAction] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

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
        isLoading={isLoading}
      />
      <div className="button-container">
        <button onClick={onAddItems}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
