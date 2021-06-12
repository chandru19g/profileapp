const API = 'https://user-profile1.herokuapp.com/api';

export const createAccountHelper = input => {
  return fetch(`${API}/createAccount`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};

export const loginHelper = input => {
  return fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(error => console.error(error));
};
