class RecintosZoo {
    constructor() {
      this.recintos = [
        {
          numero: 1,
          bioma: 'savana',
          tamanho: 10,
          animais: [{ especie: 'LEAO', quantidade: 1 }],
        },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        {
          numero: 3,
          bioma: 'savana e rio',
          tamanho: 7,
          animais: [{ especie: 'GAZELA', quantidade: 1 }],
        },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        {
          numero: 5,
          bioma: 'savana',
          tamanho: 9,
          animais: [{ especie: 'LEOPARDO', quantidade: 1 }],
        },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
  
      if (quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const especieInfo = this.animais[animal];
      const recintosViaveis = [];
  
      this.recintos.forEach((recinto) => {
        // Calcula o espaço ocupado considerando todos os animais no recinto
        const espacoOcupado = recinto.animais.reduce((total, animalNoRecinto) => {
          const especie = this.animais[animalNoRecinto.especie];
          return total + animalNoRecinto.quantidade * especie.tamanho;
        }, 0);
  
        // Verifica se já há a mesma espécie no recinto
        const mesmaEspecieNoRecinto = recinto.animais.some(
          (animalNoRecinto) => animalNoRecinto.especie === animal
        );
  
        // Calcula o espaço necessário para adicionar o novo animal
        const espacoNecessario = quantidade * especieInfo.tamanho;
  
        // Calcula o espaço restante considerando o espaço extra apenas se for um novo tipo de animal
        const espacoExtra = !mesmaEspecieNoRecinto && recinto.animais.length > 0 ? 1 : 0;
        const espacoRestante = recinto.tamanho - espacoOcupado - espacoExtra;
  
        // Verifica bioma e espaço disponível
        if (
          especieInfo.biomas.includes(recinto.bioma) &&
          espacoRestante >= espacoNecessario
        ) {
          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${
              espacoRestante - espacoNecessario
            } total: ${recinto.tamanho})`
          );
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  