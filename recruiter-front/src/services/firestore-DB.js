import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const getVacancies = async () => {
  try {
    const vacancyCollection = collection(db, "vagas");
    const vacancySnapshot = await getDocs(vacancyCollection);
    const vacancyData = vacancySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return vacancyData;
  } catch (error) {
    console.error("Erro ao buscar vagas:", error.message);
    throw error;
  }
};

export const getCompanies = async () => {
  try {
    const companiesCollection = collection(db, "empresas");
    const companiesSnapshot = await getDocs(companiesCollection);
    const companiesData = companiesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return companiesData;
  } catch (error) {
    throw error;
  }
};

export const getCompanyById = async (companyId) => {
  try {
    const empresasRef = collection(db, "empresas");
    const empresaDoc = await getDoc(doc(empresasRef, companyId));

    if (!empresaDoc.exists) {
      throw new Error(`Empresa com ID ${companyId} não encontrada.`);
    }

    return empresaDoc.data();
  } catch (error) {
    throw new Error("Erro ao buscar empresa por ID: " + error.message);
  }
};

export async function getVacancyById(id) {
  console.log("ID: ", id);
  try {
    const docRef = doc(db, "vagas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getVacanciesFromCompany = async (companyId) => {
  try {
    const vagasRef = collection(db, "vagas");
    const vagasSnapshot = await getDocs(vagasRef);

    const vagasDaEmpresa = vagasSnapshot.docs.filter(
      (doc) => doc.data().companyID === companyId
    );

    return vagasDaEmpresa.map((doc) => doc.data());
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return [];
  }
};

export const addFormDataToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "contatos"), formData);
  } catch (error) {
    throw error;
  }
};
