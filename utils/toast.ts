import { ToastAndroid } from "react-native";

export const showToast = (title: string) => {
  ToastAndroid.show(title, ToastAndroid.SHORT);
};
