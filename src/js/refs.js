export function onGetLocaleStorageData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)); // получаем массив объектов из Локального Хранилища
  } catch (error) {
    console.log(error);
  }
}
