import {
  getWords, getWord, userSingIn, updateUser, deleteUser,
} from './model/requestServer';

const showRequest = async (): Promise <void> => {
  console.log(await getWords([{ key: 'page', value: '2' }, { key: 'group', value: '2' }]));
  console.log(await getWord('5e9f5ee35eb9e72bc21af978'));
  //   email: "helllo@user.com"
  // id: "62fe1e889b6c4a22b8bf21d5"
  const userData = await userSingIn({ email: 'helllo@user.com', password: 'Gfhjkm_123' });
  console.log(userData.token);
  console.log(await updateUser(
    '62fe1e889b6c4a22b8bf21d5',
    userData.token,
    { email: 'helllo@user.com', password: 'Gfhjkm_123', name: 'vitalik233' },
  ));
  console.log(await deleteUser(
    '62fe1e889b6c4a22b8bf21d5',
    userData.token,
  ));
};

showRequest();
