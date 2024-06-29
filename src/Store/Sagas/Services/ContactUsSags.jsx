import { put,takeEvery } from "redux-saga/effects";
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../../Constant";

import { createRecord, deleteRecord, getRecord, updateRecord } from "../Services/services";


function* createSaga(action){
    let response= yield createRecord("contact",action.payload)
    yield put({type:CREATE_CONTACT_US_RED, payload:response})
}

function* getSaga(){
    let response= yield getRecord("contact")
    yield put({type:GET_CONTACT_US_RED, payload:response})
}

function* updateSaga(action){
     yield updateRecord("contact",action.payload)
    yield put({type:UPDATE_CONTACT_US_RED , payload:action.payload})
}

function* deleteSaga(action){
    yield deleteRecord("contact",action.payload)
    yield put({type:DELETE_CONTACT_US_RED, payload:action.payload})
}

export default function* contactUsSagas(){
    yield takeEvery (CREATE_CONTACT_US, createSaga)
    yield takeEvery(GET_CONTACT_US, getSaga)
    yield takeEvery(UPDATE_CONTACT_US,updateSaga)
    yield takeEvery(DELETE_CONTACT_US,deleteSaga)
}