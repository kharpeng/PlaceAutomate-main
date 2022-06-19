import { SET_DATA } from "../constants/ActionTypes";

const setData = (content) => {
  return {
    type: SET_DATA,
    payload: content,
  };
};

export const saveData = (content) => (dispatch) => {
   dispatch(setData(content));
};
