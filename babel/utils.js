import wasmInit, { get_all_projects, list_from_handwriting, largest_item_from_handwriting } from "../pkg/pen_to_todoist.js";
import credentials from "../secrets/hand-to-list-key.js";
import todoistToken from "../secrets/todoist-token.js";
export async function init() {
  await wasmInit();
}
export async function fromHandwriting(listId, imgData, signalDoneCallback, largestItemOnly) {
  const readerResult = await readImgDataAsync(imgData);
  const imgData64 = readerResult.replace("data:image/jpeg;base64,", "");
  const args = [listId, imgData64, todoistToken.todoist_token, JSON.stringify(credentials)];
  const responseListId = largestItemOnly ? largest_item_from_handwriting(...args) : list_from_handwriting(...args);
  signalDoneCallback(responseListId);
}
export async function getAllProjects() {
  console.log("called all projects");
  return await get_all_projects(todoistToken.todoist_token);
}

function readImgDataAsync(data) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = () => reject;

    reader.readAsDataURL(data);
  });
}