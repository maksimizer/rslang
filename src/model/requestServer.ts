import {
  QueryString,
  ObjectString,
} from '../types/type';
import {
  IAuth,
  ISetting,
  IStatistic,
  IUser,
  IUserWord,
  IWord,
} from '../types/interface';

const baseUrl = 'http://localhost:3000';

const path = {
  users: '/users',
  signin: '/signin',
  words: '/words',
};

function generateQueryString(queryParams: QueryString[]): string {
  if (queryParams.length) {
    return `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}`;
  }
  return '';
}

export const getWords = async (queryParams: QueryString[]): Promise<
{
  words: IWord[]
}> => {
  const response = await fetch(`${baseUrl}${path.words}${generateQueryString(queryParams)}`);
  const words = await response.json();
  return words;
};

export const getWord = async (idWord: string): Promise<{ word: IWord }> => {
  const response = await fetch(`${baseUrl}${path.words}/${idWord}`);
  const word = await response.json();
  return word;
};

export const userSingIn = async (body: ObjectString): Promise< IAuth > => {
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

export const createUser = async (body: ObjectString): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const code = await response.status;
  return code;
};

export const getUser = async (idUser: string, token: string): Promise< IUser > => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const user = await response.json();
  return user;
};

export const updateUser = async (
  idUser: string,
  token: string,
  body: ObjectString,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await response.status;
  return status;
};

export const deleteUser = async (idUser: string, token: string): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const status = await response.status;
  return status;
};

export const getUserTokens = async (idUser: string, refreshToken: string): Promise<IAuth> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/tokens`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const auth = await response.json();
  return auth;
};

export const getUserWords = async (id: string, token: string): Promise<IWord[]> => {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const words = await response.json();
  return words;
};

export const createUserWord = async (
  idUser: string,
  token: string,
  idWord: string,
  body: IUserWord,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/words/${idWord}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await response.status;
  return status;
};

export const getUserWord = async (
  idUser: string,
  idWord: string,
  token: string,
): Promise<{ words: ObjectString }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/words/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const words = await response.json();
  return words;
};

export const updateUserWord = async (
  idUser: string,
  idWord: string,
  token: string,
  body: IUserWord,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await response.status;
  return status;
};

export const deleteUserWord = async (
  idUser: string,
  idWord: string,
  token: string,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/words/${idWord}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const status = await response.status;
  return status;
};

export const getUsersAggregatedWords = async (
  idUser: string,
  token: string,
  queryParams: QueryString[],
): Promise<{ words: IUserWord[] }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/aggregatedWords/${generateQueryString(queryParams)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const words = await response.json();
  return words;
};

export const getUsersAggregatedWord = async (
  idUser: string,
  idWord: string,
  token: string,
): Promise<{ words: IUserWord }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/aggregatedWords/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const words = await response.json();
  return words;
};

export const getUsersStatistic = async (
  idUser: string,
  token: string,
): Promise<{ statistics: IStatistic }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const statistics = await response.json();
  return statistics;
};

export const updateUserStatistic = async (
  idUser: string,
  token: string,
  body: IStatistic,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await response.status;
  return status;
};

export const getUsersSetting = async (
  idUser: string,
  token: string,
): Promise<{ settings: ISetting }> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const settings = await response.json();
  return settings;
};

export const updateUserSetting = async (
  idUser: string,
  token: string,
  body: ISetting,
): Promise<number> => {
  const response = await fetch(`${baseUrl}${path.users}/${idUser}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const status = await response.status;
  return status;
};
