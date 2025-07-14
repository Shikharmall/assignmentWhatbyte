import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAsyncData = async (dataKey, data) => {
  try {
    await AsyncStorage.setItem(dataKey, data);
    return true;
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

export const getAsyncData = async (dataKey) => {
  try {
    const token = await AsyncStorage.getItem(dataKey);
    return token;
  } catch (error) {
    console.error("Error retrieving the token", error);
  }
};

export const deleteAsyncData = async (dataKey) => {
  try {
    await AsyncStorage.removeItem(dataKey);
  } catch (error) {
    console.error("Error deleting the token", error);
  }
};

export const cleanAllAsyncData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error deleting the token", error);
  }
};
