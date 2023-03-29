const STORAGE_KEY_NAME = 'nytimesapp';

export function addToStorage(id) {
  const localStorageArr = getFromStorage();
  if (!localStorageArr.some(element => element === id)) {
    localStorageArr.push(id);
    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(localStorageArr));
  }
}

export function getFromStorage() {
  const dataJson = localStorage.getItem(STORAGE_KEY_NAME);
  return dataJson ? JSON.parse(dataJson) : [];
}

export function removeFromStorage(id) {
  const localStorageArr = getFromStorage();
  const result = localStorageArr.filter(idFromStorage => idFromStorage !== id);
  localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(result));
  return;
}

export function isInStorage(id) {
  const localStorageArr = getFromStorage();
  return localStorageArr.some(element => element === id);
}
