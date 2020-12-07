/* eslint-disable no-restricted-globals */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(function () {
      return console.log("registered SW");
    });
  }
}