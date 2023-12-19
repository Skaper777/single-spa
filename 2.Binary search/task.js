import {log} from './logger';

/*
searchScore(data, 4) => {
  "league": 1,
  "placement": 4,
}

searchScore(data, 14) => null
*/
function searchScore(leaderboard, leaguePoints) {
  const leagueIndex = searchLeagueByScore(leaderboard, leaguePoints);

  if (leagueIndex === null) {
    return null;
  }

  const placementIndex = searchInLeague(leaderboard[leagueIndex], leaguePoints);

  if (placementIndex === null) {
    return null;
  }

  const league = leagueIndex + 1;
  const placement = leaderboard[leagueIndex].length - placementIndex;

  return {league, placement};
}

function searchLeagueByScore(leaderboard, leaguePoints) {
  let left = 0;
  let right = leaderboard.length - 1;

  const firstPlacePoints = leaderboard[right][leaderboard[right].length - 1].leaguePoints;
  const lastPlacePoints = leaderboard[0][0].leaguePoints;

  // Если количество очков вообще не входит в промежутки в таблице
  // (меньше минимального или больше максимального)
  if (lastPlacePoints > leaguePoints
    || firstPlacePoints < leaguePoints) {
    // значит такой лиги точно нет
    return null;
  }

  // пока концы промежутка, в котором мы ищем, не сошлись
  while (left <= right) {
    // делим наш промежуток (примерно) пополам
    const middleIndex = Math.floor((right + left) / 2);
    const middle = leaderboard[middleIndex];

    const firstPlayerPoints = middle[middle.length - 1].leaguePoints;
    const lastPlayerPoints = middle[0].leaguePoints;

    // если очки входят в лигу по середине - значит, это то, что мы ищем
    if (lastPlayerPoints <= leaguePoints && leaguePoints <= firstPlayerPoints) {
      return middleIndex;
    }

    // если очков для этой лиги слишком мало
    if (lastPlayerPoints > leaguePoints) {
      // то двигаем правый край нашего поиска до серединки
      // (ищем от начала до текущей середины)
      right = middleIndex - 1;
    // а если наоборот слишком много
    } else if (leaguePoints > firstPlayerPoints) {
      // то ищем справа
      left = middleIndex + 1;
    }
  }

  // если края всё-таки сошлись - значит, такой лиги нет
  return null;
}

function searchInLeague(league, leaguePoints) {
  let left = 0;
  let right = league.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((right + left) / 2);
    const {leaguePoints: middleLeaguePoints} = league[middleIndex];

    if (middleLeaguePoints === leaguePoints) {
      return middleIndex;
    }

    if (middleLeaguePoints > leaguePoints) {
      right = middleIndex - 1;
    } else if (leaguePoints > middleLeaguePoints) {
      left = middleIndex + 1;
    }
  }

  return null;
}

const data = [
  [
    {
      "login": "stypeano",
      "leaguePoints": 4
    },
    {
      "login": "rstrazir",
      "leaguePoints": 45
    },
    {
      "login": "cathead",
      "leaguePoints": 143
    },
    {
      "login": "cavernous",
      "leaguePoints": 324
    }
  ],
  [
    {
      "login": "ConspiracyLil",
      "leaguePoints": 356
    },
    {
      "login": "CzarStories",
      "leaguePoints": 568
    },
    {
      "login": "GottaSaiyan",
      "leaguePoints": 598
    },
    {
      "login": "Mountaintrid",
      "leaguePoints": 785
    }
  ],
  [
    {
      "login": "Rectionom",
      "leaguePoints": 930
    },
    {
      "login": "JoshChase",
      "leaguePoints": 931
    },
    {
      "login": "DreamLess",
      "leaguePoints": 956
    },
    {
      "login": "BlondiePlanet",
      "leaguePoints": 1045
    }
  ],
  [
    {
      "login": "Breakingbing",
      "leaguePoints": 1056
    },
    {
      "login": "Goldenelox",
      "leaguePoints": 1130
    },
    {
      "login": "SaiyanBroadway",
      "leaguePoints": 1432
    },
    {
      "login": "BoostScooby",
      "leaguePoints": 1476
    }
  ]
]

log(4, searchScore(data, 4));
log(14, searchScore(data, 14));
