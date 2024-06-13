import { call, put } from 'redux-saga/effects';
import {
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  fetchCompanies,
} from 'src/store/Firebase/firebaseSlice';
import { getCompanies } from 'src/services/Firebase';
import { messages } from 'src/helpers/messages';

export default function* fetchCompaniesSaga(): Generator<any, void, any> {
  try {
    yield put(fetchCompanies());
    const companiesList = yield call(getCompanies);
    yield put(fetchCompaniesSuccess(companiesList));
  } catch (error) {
    yield put(fetchCompaniesFailure(messages.error));
  }
}
