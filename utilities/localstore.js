import { AsyncStorage } from "react-native";
export const getItemFromLocalStorage = async key => {
  return await AsyncStorage.getItem(key);
};
export const saveItemToLocalStorage = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};
export const getItemFromLocalStorageSync = key => {
  return (async () => await AsyncStorage.getItem(key))();
};
