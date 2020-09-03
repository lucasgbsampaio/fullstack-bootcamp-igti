'use strict';

let allUsers = [];
let filteredUsers = [];

let formUser = null;

let inputText = null;
let inputButton = null;

let divFilterUsers = null;
let divStatisticsUsers = null;

let textFilter = null;
let textStatistics = null;

window.addEventListener('load', () => {
  inputText = document.querySelector('#inputText');
  inputButton = document.querySelector('#inputButton');

  divFilterUsers = document.querySelector('.divFilterUsers');
  divStatisticsUsers = document.querySelector('.divStatisticsUsers');

  textFilter = document.querySelector('#textFilter');
  textStatistics = document.querySelector('#textStatistics');

  formUser = document.querySelector('form');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    return {
      img: user.picture.medium,
      gender: user.gender,
      name: `${user.name.first} ${user.name.last}`.toLowerCase(),
      age: user.dob.age,
    };
  });

  handleForm();
}

function handleForm() {
  formUser.addEventListener('submit', (event) => {
    event.preventDefault();
    const valueInput = inputText.value.toLowerCase();
    filterUsers(valueInput);
  });
}

function filterUsers(valueInput) {
  filteredUsers = allUsers.filter((user) => {
    return user.name.includes(valueInput);
  });
  render();
}

function render() {
  renderUsers();
  renderStatistics();
}

function renderUsers() {
  let usersHTML = '<div';
  filteredUsers.forEach((user) => {
    const userHTML = `
      <div>
        <span id="user">${user.name}</span>
      </div>
        <img src="${user.img}">
      <div>
        <span id="age">${user.age} anos</span>
      </div>
    `;

    usersHTML += userHTML;
  });

  usersHTML += '</div';
  divFilterUsers.innerHTML = usersHTML;
}

function renderStatistics() {
  let lengthUsers = filteredUsers.length;
  // prettier-ignore
  let sumAge = filteredUsers.reduce((accumulator, current) => {
    return accumulator + current.age
  },0);
  let averageAge = sumAge / lengthUsers;
  let filterMale = filteredUsers.filter((user) => {
    return user.gender === 'male';
  });
  let totMale = filterMale.length;
  let filterFemale = filteredUsers.filter((user) => {
    return user.gender === 'female';
  });
  let totFem = filterFemale.length;

  let statisticsHTML = `
      <div>
        <span id="statisticLengthUsers">${lengthUsers} usuários</span>
      </div>

      <div>
        <span id="statisticSumAge">Somatória de idades: ${sumAge}</span>
      </div>

      <div>
        <span id="statisticAverageAge">Média de idades: ${averageAge}</span>
      </div>

      <div>
        <span id="totMale">Total de Masculino: ${totMale}</span>
      </div>

      <div>
        <span id="totFem">Total de Feminino: ${totFem}</span>
      </div>
    `;
  divStatisticsUsers.innerHTML = statisticsHTML;
}
