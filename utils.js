export function totodoist(imgData) {
  var r = new FileReader();
  r.readAsDataURL(imgData);
  r.onloadend = function () {
    var imgData64 = r.result.replace("data:image/jpeg;base64,", "");
    import("pen-to-todoist").then(function (module) {
      return module.todoist_from_handwriting(imgData64);
    });
  };
}