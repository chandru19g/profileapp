const API = 'https://user-profile1.herokuapp.com/api';

export const getAllUser = () => {
  return fetch(`${API}/profile/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(err => console.error(err));
};

export const getUserProfileById = id => {
  return fetch(`${API}/profile/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(err => console.error(err));
};

export const updateUserProfile = (id, input) => {
  return fetch(`${API}/profile/update/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(err => console.log(err));
};
