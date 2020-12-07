import init, { todoist_from_handwriting } from "../pkg/pen_to_todoist.js";

export function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    init().then((_) => todoist_from_handwriting(imgData64));
  };
}
