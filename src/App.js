import "./App.css";
import Video from "./components/Video";
import React, { useState } from "react";
import { totodoist } from "./utils";

function App() {
  let [imgBlob, setImgBlob] = useState();
  let [firstAction, setFirstAction] = useState(true);

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
