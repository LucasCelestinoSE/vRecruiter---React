class Empresa {
  constructor(companies) {
    this.companies = companies;
  }

  toMap() {
    return {
      empresas: this.companies,
    };
  }

  static fromMap(map) {
    return new Empresa(map.empresas);
  }
  // Comentário.
  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    const map = JSON.parse(source);
    return Empresa.fromMap(map);
  }
}

export default Empresa;
