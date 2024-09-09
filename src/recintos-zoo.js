import { animais, recintos } from "./data";

class RecintosZoo {
  constructor() {
    this.recintos = recintos

    this.animais = animais
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

      console.log(
        `Recinto ${recinto.numero} - Espaço ocupado: ${espacoOcupado}`
      );

      // Verifica se já há a mesma espécie no recinto
      const mesmaEspecieNoRecinto = recinto.animais.some(
        (animalNoRecinto) => animalNoRecinto.especie === animal
      );

      // Calcula o espaço necessário para adicionar o novo animal
      const espacoNecessario = quantidade * especieInfo.tamanho;

      // Calcula o espaço restante considerando o espaço extra apenas se for um novo tipo de animal
      const espacoExtra =
        !mesmaEspecieNoRecinto && recinto.animais.length > 0 ? 1 : 0;
      const espacoRestante = recinto.tamanho - espacoOcupado - espacoExtra;
      console.log(
        `Recinto ${recinto.numero} - Espaço necessário: ${espacoNecessario}`
      );

      console.log(
        `Recinto ${recinto.numero} - Espaço restante: ${espacoRestante}`
      );

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
