/* eslint-disable no-restricted-globals */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
    console.log("registered SW");
  }
}
