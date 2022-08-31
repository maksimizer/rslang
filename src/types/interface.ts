export interface IWord {
  'id': string,
  'group': number,
  'page': number,
  'word': string,
  'image': string,
  'audio': string,
  'audioMeaning': string,
  'audioExample': string,
  'textMeaning': string,
  'textExample': string,
  'transcription': string,
  'wordTranslate': string,
  'textMeaningTranslate': string,
  'textExampleTranslate': string
}

export interface IUser {
  'name': string,
  'email': string,
  'password': string
}

export interface IAuth {
  'message' : string,
  'token': string,
  'refreshToken': string,
  'userId' : string,
  'name' : string
}

export interface IUserWord {
  'difficulty': string,
  'optional' : {
    count: number,
    wrong: number,
    correct: number
  }
}
export interface IStatisticGame {
  'audioGame':{
    newWord: number,
    wrong: number,
    correct: number,
    winLength: number
  },
  'sprintGame': {
    newWord: number,
    wrong: number,
    correct: number,
    winLength: number
  },
  'learnedWordsDay': {
    learned: number
  }
}

export interface IStatistic {
  'learnedWords': number,
  'optional' ?: {
    [key: string]: IStatisticGame;
  }
}

export interface ISetting {
  'wordsPerDay': number,
  'optional' ?: {
    [key: string]: string | number | boolean;
  }
}
