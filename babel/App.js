var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Video from "../src/components/Video.js";
import { totodoist } from "../src/utils.js";

function App() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      imgBlob = _React$useState2[0],
      setImgBlob = _React$useState2[1];

  var _React$useState3 = React.useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      firstAction = _React$useState4[0],
      setFirstAction = _React$useState4[1];

  var handleSnapShot = function handleSnapShot(newSnapShotData) {
    return setImgBlob(newSnapShotData);
  };
  var onDone = function onDone(listId) {
    return console.log("List-Id:", listId);
  };

  return React.createElement(
    "div",
    { className: "App" },
    React.createElement(
      "h1",
      null,
      "pen-to-todo",
      React.createElement(
        "em",
        null,
        "js"
      ),
      "t"
    ),
    React.createElement(Video, {
      onSnapShot: handleSnapShot,
      firstAction: firstAction,
      onFirstAction: function onFirstAction() {
        return setFirstAction(false);
      }
    }),
    React.createElement(
      "div",
      { className: "button-container" },
      React.createElement(
        "button",
        { onClick: function onClick() {
            return totodoist(imgBlob, onDone).then();
          } },
        "Add Items"
      )
    )
  );
}

export default App;