import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import RootReducers from "./Reducers/RootReducers";
import RootSagas from "./Sagas/RootSagas";

const saga= createSagaMiddleware()

const Store = configureStore({
    reducer : RootReducers,
    middleware:()=>[saga]
})
export default Store;

saga.run(RootSagas)