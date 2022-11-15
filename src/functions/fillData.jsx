const possibilities = 3

const colors = ["red", "green", "purple"]

const options = [
  {
    id: 1,
    url: require("../assets/shapes/DiamondOutlined.svg").default,
  },
  {
    id: 2,
    url: require("../assets/shapes/DiamondSolid.svg").default,
  },
  {
    id: 3,
    url: require("../assets/shapes/DiamondStriped.svg").default,
  },
  {
    id: 4,
    url: require("../assets/shapes/OvalOutlined.svg").default,
  },
  {
    id: 5,
    url: require("../assets/shapes/OvalSolid.svg").default,
  },
  {
    id: 6,
    url: require("../assets/shapes/OvalStriped.svg").default,
  },
  {
    id: 7,
    url: require("../assets/shapes/SquiggleOutlined.svg").default,
  },
  {
    id: 8,
    url: require("../assets/shapes/SquiggleSolid.svg").default,
  },
  {
    id: 9,
    url: require("../assets/shapes/SquiggleStriped.svg").default,
  },
]

function fillData() {
  var dataArray = []
  for (let i = 0; i < options.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      for (let k = 1; k < possibilities + 1; k++) {
        dataArray.push({
          href: options[i],
          color: colors[j],
          num: k,
          selected: false,
        })
      }
    }
  }
  return shuffle(dataArray)
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

export { fillData, shuffle }
