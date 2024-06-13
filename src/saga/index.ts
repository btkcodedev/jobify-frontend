import { all, fork, takeLatest } from 'redux-saga/effects';
import fetchTabName from 'src/saga/Tab/fetchTabName';
import { FETCH_COMPANIES_REQUEST, FETCH_DATA_REQUEST } from 'src/store/Firebase/constants';
import fetchDataSaga from './Firebase/fetchDataSaga';
import { FETCH_TAB_NAME } from 'src/store/Tab/constants';
import fetchCompaniesSaga from 'src/saga/Firebase/fetchCompaniesList';

function* watcher() {
  yield takeLatest(FETCH_TAB_NAME, fetchTabName);
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
  yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompaniesSaga);
}

export default function* rootSaga() {
  yield all([fork(watcher)]);
}
