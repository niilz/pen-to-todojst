export function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    import("pen-to-todoist").then((module) =>
      module.todoist_from_handwriting(imgData64)
    );
  };
}
