import { SET_DATA } from "../constants/ActionTypes";

const INITIAL_STATE = {
  name: [],
  places: [],
};

const setDataReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
    case SET_DATA:
      return { 
        ...state,
        name: [...state.name,action.payload.name],places:[...state.places, action.payload.places] };
    default:
      return state;
  }
};
export default setDataReducer;
