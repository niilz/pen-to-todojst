// import init, { todoist_from_handwriting } from "./pkg/pen_to_todoist";
import * as Todoist from "pen-to-todoist";

export function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    /*
    fetch("./pen_to_todoist.wasm")
      .then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, {}))
      .then((result) =>
        result.instance.exports.todoist_from_handwriting(imgData64)
      );
    import("pen-to-todoist").then((module) => {
      let digitalList = module.todoist_from_handwriting(imgData64);
      console.log(digitalList);
    });
    */
    Todoist.todoist_from_handwriting(imgData64);
  };
}
