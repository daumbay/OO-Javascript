// Copy JSON object
const data = {
  Dinos: [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: ["First discovered in 1889 by Othniel Charles Marsh"],
      img: "./images/triceratops.png",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: ["The largest known skull measures in at 5 feet long."],
      img: "./images/tyrannosaurus rex.png",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: ["Anklyosaurus survived for approximately 135 million years."],
      img: "./images/anklyosaurus.png",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: 372,
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: ["An asteroid was named 9954 Brachiosaurus in 1991."],
      img: "./images/brachiosaurus.png",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact: [
        "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
      ],
      img: "./images/stegosaurus.png",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: ["Elasmosaurus was a marine reptile first discovered in Kansas."],
      img: "./images/elasmosaurus.png",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: ["Actually a flying reptile, the Pteranodon is not a dinosaur."],
      img: "./images/pteranodon.png",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: [
        "All birds are living dinosaurs",
        "All birds are living dinosaurs",
        "All birds are living dinosaurs",
        "All birds are living dinosaurs",
      ],
      img: "./images/pigeon.png",
    },
  ],
};

// Create Dino Constructor
function Dino(dino) {
  this.species = dino.species;
  this.weight = dino.weight;
  this.height = dino.height;
  this.diet = dino.diet;
  this.img = dino.img;
  this.fact = dino.fact;
}

// Create Dino Objects
function createDino() {
  const dino = [];
  for (let i = 0; i < 8; i++) {
    dino[i] = new Dino(data.Dinos[i]);
  }
  return dino;
}

// Create Human Constructor

function Human(name, height, weight, diet) {
  (this.name = name),
    (this.height = height),
    (this.weight = weight),
    (this.diet = diet);
}

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (dino, human) {
  const difference = dino.weight - human.weight;
  if (difference > 0) {
    return `${dino.species} is heavier than the human by ${difference} lbs`;
  } else {
    return `${dino.species} is lighter than the human by ${-difference} lbs`;
  }
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (dino, human) {
  const difference = dino.height - human.height;
  if (difference > 0) {
    return `${dino.species} is taller than the human by ${difference} inches`;
  } else {
    return `${dino.species} is shorter than the human by ${-difference} inches`;
  }
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (dino, human) {
  if (dino.diet !== human.diet) {
    return `${dino.species} had a different diet than the human`;
  } else {
    return `${dino.species} had the same diet as the human`;
  }
};

// Generate facts for populating dino objects and store them in dino fact array
function factGenerator(dino, human) {
  for (let i = 0; i < 7; i++) {
    dino[i].fact.push(dino[i].compareWeight(dino[i], human));
    dino[i].fact.push(dino[i].compareHeight(dino[i], human));
    dino[i].fact.push(dino[i].compareDiet(dino[i], human));
  }
  return dino;
}

// Generate Tiles for each Dino in Array
function tileGenerator(dino) {
  const tiles = [];
  for (let i = 0; i < 8; i++) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const p = document.createElement("p");
    div.className = "grid-item";
    h3.innerText = dino[i].species;
    img.src = dino[i].img;
    p.innerText = dino[i].fact[Math.floor(Math.random() * 4)];
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);
    tiles.push(div);
  }
  return tiles;
}

// Add human data to dino tiles
function addHuman(tiles, human) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  div.className = "grid-item";
  h3.innerText = human.name;
  img.src = "./images/human.png";
  div.appendChild(h3);
  div.appendChild(img);
  tiles.splice(4, 0, div);
}

// Add tiles to DOM
function addTiles(tiles) {
  for (let i = 0; i < 9; i++) {
    const main = document.querySelector("#grid");
    main.appendChild(tiles[i]);
  }
}

// Remove form from screen
function removeForm() {
  document.querySelector("#dino-compare").style.display = "none";
}

// On button click, prepare and display infographic
document.querySelector("#btn").addEventListener("click", function () {
  // Create Dino objects and store them in dino array
  let dino = createDino();

  // Create Human Object
  const human = new Human();

  // Retrieve data from form
  (function () {
    human.name = document.querySelector("#name").value;
    human.height =
      document.querySelector("#feet").value * 12 +
      document.querySelector("#inches").value;
    human.weight = document.querySelector("#weight").value;
    human.diet = document.querySelector("#diet").value;
  })();
  dino = factGenerator(dino, human);
  const tiles = tileGenerator(dino);
  addHuman(tiles, human);
  addTiles(tiles);
  removeForm();
});
