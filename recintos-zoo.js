class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'] },
        LEOPARDO: { tamanho: 2, biomas: ['savana'] },
        CROCODILO: { tamanho: 3, biomas: ['rio'] },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, biomas: ['savana'] },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
      };
    }
  
    verificaRecinto(recinto, especie, quantidade) {
      const espacoNecessario = this.animais[especie].tamanho * quantidade;
  
      // Verifica bioma compatível
      if (!this.animais[especie].biomas.includes(recinto.bioma)) {
        return false;
      }
  
      // Calcula o espaço ocupado e disponível no recinto
      let espacoOcupado = recinto.animais.reduce((acc, animal) =>
        acc + (this.animais[animal.especie].tamanho * animal.quantidade), 0);
  
      // Adiciona um espaço extra se houver mais de uma espécie no recinto
      const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== especie ? 1 : 0;
      const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
  
      if (espacoNecessario > espacoDisponivel) {
        return false;
      }
  
      // Regras de convivência de carnívoros
      const eCarnivoro = ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(especie);
      const existeCarnivoroNoRecinto = recinto.animais.some(animal =>
        ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal.especie));
  
      if (eCarnivoro && existeCarnivoroNoRecinto && recinto.animais[0].especie !== especie) {
        return false;
      }
  
      // Regras para macacos (precisam de companhia)
      if (especie === 'MACACO' && recinto.animais.length === 0) {
        return false;
      }
  
      // Regras para hipopótamos (devem estar em "savana e rio")
      if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
        return false;
      }
  
      return true;
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      const especieNormalizada = tipoAnimal.toUpperCase();
  
      // Verifica se o animal informado é válido
      if (!this.animais[especieNormalizada]) {
        return  {erro: "Animal inválido"};
      }
  
      // Verifica se a quantidade de animais é válida
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const recintosViaveis = this.recintos
        .filter(recinto => this.verificaRecinto(recinto, especieNormalizada, quantidade))
        .map(recinto => {
          const espacoOcupado = recinto.animais.reduce((acc, animal) =>
            acc + (this.animais[animal.especie].tamanho * animal.quantidade), 0);
          const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== especieNormalizada ? 1 : 0;
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
  
          return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`;
        });
  
      // Verifica se há recintos viáveis
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
