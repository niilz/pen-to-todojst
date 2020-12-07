import init, { todoist_from_handwriting } from "./pkg/pen_to_todoist.js";

export function totodoist(imgData) {
  var r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = function () {
    var imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    init().then(function (_) {
      return todoist_from_handwriting(imgData64);
    });
    /*
    import("pen-to-todoist").then((module) =>
      module.todoist_from_handwriting(imgData64)
    );
    */
  };
}