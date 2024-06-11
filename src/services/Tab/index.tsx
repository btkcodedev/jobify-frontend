export function fetchTabNameFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fetched Tab Name');
    }, 1000);
  });
}
