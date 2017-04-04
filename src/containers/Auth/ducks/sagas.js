import axios from 'axios';
import { fork, call, put, takeLatest } from 'redux-saga/effects';

import { BASE_URL } from 'config/constants';

import * as types from './actionTypes';


// Login
export function *requestLogin(action) {
  const url = `${BASE_URL}/login`;
  const config = {
    headers: {'Content-Type': 'application/json'},
  };

  try {
    const response = yield call(axios.post, url, action.payload, config);

    yield put({ type: types.LOGIN_SUCCESS, payload: response.data });
  }catch (error) {
    yield put({ type: types.LOGIN_ERROR, payload: error.message });
  }
}

// Register
export function *requestRegister(action) {
  const url = `${BASE_URL}/users`;
  const config = {
    headers: {'Content-Type': 'application/json'},
  };

  try {
    const response = yield call(axios.post, url, action.payload, config);
    yield put({ type: types.REGISTER_SUCCESS, payload: response.data });
  }catch (error) {
    yield put({ type: types.REGISTER_ERROR, payload: error.response });
  }
}

// Auth watcher
export function *handleAuth() {
  yield takeLatest(types.LOGIN_SUBMIT, requestLogin);
  yield takeLatest(types.REGISTER_SUBMIT, requestRegister);
}

export default function *() {
  yield [
    fork(handleAuth),
  ];
}
