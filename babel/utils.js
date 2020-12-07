import init, { todoist_from_handwriting } from "../pkg/pen_to_todoist.js";
import credentials from "../secrets/hand-to-list-key.js";
import todoistToken from "../secrets/todoist-token.js";

export function totodoist(imgData) {
  var r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = function () {
    var imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    init().then(function (_) {
      return todoist_from_handwriting(imgData64, todoistToken.todoist_token, JSON.stringify(credentials));
    });
  };
}