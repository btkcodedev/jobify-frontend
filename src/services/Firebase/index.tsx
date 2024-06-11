import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  QuerySnapshot,
  DocumentData,
  getDocs,
} from 'firebase/firestore/lite';
import { firebaseConfig }from "src/secrets/config"

interface City {
  name: string;
  population: number;
}

async function getJobs(): Promise<City[]> {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);

  try {
    const JobCol = collection(db, 'jobify');
    const JobSnapshot: QuerySnapshot<DocumentData> = await getDocs(JobCol);
    const JobList: City[] = JobSnapshot.docs.map((doc) => doc.data() as City);
    return JobList;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return []; // Return empty array in case of error
  }
}

export default getJobs;
