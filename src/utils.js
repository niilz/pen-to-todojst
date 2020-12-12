import init, { todoist_from_handwriting } from "../pkg/pen_to_todoist.js";
import credentials from "../secrets/hand-to-list-key.js";
import todoistToken from "../secrets/todoist-token.js";

export async function totodoist(imgData, signalDone) {
  let readerResult = await readImgDataAsync(imgData);
  let imgData64 = readerResult.replace("data:image/jpeg;base64,", "");
  await init();
  let listId = await todoist_from_handwriting(
    imgData64,
    todoistToken.todoist_token,
    JSON.stringify(credentials)
  );
  signalDone(listId);
}

function readImgDataAsync(data) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject;
    reader.readAsDataURL(data);
  });
}
