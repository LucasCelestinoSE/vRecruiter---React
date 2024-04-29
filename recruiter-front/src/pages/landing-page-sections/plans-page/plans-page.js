import "./plans-page.css";

function PlansPage() {
  return (
    <div className="plans-container">
      <div className="cards">
        <div className="card-1">
          <h2>BÁSICO</h2>
          <ul>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
          </ul>
          <button type="button" className="select-button">
            SELECIONAR
          </button>
        </div>

        <div className="card-2">
          <h2>PREMIUM</h2>
          <ul>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
          </ul>
          <button type="button" className="select-button">
            SELECIONAR
          </button>
        </div>

        <div className="card-3">
          <h2>REGULAR</h2>
          <ul>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
            <li>Tem alguma coisa escrita aqui</li>
          </ul>
          <button type="button" className="select-button">
            SELECIONAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlansPage;
