// PET DATA - All pets and evolutions
const PETS = {
  mewt: {
    id: 'mewt',
    name: 'MEWT',
    evolution: 'meowt',
    evolutionLevel: 20,
    hp: 45,
    maxHp: 45,
    attack: 12,
    defense: 8,
    level: 1,
    exp: 0,
    expNeeded: 100,
    color: '#22c55e',
    darkColor: '#16a34a',
    lightColor: '#86efac',
    description: 'A loyal green cat with big sparkling eyes. Very attached to its trainer.'
  },
  meowt: {
    id: 'meowt',
    name: 'MEOWT',
    evolution: null,
    evolutionLevel: null,
    hp: 85,
    maxHp: 85,
    attack: 28,
    defense: 18,
    level: 20,
    exp: 0,
    expNeeded: 200,
    color: '#a855f7',
    darkColor: '#7e22ce',
    lightColor: '#c084fc',
    description: 'The evolved form of Mewt. Radiates powerful energy after consuming Fanter blood.'
  },
  mawgma: {
    id: 'mawgma',
    name: 'MAWGMA',
    evolution: null,
    evolutionLevel: null,
    hp: 75,
    maxHp: 75,
    attack: 25,
    defense: 15,
    level: 15,
    color: '#f97316',
    darkColor: '#c2410c',
    lightColor: '#fdba74',
    description: 'A smart lava-type creature that writes letters. Very wise and strategic.'
  }
};

// Math difficulty scaling
const MATH_DIFFICULTY = {
  1: { // Grade 1
    operations: ['+'],
    maxNum: 10,
    questions: [
      { q: "1 + 1 = ?", a: 2, opts: [0,1,2,3] },
      { q: "2 + 2 = ?", a: 4, opts: [2,3,4,5] },
      { q: "3 + 1 = ?", a: 4, opts: [2,3,4,5] }
    ]
  },
  2: { // Grade 2
    operations: ['+', '-'],
    maxNum: 20,
    questions: [
      { q: "5 + 3 = ?", a: 8, opts: [6,7,8,9] },
      { q: "12 - 4 = ?", a: 8, opts: [6,7,8,9] },
      { q: "8 + 7 = ?", a: 15, opts: [13,14,15,16] }
    ]
  },
  3: { // Grade 3
    operations: ['+', '-', '*'],
    maxNum: 30,
    questions: [
      { q: "6 × 4 = ?", a: 24, opts: [20,22,24,26] },
      { q: "25 - 9 = ?", a: 16, opts: [14,15,16,17] },
      { q: "7 × 3 = ?", a: 21, opts: [18,19,20,21] }
    ]
  },
  4: { // Grade 4
    operations: ['+', '-', '*', '/'],
    maxNum: 50,
    questions: [
      { q: "36 ÷ 6 = ?", a: 6, opts: [4,5,6,7] },
      { q: "12 × 5 = ?", a: 60, opts: [55,58,60,62] },
      { q: "84 - 27 = ?", a: 57, opts: [55,56,57,58] }
    ]
  },
  5: { // Grade 5
    operations: ['+', '-', '*', '/'],
    maxNum: 100,
    questions: [
      { q: "144 ÷ 12 = ?", a: 12, opts: [10,11,12,13] },
      { q: "15 × 8 = ?", a: 120, opts: [115,118,120,125] },
      { q: "250 - 75 = ?", a: 175, opts: [170,172,175,178] }
    ]
  },
  6: { // Grade 6
    operations: ['+', '-', '*', '/', '^2'],
    maxNum: 150,
    questions: [
      { q: "12² = ?", a: 144, opts: [140,142,144,146] },
      { q: "324 ÷ 18 = ?", a: 18, opts: [15,16,17,18] },
      { q: "25 × 12 = ?", a: 300, opts: [295,298,300,305] }
    ]
  }
};

function getRandomMathQuestion(grade) {
  const level = Math.min(grade, 6);
  const bank = MATH_DIFFICULTY[level];
  return { ...bank.questions[Math.floor(Math.random() * bank.questions.length)] };
}
