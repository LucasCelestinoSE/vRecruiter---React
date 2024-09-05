import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/home";
    return user;
  } catch (error) {
    throw new Error("Erro de autenticação: " + error.message);
  }
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = `/home`;
    return user;
  } catch (error) {
    throw new Error("Erro ao registrar: " + error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);

    localStorage.removeItem("user");
    window.location.href = "/";
  } catch (error) {
    throw new Error("Erro ao fazer logout: " + error.message);
  }
};
