/*
searchScore(data, 4) => {
  "guild": "seabass",
  "placement": 4,
}
searchScore(data, 14) => null
*/

function searchSubtask(leaderboard, leaguePoints, topBorder, leftBorder, bottomBorder, rightBorder) {
  // Если границы сошлись — ничего не нашлось
  if (leftBorder > rightBorder || topBorder > bottomBorder) {
    return null;
  }

  // Если границы сошлись до единственного элемента, то проверяем, подходит ли он нам
  if (leftBorder === rightBorder && topBorder === bottomBorder) {
    const candidate = leaderboard[topBorder][leftBorder];

    return candidate.leaguePoints === leaguePoints
      ? {
        guild: candidate.guild,
        placement: leaderboard[topBorder].length - leftBorder,
      }
      : null
  }

  const middleY = Math.floor((topBorder + bottomBorder) / 2);
  const middleX = Math.floor((leftBorder + rightBorder) / 2);
  const {leaguePoints: candidateLeaguePoints} = leaderboard[middleY][middleX];

  // Если нам нужно найти части, где количество очков больше, чем по середине, то это...
  if (candidateLeaguePoints < leaguePoints) {
    return searchSubtask(leaderboard, leaguePoints, topBorder, middleX + 1, middleY, rightBorder) // верхняя правая
      || searchSubtask(leaderboard, leaguePoints, middleY + 1, leftBorder, bottomBorder, middleX) // нижняя левая
      || searchSubtask(leaderboard, leaguePoints, middleY + 1, middleX + 1, bottomBorder, rightBorder) // нижняя правая
  // а если меньше, то...
  } else {
    return searchSubtask(leaderboard, leaguePoints, topBorder, middleX + 1, middleY, rightBorder) // верхняя правая
      || searchSubtask(leaderboard, leaguePoints, middleY + 1, leftBorder, bottomBorder, middleX) // нижняя левая
      || searchSubtask(leaderboard, leaguePoints, topBorder, leftBorder, middleY, middleX) // верхняя левая
  }
}

function searchScore(leaderboard, leaguePoints) {
  if (!(leaderboard.length && leaderboard[0].length)) {
    return null;
  }

  const bottomBorder = leaderboard.length - 1;
  const rightBorder = leaderboard[0].length - 1;

  return searchSubtask(leaderboard, leaguePoints, 0, 0, bottomBorder, rightBorder);
}


const data = [
  [
    {
      "login": "stypeano",
      "leaguePoints": 4,
      "guild": "seabass",
    },
    {
      "login": "rstrazir",
      "leaguePoints": 356,
      "guild": "seabass",
    },
    {
      "login": "cathead",
      "leaguePoints": 930,
      "guild": "seabass",
    },
    {
      "login": "cavernous",
      "leaguePoints": 1056,
      "guild": "seabass",
    }
  ],
  [
    {
      "login": "ConspiracyLil",
      "leaguePoints": 18,
      "guild": "goldfish",
    },
    {
      "login": "CzarStories",
      "leaguePoints": 568,
      "guild": "goldfish",
    },
    {
      "login": "GottaSaiyan",
      "leaguePoints": 931,
      "guild": "goldfish",
    },
    {
      "login": "Mountaintrid",
      "leaguePoints": 1130,
      "guild": "goldfish",
    }
  ],
  [
    {
      "login": "Rectionom",
      "leaguePoints": 42,
      "guild": "catfish",
    },
    {
      "login": "JoshChase",
      "leaguePoints": 931,
      "guild": "catfish",
    },
    {
      "login": "DreamLess",
      "leaguePoints": 956,
      "guild": "catfish",
    },
    {
      "login": "BlondiePlanet",
      "leaguePoints": 1045,
      "guild": "catfish",
    }
  ],
  [
    {
      "login": "Breakingbing",
      "leaguePoints": 64,
      "guild": "bream",
    },
    {
      "login": "Goldenelox",
      "leaguePoints": 932,
      "guild": "bream",
    },
    {
      "login": "SaiyanBroadway",
      "leaguePoints": 1432,
      "guild": "bream",
    },
    {
      "login": "BoostScooby",
      "leaguePoints": 1476,
      "guild": "bream",
    }
  ]
]