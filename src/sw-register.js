/* eslint-disable no-restricted-globals */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("registered SW"));
  }
}
