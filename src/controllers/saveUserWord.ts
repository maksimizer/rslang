import serverRequests from '../model/appModel';
import { IWord, IUserWord } from '../types/interface';

const saveUserWord = async (userString: string, word: IWord, wrong: boolean): Promise<void> => {
  let wordCorrect: number;
  let wordWrong: number;
  let wordCount: number;
  const user = await JSON.parse(userString);
  const userWord = await serverRequests.getUserWord(user.userId, word.id, user.token)
    .catch(() => 'error');
  console.log('WORDS', await serverRequests.getUserWords(user.userId, user.token));
  await console.log('Update', userWord);
  const resultWord = userWord as IUserWord;
  if (userWord !== 'error') {
    const percentBetweenCorrectAndWrong = Math.round(
      ((resultWord.optional.correct + 1) / resultWord.optional.wrong) * 10,
    );
    if (wrong) {
      wordCount = resultWord.optional.count + 1;
      wordWrong = resultWord.optional.wrong + 1;
      wordCorrect = resultWord.optional.correct;

      if (resultWord.difficulty === 'easy') {
        await serverRequests.updateUserWord(user.userId, word.id, user.token, {
          difficulty: 'normal',
          optional: {
            count: wordCount,
            wrong: wordWrong,
            correct: wordCorrect,
          },
        });
      } else if (resultWord.difficulty === 'difficult') {
        await serverRequests.updateUserWord(user.userId, word.id, user.token, {
          difficulty: 'difficult',
          optional: {
            count: wordCount,
            wrong: wordWrong,
            correct: wordCorrect,
          },
        });
      } else {
        await serverRequests.updateUserWord(user.userId, word.id, user.token, {
          difficulty: 'normal',
          optional: {
            count: wordCount,
            wrong: wordWrong,
            correct: wordCorrect,
          },
        });
      }
    } else {
      wordCount = resultWord.optional.count + 1;
      wordWrong = resultWord.optional.wrong;
      wordCorrect = resultWord.optional.correct + 1;

      if ((percentBetweenCorrectAndWrong > 80 || resultWord.optional.wrong === 0)
      && (resultWord.optional.correct + 1) >= 3 && (resultWord.difficulty === 'normal'
      || resultWord.difficulty === 'easy')) {
        console.log('hi', percentBetweenCorrectAndWrong > 80, resultWord.optional.wrong === 0);
        await serverRequests.updateUserWord(user.userId, word.id, user.token, {
          difficulty: 'easy',
          optional: {
            count: wordCount,
            wrong: wordWrong,
            correct: wordCorrect,
          },
        });
      } else {
        await serverRequests.updateUserWord(user.userId, word.id, user.token, {
          difficulty: 'normal',
          optional: {
            count: wordCount,
            wrong: wordWrong,
            correct: wordCorrect,
          },
        });
      }
    }

    const consolWordUpdate = await serverRequests.getUserWord(user.userId, word.id, user.token);
    await console.log('Update', consolWordUpdate);
  } else {
    if (wrong) {
      await serverRequests.createUserWord(user.userId, user.token, word.id, {
        difficulty: 'normal',
        optional: {
          count: 1,
          wrong: 1,
          correct: 0,
        },
      });
    } else {
      await serverRequests.createUserWord(user.userId, user.token, word.id, {
        difficulty: 'normal',
        optional: {
          count: 1,
          wrong: 0,
          correct: 1,
        },
      });
    }
    await console.log('Create', userWord);
  }
};

export default saveUserWord;
