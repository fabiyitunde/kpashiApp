import * as uuid from "react-native-uuid";
export const getNewGUID = () => {
  const uniqueid = uuid.v4();
  return uniqueid;
};
