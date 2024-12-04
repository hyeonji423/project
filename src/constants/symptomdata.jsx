const symptoms = [
  {
    id: 0,
    title: "마른기침",
    sections: [
      {
        title: "증상",
        content: [
          "1. 목 뒤가 간지럽고 건조하며, 가벼운 마른기침이 시작됨",
          "2. 기침이 잦아지고 목이 따갑거나 쉰 목소리가 나타남",
          "3. 밤에 기침이 심해지고 가슴이 답답하며 수면장애가 발생",
          "4. 지속적인 기침으로 인한 피로감, 두통, 근육통이 동반됨",
        ],
      },
    ],
  },
  {
    id: 1,
    title: "감기",
    sections: [
      {
        title: "증상",
        content:
          "1.코 간지러움 시작<br><br>2.몸이 으실으실되지며 기침이 많아짐<br><br>3.변비가 생기며 목도 많이 간지러움<br><br>4.몸이 추워지며 잠이 잘안오는 증상",
      },
    ],
  },
];

const medicines = [
  {
    id: 1,
    name: "레보투스",
    type: "진해거담제",
    description: "기침을 가라앉히고 가래를 묽게 하는데 효과적",
    caution: "임산부, 수유부는 복용 전 의사와 상담 필요",
  },
  {
    id: 2,
    name: "코데날시럽",
    type: "기침억제제",
    description: "마른기침을 진정시키고 기도 자극을 감소",
    caution: "운전 및 기계조작 시 주의, 졸음 유발 가능",
  },
  {
    id: 3,
    name: "액티피드",
    type: "항히스타민제",
    description: "알레르기성 기침 증상 완화와 가래 감소",
    caution: "복용 후 졸음이 올 수 있으며 장시간 운전 금지",
  },
  {
    id: 4,
    name: "뮤코졸정",
    type: "점액용해제",
    description: "기도 점액을 묽게 하여 기침 증상 완화",
    caution: "위장장애가 있는 경우 식후 복용 권장",
  },
];

export { symptoms, medicines };
