import { all, fork, takeLatest } from 'redux-saga/effects';
import fetchTabName from './Tab/fetchTabName';
import { FETCH_DATA_REQUEST } from 'src/store/Firebase/constants';
import fetchDataSaga from './Firebase/fetchDataSaga';
import { FETCH_TAB_NAME } from 'src/store/Tab/constants';

function* watcher() {
  yield takeLatest(FETCH_TAB_NAME, fetchTabName);
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

export default function* rootSaga() {
  yield all([fork(watcher)]);
}
