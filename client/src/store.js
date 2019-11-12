import { createStore, applyMiddleware, compose } from "redux"

import thunk from "redux-thunk"
import rootReducer from "./reducers"

const initialState = {};

const middleware = [thunk]
// const store = createStore(rootReducer, initialState, compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middleware))
//     )

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(...middleware)
      ));

export default store;