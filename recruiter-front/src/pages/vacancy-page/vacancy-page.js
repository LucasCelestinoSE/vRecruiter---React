import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Banner from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import "./vacancy-page.css";

const VacancyPage = () => {
  return (
    <>
      <div className="VacancyPage-container">
        <Link to="/home" className="VacancyPage-back-button">
          <IoChevronBack />
        </Link>
        <img
          className="VacancyPage-large-image"
          src={Banner}
          alt="Imagem Grande"
        />
        <div className="VacancyPage-company-info">
          <img
            className="VacancyPage-small-image"
            src={Logo}
            alt="Imagem Pequena"
          />
          <p className="VacancyPage-image-text">RECRUITER</p>
          <button className="VacancyPage-image-button">Candidatar-se</button>
        </div>
      </div>

      <div className="VacancyPage-content">
        <h1 className="VacancyPage-title">Desenvolvedor Flutter</h1>
        <p className="VacancyPage-description">
          There is no strife, no prejudice, no national conflict in outer space
          as yet. Its hazards are hostile to us all. Its conquest deserves the
          best of all mankind, and its opportunity for peaceful cooperation many
          never come again. But why, some say, the moon? Why choose this as our
          goal? And they may well ask why climb the highest mountain? Why, 35
          years ago, fly the Atlantic? Why does Rice play Texas? We choose to go
          to the moon. We choose to go to the moon in this decade and do the
          other things, not because they are easy...
        </p>

        <h2>REQUISITOS</h2>
        <div className="requisitos">
          <p>
            ● Experiência em Flutter: Proficiência sólida no desenvolvimento de
            aplicativos usando o framework Flutter, incluindo conhecimento em
            Dart, widgets, gerenciamento de estado e roteamento de navegação.{" "}
            <br />
            ● Conhecimento de Dart: Compreensão profunda da linguagem de
            programação Dart e suas características, como tipos estáticos,
            assíncronos/await, classes, mixins e extensões. <br />
            ● Familiaridade com o ambiente de desenvolvimento: Capacidade de
            configurar e usar efetivamente um ambiente de desenvolvimento
            Flutter, incluindo o Flutter SDK, o Android Studio ou o Visual
            Studio Code com as extensões necessárias. <br />● Desenvolvimento de
            interfaces de usuário responsivas: Habilidade para criar interfaces
            de usuário atraentes e responsivas usando widgets Flutter, layouts
            flexíveis, temas, animações e transições. <br />
            ● Gerenciamento de estado: Experiência em escolher e implementar uma
            solução de gerenciamento de estado apropriada para o aplicativo
            Flutter, como o Provider, Bloc, MobX ou Redux. <br />
            ● Integração de API: Capacidade de se integrar a serviços de
            back-end e consumir APIs RESTful ou GraphQL para recuperar e enviar
            dados de um aplicativo Flutter. <br />
            ● Manipulação de dados: Competência em trabalhar com diferentes
            fontes de dados, como bancos de dados locais (por exemplo, SQLite),
            armazenamento em cache, compartilhamento de preferências e
            gerenciamento de estado persistente. <br />
            ● Testes e depuração: Conhecimento das melhores práticas de teste de
            unidade, teste de widget e depuração de aplicativos Flutter para
            garantir a qualidade e a estabilidade do software. <br />
            ● Publicação de aplicativos: Experiência em compilar, implantar e
            publicar aplicativos Flutter nas lojas de aplicativos, como a Google
            Play Store e a Apple App Store. <br />
            ● Conhecimento de plataformas móveis: Compreensão dos princípios e
            padrões de design específicos de cada plataforma (Android e iOS)
            para criar experiências de usuário nativas e adaptadas. <br />
            ● Versionamento de código: Familiaridade com sistemas de controle de
            versão, como Git, para colaborar com uma equipe de desenvolvimento e
            gerenciar efetivamente o código fonte do aplicativo. <br />●
            Comunicação e trabalho em equipe: Habilidades de comunicação eficaz,
            capacidade de trabalhar em equipe, participar de revisões de código,
            discutir ideias e resolver problemas em conjunto.
          </p>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
