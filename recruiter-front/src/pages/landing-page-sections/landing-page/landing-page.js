import React, { useEffect, useRef } from "react";
import "./landing-page.css";
import Lottie from "lottie-web";
import logo from "../../../assets/images/logo-bgr.png";
import TextTransition, { presets } from "react-text-transition";

function LandingPage() {
  const [index, setIndex] = React.useState(0);
  const words = ["talento", "experiência", "resultados"];

  const container = useRef(null);

  React.useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../assets/anim/scroll_down_anim.json"),
    });

    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);

    return () => {
      animation.destroy();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="landing-page-body">
      <div className="container">
        <div className="right-text">
          <h1>
            <div className="text-transition">
              <h1>Exale&nbsp;</h1>
              <TextTransition
                direction="down"
                springConfig={presets.gentle}
                style={{ color: "#2BC58C" }}
              >
                {words[index % words.length]}
              </TextTransition>
            </div>
            com uma plataforma fluída e inteligente para o seu RH.
          </h1>

          <p>
            Só a RECRUITER entrega uma plataforma completa para contratar,
            admitir, treinar, avaliar e engajar sua equipe de forma simples em
            uma jornada única e digital.
          </p>
        </div>
        <img src={logo} alt="Recruiter logo" className="left-image" />
      </div>

      <div className="footer">
        <p>Navegue pelo site e saiba mais</p>
        <div className="animation" ref={container}></div>
      </div>
    </div>
  );
}

export default LandingPage;
