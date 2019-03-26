import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object'
      && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
)

export default configureStore;
