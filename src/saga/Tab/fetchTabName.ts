import { fetchTabNameFromAPI } from 'src/services/Tab';
import {
  setTabName,
  setTabNameFailure,
  setTabNameSuccess,
} from 'src/store/Tab/tabSlice';
import { put, call } from 'redux-saga/effects';

export default function* fetchTabName() {
  try {
    const name: string = yield call(fetchTabNameFromAPI);
    yield put(setTabName(name));
    yield put(setTabNameSuccess());
  } catch (error) {
    yield put(setTabNameFailure());
    console.error('Failed to fetch tab name', error);
  }
}
