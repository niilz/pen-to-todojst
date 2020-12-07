// import "./App.css";
import Video from "./src/components/Video.js";
import { totodoist } from "./utils.js";

function App() {
  let [imgBlob, setImgBlob] = React.useState();
  let [firstAction, setFirstAction] = React.useState(true);

  const handleSnapShot = (newSnapShotData) => setImgBlob(newSnapShotData);

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
        <button onClick={() => totodoist(imgBlob)}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
