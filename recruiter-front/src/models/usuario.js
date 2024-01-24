class Usuario {
  constructor(
    name,
    email,
    telefone,
    idade,
    genero,
    cep,
    cidade,
    estado,
    experiencias,
    formacoes,
    idiomas,
    habilidades,
    deficiencias
  ) {
    this.name = name;
    this.email = email;
    this.telefone = telefone;
    this.idade = idade;
    this.genero = genero;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.experiencias = experiencias;
    this.formacoes = formacoes;
    this.idiomas = idiomas;
    this.habilidades = habilidades;
    this.deficiencias = deficiencias;
  }

  static fromMap(map) {
    return new Usuario(
      map.name || "",
      map.email || "",
      map.profile.telefone || "",
      map.profile.genero || "",
      map.profile.idade || "",
      map.profile.cep || "",
      map.profile.cidade || "",
      map.profile.estado || "",
      Array.from(map.profile.experiencias || []),
      Array.from(map.profile.formacoes || []),
      Array.from(map.profile.idiomas || []),
      Array.from(map.profile.habilidades || []),
      Array.from(map.profile.deficiencia || [])
    );
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    const map = JSON.parse(source);
    return Usuario.fromMap(map);
  }

  toMap() {
    return {
      name: this.name,
      email: this.email,
      profile: {
        telefone: this.telefone,
        genero: this.genero,
        idade: this.idade,
        cep: this.cep,
        cidade: this.cidade,
        estado: this.estado,
        experiencias: this.experiencias,
        formacoes: this.formacoes,
        idiomas: this.idiomas,
        habilidades: this.habilidades,
        deficiencia: this.deficiencias,
      },
    };
  }
}

export default Usuario;
