class Vagas {
  constructor(id, name, vacancies) {
    this.id = id;
    this.name = name;
    this.vacancies = vacancies;
  }

  static fromMap(map) {
    return new Vagas(map.companyId, map.name, Array.from(map.jobs || []));
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    const map = JSON.parse(source);
    return Vagas.fromMap(map);
  }

  toMap() {
    return {
      companyId: this.id,
      name: this.name,
      jobs: this.vacancies,
    };
  }
}

export default Vagas;
