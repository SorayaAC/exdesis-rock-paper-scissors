import dataStorage from '../app/dataStorage/dataStorage';

const persist = (key, value) => {
  dataStorage.set(key, value);
};

const get = (key) => {
  return dataStorage.get(key);
};

const clear = () => {
  dataStorage.clear();
};

const remove = (key) => {
  dataStorage.remove(key);
};

export const persistenceStorage = {
  persist,
  get,
  remove,
  clear,
};
