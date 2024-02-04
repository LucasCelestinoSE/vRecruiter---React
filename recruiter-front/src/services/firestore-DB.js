import { collection, addDoc, getDocs } from "firebase/firestore";
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
    console.error("Erro ao buscar empresas:", error.message);
    throw error;
  }
};

export const addFormDataToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "contatos"), formData);
    console.log("Documento adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar dados ao Firestore: ", error);
    throw error;
  }
};
