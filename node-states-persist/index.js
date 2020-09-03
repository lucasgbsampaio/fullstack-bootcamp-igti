import { promises as fs } from 'fs';

// Inicio uma função assíncrona para lidar com o módulo filesystem
async function handleFile() {
  try {
    // Leio os JSON's e transformo em objetos JS
    const fileStates = JSON.parse(await fs.readFile('./Estados.json'));
    const fileCities = JSON.parse(await fs.readFile('./Cidades.json'));

    // Percorro fileStates a fim de escrever os nomes dos arquivos
    // De acordo com o estado. OBS: Uso for...of em vez de forEach pois
    // forEach não funciona bem no async/await
    for (const [index, value] of fileStates.entries()) {
      await fs.writeFile(`./src/${value.Sigla}.json`, '');

      // Aqui crio um array pra facilitar a formatação no segundo for
      const cities = [];

      // Dentro do primeiro for, crio outro para que agora percorra fileCities
      for (const [index2, value2] of fileCities.entries()) {
        // Se o ID do estado for igual ao ID da cidade adiciona no cities
        if (value2.Estado === value.ID) {
          cities.push(value2.Nome);
        }
      }
      // Adiciono as cidades em respectivos estados
      await fs.appendFile(`./src/${value.Sigla}.json`, JSON.stringify(cities));
    }
  } catch (error) {
    console.log(error);
  }
}

// Função para retornar a quantidade de cidades de cada estado
async function lengthCities() {
  const statesCities = [];
  const readStates = JSON.parse(await fs.readFile('./Estados.json'));
  for (const [index, value] of readStates.entries()) {
    const readJSON = JSON.parse(await fs.readFile(`./src/${value.Sigla}.json`));
    statesCities.push({ Estado: value.Sigla, Cidades: readJSON.length });
  }
  return statesCities;
}

async function biggestCities() {
  let values = await lengthCities();
  values.sort((a, b) => {
    return b.Cidades - a.Cidades;
  });
  console.log(values.slice(0, 5));
}

async function smallestCities() {
  let values = await lengthCities();
  values.sort((a, b) => {
    return a.Cidades - b.Cidades;
  });
  console.log(values.slice(0, 5).reverse());
}

async function biggestNames() {
  const readStates = JSON.parse(await fs.readFile('./Estados.json'));
  let lengthLetters = [];
  for (const [index, value] of readStates.entries()) {
    const readJSON = JSON.parse(await fs.readFile(`./src/${value.Sigla}.json`));
    let newReplace = [];
    for (let city of readJSON) {
      let replaceCity = city.replace(/\s/g, '');
      newReplace.push({ Replace: replaceCity, Cidade: city });
    }
    newReplace.sort((a, b) => {
      if (b.Replace.length > a.Replace.length) {
        return 1;
      }
      if (a.Replace.length > b.Replace.length) {
        return -1;
      }
      return 0;
    });
    lengthLetters.push({ Estado: value.Sigla, Cidade: newReplace[0].Cidade });
  }
  return lengthLetters;
}

async function smallestNames() {
  const readStates2 = JSON.parse(await fs.readFile('./Estados.json'));
  let lengthLetters2 = [];
  for (const [index, value2] of readStates2.entries()) {
    const readJSON = JSON.parse(
      await fs.readFile(`./src/${value2.Sigla}.json`)
    );
    let newReplace2 = [];
    for (let city2 of readJSON) {
      let replaceCity2 = city2.replace(/\s/g, '');
      newReplace2.push({ Replace: replaceCity2, Cidade: city2 });
    }
    newReplace2.sort((a, b) => {
      if (a.Replace.length > b.Replace.length) {
        return 1;
      }
      if (b.Replace.length > a.Replace.length) {
        return -1;
      }
      return 0;
    });
    lengthLetters2.push({
      Estado: value2.Sigla,
      Cidade: newReplace2[0].Cidade,
    });
  }
  return lengthLetters2;
}
async function biggestName() {
  const letters = await biggestNames();
  const sizeLetter = [];
  letters.sort((a, b) => {
    if (b.Cidade.length > a.Cidade.length) {
      return 1;
    }
    if (a.Cidade.length > b.Cidade.length) {
      return -1;
    }
    return 0;
  });
  sizeLetter.push({ Estado: letters[0].Estado, Cidade: letters[0].Cidade });
  console.log(letters);
  console.log(sizeLetter);
}

async function smallestName() {
  const letters2 = await smallestNames();
  const sizeLetter2 = [];
  letters2.sort((a, b) => {
    return (
      a.Cidade.length - b.Cidade.length || a.Cidade.localeCompare(b.Cidade)
    );
  });
  sizeLetter2.push({ Estado: letters2[0].Estado, Cidade: letters2[0].Cidade });
  console.log(letters2);
  console.log(sizeLetter2);
}

handleFile();
lengthCities();
biggestCities();
smallestCities();
biggestNames();
smallestNames();
biggestName();
smallestName();
