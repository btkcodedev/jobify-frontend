import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  QuerySnapshot,
  DocumentData,
  getDocs,
} from 'firebase/firestore/lite';
import { firebaseConfig } from 'src/secrets/config';
import { Jobs, Company } from 'src/types';

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export async function getJobs(companyName: string): Promise<Jobs[]> {
  try {
    const JobCol = collection(db, companyName);
    const JobSnapshot: QuerySnapshot<DocumentData> = await getDocs(JobCol);
    const JobList: Jobs[] = JobSnapshot.docs.map((doc) => doc.data() as Jobs);
    return JobList;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function getCompanies(): Promise<Company[]> {
  try {
    const companies = collection(db, 'companies');
    const companiesSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      companies,
    );
    const companiesList: Company[] = companiesSnapshot.docs.map(
      (doc) => doc.data() as Company,
    );
    return companiesList;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}
