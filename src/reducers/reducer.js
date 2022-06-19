import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import setDataReducer from "./setDataReducer";


const reducers = combineReducers({
  searchHistory: setDataReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
