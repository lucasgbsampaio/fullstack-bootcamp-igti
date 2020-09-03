//Estado da aplicação (state)
// Aqui cria variaveis globais para que posteriormente sejam aproveitadas
// de acordo com sua ocorrencia no programa
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

// Aqui começa o programa de verdade, após a pagina carregar, todos os elementos
// são guardados nas variaveis para que posteriormente sejam manipulados
// Alem disso, no final chama a funçao fetchCountries para que dê continuaçao ao
// programa
window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulationList = document.querySelector('#totalPopulationList');

  // prettier-ignore
  totalPopulationFavorites = 
  document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

// Aqui faz a requisiçao http com o fetch, absorve os dados relevantes e
// armazena na variavel AllCountries
// que de começo foi criada como uma variavel global, porem agora ela ja esta
// com valor. No final disso, chama a funçao render() para a continuaçao
async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map((country) => {
    const { name, population, flag, numericCode } = country;

    return {
      id: numericCode,
      name,
      population,
      flag,
      formattedPopulation: formatNumber(population),
    };
  });

  render();
}

// Aqui começa as funções da aplicaçao
function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

// Aqui é criada uma funçao que carrega a lista de paises, buscando na variavel
// allCountries que ja possui valores, e entao retribui nomes a elas para ficar
// mais facil a manipulaçao, depois disso é feito a inserçao dessa lista por
// meio de template literals
function renderCountryList() {
  // abre uma div
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const countryHTML = `
      <div class='country'>
        <div>
           <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}" />
        </div>
        <div>
          <ul>
            <li>${name}<li>
            <li>${formattedPopulation}<li>
          </ul>
        </div>
      </div>
    `;

    // adiciona cada div formada a div principal
    countriesHTML += countryHTML;
  });

  // concatena com o fechamento da div la de cima
  countriesHTML += '</div>';

  // ao final de tudo manda essa manipulaçao direto pro html que tem um
  // elemento div com id tabCountries, que lista os paises
  tabCountries.innerHTML = countriesHTML;
}

// Aqui carrega a lista de favoritos, a mesma coisa que a funçao de cima
function renderFavorites() {
  let favoritesHTML = "<div class='favoriteCountries'>";

  favoriteCountries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
           <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}" />
        </div>
        <div>
          <ul>
            <li>${name}<li>
            <li>${formattedPopulation}<li>
          </ul>
        </div>
      </div>
    `;

    favoritesHTML += favoriteCountryHTML;
  });

  tabFavorites.innerHTML = favoritesHTML;
}

// Aqui começa a logica mais complexa do programa,
// a funçao carrega o total dos Paises e populaçao de ambas as listas
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const populationList = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const populationFavorites = favoriteCountries.reduce(
    (accumulator, current) => {
      return accumulator + current.population;
    },
    0
  );

  totalPopulationList.textContent = formatNumber(populationList);
  totalPopulationFavorites.textContent = formatNumber(populationFavorites);
}

// Aqui vamos manipular os eventos dos botoes
function handleCountryButtons() {
  // pega todos os botoes, transforma em um array e armazena na variavel
  // pra ambas as listas
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  // percorre os botoes da lista principal e adiciona um evento pra cada botao,
  // a partir do click, o que chama a funçao addToFavorites com base no id
  // do botao que foi clicado
  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  // a mesma coisa de cima, porem agora para remover o botao da lista de
  // favoritos com base no id do botao
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

// quando essa funçao é chamada a partir do evento, nós ja temos o ID do botao
// que foi clicado, e entao comparamos se é o mesmo id, entao mandamos todas
// as informaçao relacionadas a esse botao para uma variavel countryToAdd
// que em seguida foi adicionada ao array de Favoritos
// Depois disso ordenamos e tiramos esse botao que foi adicionado aos favoritos
// da lista principal
function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);

  favoriteCountries = [...favoriteCountries, countryToAdd];

  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // se o country.id for diferente do id, o filter vai manter no array, ou seja,
  // se for igual vai tirar da lista
  allCountries = allCountries.filter((country) => country.id !== id);

  // renderiza de novo para aplicar a reatividade
  render();
}

// aqui acontece a mesma logica da funçao de cima, porem agora sobre a remoçao
// de botoes da lista de favoritos
function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(
    (country) => country.id === id
  );

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
