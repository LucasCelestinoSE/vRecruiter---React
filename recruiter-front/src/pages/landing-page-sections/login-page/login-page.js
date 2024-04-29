import React, { useState, useEffect } from "react";
import { useAuth } from "../../../services/auth-provider";
import "./login-page.css";

function LoginPage() {
  const { login: authLogin, register: authRegister } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("user") !== null;
    if (isUserLoggedIn) {
      window.location.href = "/home";
    }
  }, []);

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLoginOrSignUp = async () => {
    try {
      if (isLoginForm) {
        await authLogin(email, password);
      } else {
        if (password === confirmPassword) {
          await authRegister(email, password);
        } else {
          console.error("Senhas não coincidem");
          setPasswordsMatch(false);
          return;
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="background">
        <div className="left-section">
          <h2>Porque escolher a RECRUITER?</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Foco a ser líder regional</h3>
              <p>
                A RECRUITER oferece tecnologia inovadora e atendimento
                consultivo. Será a líder regional do mercado de RH.
              </p>
            </div>
            <div className="card">
              <h3>Centralização de processos</h3>
              <p>
                Tenha a visibilidade dos seus processos, da atração ao
                engajamento, e ganhe eficiência na gestão.
              </p>
            </div>
            <div className="card">
              <h3>Jornada Única</h3>
              <p>
                Ofereça uma experiência simples, fluida e encantadora tanto para
                as pessoa colaboradora quanto para pessoa candidata.
              </p>
            </div>
            <div className="card">
              <h3>Tecnologia de ponta</h3>
              <p>
                Tenha acesso a solução mais completa e segura do mercado com 99%
                de uptime da plataforma.
              </p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>{isLoginForm ? "LOGIN" : "CRIAR CONTA"}</h2>
          <p>
            Entre com sua conta ou crie uma nova para acessar todas as
            funcionalidades do site!
          </p>

          <form>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">SENHA</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLoginForm && (
              <div className="form-group">
                <label htmlFor="confirmPassword">CONFIRMAR SENHA</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {isLoginForm && (
              <p className="forgot-password">
                Esqueceu a senha?{" "}
                <button className="password-button">Clique aqui</button>
              </p>
            )}
            <div className="form-actions">
              <button
                type="button"
                className="login-button"
                onClick={handleLoginOrSignUp}
              >
                {isLoginForm ? "LOGIN" : "CRIAR CONTA"}
              </button>
              <button
                type="button"
                className="toggle-button"
                onClick={handleToggleForm}
              >
                {isLoginForm ? "CRIAR CONTA" : "LOGIN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
