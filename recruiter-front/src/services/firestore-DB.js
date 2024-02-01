import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addFormDataToFirestore = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "contatos"), formData);
    console.log("Documento adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar dados ao Firestore: ", error);
    throw error;
  }
};
