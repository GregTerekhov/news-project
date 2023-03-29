const STORAGE_KEY_NAME = 'nytimesFavorites';
const STORAGE_KEY_NAME_READ = 'nytimesRead';

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

export function addToStorageRead(id) {
  const localStorageArr = getFromStorageRead();

  const parsedStorage = localStorageArr;
  // const parsedStorage = makeParseJson(localStorageArr);

  if (!localStorageArr.some(element => element.id === id)) {
    localStorageArr.push({ id, date: currentDate() });
    localStorage.setItem(
      STORAGE_KEY_NAME_READ,
      JSON.stringify(localStorageArr)
    );
  }
}

export function getFromStorageRead() {
  const dataJson = localStorage.getItem(STORAGE_KEY_NAME_READ);
  return dataJson ? JSON.parse(dataJson) : [];
}

// export function removeFromStorageRead(id) {
//   const localStorageArr = getFromStorageRead();
//   const result = localStorageArr.filter(idFromStorage => idFromStorage !== id);
//   localStorage.setItem(STORAGE_KEY_NAME_READ, JSON.stringify(result));
//   return;
// }

export function isInStorageRead(id) {
  const localStorageArr = getFromStorageRead();
  return localStorageArr.some(element => element.id === id);
}

function currentDate() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  return currentDate;
}

function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}
