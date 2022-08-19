import { QueryString, ObjectString } from '../types/type';
import { IAuth, IWord } from '../types/interface';

const baseUrl = 'http://localhost:3000';

const path = {
  users: '/users',
  signin: '/signin',
  words: '/words',
};

function generateQueryString(queryParams: QueryString[]) {
  if (queryParams.length) {
    return `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}`;
  }
  return '';
}
// await getWords([{ key: 'page', value: '2' }, { key: 'group', value: '2' }]))
export const getWords = async (queryParams: QueryString[]): Promise<{ words: IWord[] }> => {
  const response = await fetch(`${baseUrl}${path.words}${generateQueryString(queryParams)}`);
  const words = await response.json();
  return words;
};
// await getWords('5e9f5ee35eb9e72bc21af978'))
export const getWord = async (idWord: string): Promise<{ word: IWord }> => {
  const response = await fetch(`${baseUrl}${path.words}/${idWord}`);
  const word = await response.json();
  return word;
};
// USERS
// createUser({name: 'Bob', email: 'hexx@user.com', password: 'Gfhjkm_123'});
// return code.status //
export const createUser = async (body: ObjectString): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const code = await response.json();
  return code;
};

export const getUser = async (id: string, token: string): Promise<{ user: ObjectString }> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const user = await response.json();
  return user;
};

export const updateUser = async (id: string, token: string, body: ObjectString): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const user = await response.json();
  return user;
};

export const deleteUser = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const user = await response.json();
  return user;
};

export const getUserTokens = async (id: string | number): Promise<{ user: ObjectString }> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/tokens`);
  const user = await response.json();
  return user;
};

// Users/Words

export const getUserWords = async (id: string | number): Promise<{ words: ObjectString }> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`);
  const words = await response.json();
  return words;
};

export const createUserWord = async (
  idUser: string,
  idWord: string,
  body: ObjectString,
): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/words/${idWord}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const word = await response.json();
  return word;
};

export const getUserWord = async (
  id: string | number,
  idWord: string,
): Promise<{ words: ObjectString }> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`);
  const words = await response.json();
  return words;
};

export const updateUserWord = async (
  id: number | string,
  idWord: string,
  body: ObjectString,
): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const word = await response.json();
  return word;
};

export const deleteUserWord = async (id: number | string, idWord: string): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
  });
  const word = await response.json();
  return word;
};
// Users/AggregatedWords

export const getUsersAggregatedWords = async (
  idUser: number | string,
  queryParams: QueryString[],
): Promise<{ words: ObjectString[] }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/aggregatedWords/${generateQueryString(queryParams)}`);
  const words = await response.json();
  return words;
};

export const getUsersAggregatedWord = async (
  idUser: number | string,
  idWord: number | string,
): Promise<{ words: ObjectString[] }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/aggregatedWords/${idWord}`);
  const words = await response.json();
  return words;
};

// Users/Statistic

export const getUsersStatistic = async (
  idUser: number | string,
): Promise<{ statistics: ObjectString[] }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/statistics`);
  const statistics = await response.json();
  return statistics;
};

export const updateUserStatistic = async (
  idUser: number | string,
  body: ObjectString,
): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/statistics`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const word = await response.json();
  return word;
};

// Users/Setting

export const getUsersSetting = async (
  idUser: number | string,
): Promise<{ settings: ObjectString[] }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/settings`);
  const settings = await response.json();
  return settings;
};

export const updateUserSetting = async (
  idUser: number | string,
  body: ObjectString,
): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const word = await response.json();
  return word;
};

// Sign In
// await userSingIn({ email: 'helllo@user.com', password: 'Gfhjkm_123' })
export const userSingIn = async (body: ObjectString): Promise<IAuth> => {
  const response = await fetch(`${baseUrl}${path.signin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const auth = await response.json();
  return auth;
};
