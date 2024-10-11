import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
import { db } from "./firebase";

export const saveUserProfile = async (uid, profileData, profileImage) => {
  try {
    if (!uid) {
      throw new Error("UID não fornecido ao salvar o perfil do usuário.");
    }

    let imageUrl = "";
    if (profileImage) {
      imageUrl = await saveProfileImageToStorage(uid, profileImage);
    }

    if (imageUrl) {
      profileData.photoURL = imageUrl;
    }

    const profileRef = doc(collection(db, "users"), uid);
    await setDoc(profileRef, profileData);
  } catch (error) {
    throw error;
  }
};

export const saveProfileImageToStorage = async (userID, imageFile) => {
  const storageRef = ref(storage, `users/${userID}/profile-image.jpg`);
  const metadata = {
    contentType: "image/jpeg",
  };

  await uploadBytes(storageRef, imageFile, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const saveCompanyImageToStorage = async (
  companyID,
  imageFile,
  imageType
) => {
  const storageRef = ref(
    storage,
    `companies/${companyID}/images/${imageType}.jpg`
  );
  const metadata = {
    contentType: "image/jpeg",
  };

  await uploadBytes(storageRef, imageFile, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const getUserProfile = async (uid) => {
  try {
    if (!uid) {
      return null;
    }

    const profileRef = doc(collection(db, "users"), uid);
    const profileDoc = await getDoc(profileRef);

    if (profileDoc.exists()) {
      return profileDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const editCompany = async (companyId, updatedData) => {
  try {
    const companyRef = doc(db, "empresas", companyId);
    await setDoc(companyRef, updatedData, { merge: true });
    console.log("Empresa editada com sucesso.");
  } catch (error) {
    throw new Error("Erro ao editar empresa: " + error.message);
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const storageRef = ref(storage, `images/${companyId}/`);
    await deleteObject(storageRef);

    // 2. Excluir todas as vagas associadas à empresa
    const vacanciesRef = collection(db, "vagas");
    const vacanciesQuery = query(
      vacanciesRef,
      where("companyId", "==", companyId)
    );
    const vacanciesSnapshot = await getDocs(vacanciesQuery);

    const deletePromises = vacanciesSnapshot.docs.map(async (vacancyDoc) => {
      await deleteDoc(doc(vacanciesRef, vacancyDoc.id));
    });

    await Promise.all(deletePromises);

    // 3. Excluir a empresa
    const companyRef = doc(db, "empresas", companyId);
    await deleteDoc(companyRef);
    console.log("Empresa e seus registros deletados com sucesso.");
  } catch (error) {
    throw new Error("Erro ao deletar empresa: " + error.message);
  }
};

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

export const saveNewVacancy = async (vacancyData) => {
  try {
    const vacancyCollectionRef = collection(db, "vagas");
    const newVacancyDocRef = await addDoc(vacancyCollectionRef, vacancyData);

    return newVacancyDocRef.id;
  } catch (error) {
    throw error;
  }
};

export async function getVacancyById(id) {
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

    const vagasDaEmpresa = vagasSnapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.companyID === companyId;
    });

    return vagasDaEmpresa.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
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
