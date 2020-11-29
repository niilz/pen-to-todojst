export function totodoist(imgData) {
  let r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = () => {
    let imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    import("pen-to-todoist").then((module) => {
      let digitalList = module.todoist_from_handwriting(imgData64);
      console.log(digitalList);
    });
  };
}
