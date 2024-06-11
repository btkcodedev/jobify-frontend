import { call, put } from 'redux-saga/effects';
import {
  fetchDataSuccess,
  fetchDataFailure,
} from 'src/store/Firebase/firebaseSlice';
import getJobs from 'src/services/Firebase';
import { messages } from 'src/helpers/messages';

export default function* fetchDataSaga(): Generator<any, void, any> {
  try {
    const jobList = yield call(getJobs);
    yield put(fetchDataSuccess(jobList));
  } catch (error) {
    yield put(fetchDataFailure(messages.error));
  }
}
