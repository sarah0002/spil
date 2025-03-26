let myRand = 1;
let point;
let liv;

const fisk_con = document.querySelector("#fisk_container");
const fisk_sprite = document.querySelector("#fisk_sprite");
const fisk_con2 = document.querySelector("#fisk_container2");
const fisk_sprite2 = document.querySelector("#fisk_sprite2");
const fisk_con3 = document.querySelector("#fisk_container3");
const fisk_sprite3 = document.querySelector("#fisk_sprite3");

const flaske_con = document.querySelector("#flaske_container");
const flaske_sprite = document.querySelector("#flaske_sprite");
const flaske_con2 = document.querySelector("#flaske_container2");
const flaske_sprite2 = document.querySelector("#flaske_sprite2");
const flaske_con3 = document.querySelector("#flaske_container3");
const flaske_sprite3 = document.querySelector("#flaske_sprite3");

const liv_board = document.querySelector("#life_board h4");
const point_board = document.querySelector("#score_board h4");

const startScreen = document.querySelector("#start");
const gameOverScreen = document.querySelector("#game_over");
const levelCompleteScreen = document.querySelector("#level_complete");

function randomTal(maxTal) {
  return Math.floor(Math.random() * maxTal) + 1;
}

window.addEventListener("load", sidenVises);
function sidenVises() {
  console.log("siden vises");

  //Skjul andre skærme
  gameOverScreen.classList.add("hide");
  levelCompleteScreen.classList.add("hide");

  //Vis start skærm
  startScreen.classList.remove("hide");

  //Klik på start_knap
  document
    .querySelector("#start_knap1")
    .addEventListener("click", startSpillet);

  //klik på info_knap
  document.querySelector("#info_knap").addEventListener("click", infoscreen);
}

function infoscreen() {
  console.log("Info Skærm");
  //skjul andre skræme
  startScreen.classList.add("hide");
  gameOverScreen.classList.add("hide");
  levelCompleteScreen.classList.add("hide");

  //vis info skræm
  document.querySelector("#info_screen").classList.remove("hide");
  //Klik på start_knap
  document
    .querySelector("#start_knap2")
    .addEventListener("click", startSpillet);
}

function startSpillet() {
  console.log("Start Spillet");
  //Skjul andre skærme
  startScreen.classList.add("hide");
  gameOverScreen.classList.add("hide");
  levelCompleteScreen.classList.add("hide");
  document.querySelector("#info_screen").classList.add("hide");

  //point
  point = 0;
  point_board.textContent = point;

  //liv
  liv = 3;
  liv_board.textContent = liv;

  //tid
  document.querySelector("#time_sprite").classList.add("tid");
  document
    .querySelector("#time_board")
    .addEventListener("animationend", stopSpillet);

  //sæt pos og delay
  fisk_con.classList.add("pos" + randomTal(4));
  fisk_con2.classList.add("pos" + randomTal(4));
  fisk_con3.classList.add("pos" + randomTal(4));

  //flaske pos
  flaske_con.classList.add("pos" + randomTal(4));
  flaske_con2.classList.add("pos" + randomTal(4));
  flaske_con3.classList.add("pos" + randomTal(4));

  //fisk delay
  fisk_con.classList.add("delay" + randomTal(4));
  fisk_con2.classList.add("delay" + randomTal(4));
  fisk_con3.classList.add("delay" + randomTal(4));

  //add fald fisk
  fisk_con.classList.add("fald");
  fisk_con2.classList.add("fald");
  fisk_con3.classList.add("fald");

  //add fald flaske
  flaske_con.classList.add("fald");
  flaske_con2.classList.add("fald");
  flaske_con3.classList.add("fald");

  //add click til elementerne
  fisk_con.addEventListener("click", clickFisk);
  fisk_con2.addEventListener("click", clickFisk);
  fisk_con3.addEventListener("click", clickFisk);

  flaske_con.addEventListener("click", clickFlaske);
  flaske_con2.addEventListener("click", clickFlaske);
  flaske_con3.addEventListener("click", clickFlaske);

  //Eventlistner
  fisk_con.addEventListener("animationiteration", genstartFisk);
  fisk_con2.addEventListener("animationiteration", genstartFisk);
  fisk_con3.addEventListener("animationiteration", genstartFisk);

  flaske_con.addEventListener("animationiteration", genstartFlaske);
  flaske_con2.addEventListener("animationiteration", genstartFlaske);
  flaske_con3.addEventListener("animationiteration", genstartFlaske);
}

function clickFisk() {
  console.log("clickFisk");
  //man kan ikke trykke på den igen
  this.removeEventListener("click", clickFisk);

  //Spil lyd til fisk
  document.querySelector("#sound_ov").play();
  document.querySelector("#sound_ov").volume = 0.5;
  document.querySelector("#sound_ov").currenttime = 0;

  this.classList.add("frys");
  this.firstElementChild.classList.add("drej");
  this.addEventListener("animationend", genstartFisk);

  liv--;
  liv_board.textContent = liv;
  console.log(liv);
  if (liv <= 0) {
    stopSpillet();
  }
}

function genstartFisk() {
  console.log("genstartFisk");
  //Fjerne jeg animationen
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //Her får den en ny postionen.
  this.classList.add("pos" + randomTal(4));
  this.classList.add("fald");
  this.addEventListener("click", clickFisk);
}

function clickFlaske() {
  console.log("clickFlaske");
  this.removeEventListener("click", clickFlaske);

  // TODO: Spil lyd til flaske
  document.querySelector("#sound_jubi").play();
  document.querySelector("#sound_jubi").volume = 0.5;
  document.querySelector("#sound_jubi").currenttime = 0;

  this.classList.add("frys");
  this.firstElementChild.classList.add("zoom");
  this.addEventListener("animationend", genstartFlaske);

  point++;
  point_board.textContent = point;
  console.log(point);
}

function genstartFlaske() {
  console.log("genstartFlaske");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("pos" + randomTal(4));
  this.classList.add("delay" + randomTal(4));
  this.classList.add("fald");
  this.addEventListener("click", clickFlaske);
}

function stopSpillet() {
  console.log("stopSpillet");
  //fjern alt er på alle elementers container og sprite
  fisk_con.classList = "";
  fisk_con.firstElementChild.classList = "";

  //stop timer
  document.querySelector("#time_sprite").classList.remove("time");
  document
    .querySelector("#time_board")
    .removeEventListener("animationend", stopSpillet);

  //fjern alle event listener på alle containere
  fisk_con.removeEventListener("animationiteration", genstartFisk);
  fisk_con.removeEventListener("animationend", genstartFisk);
  fisk_con.removeEventListener("mousedown", clickFisk);

  flaske_con.classList = "";
  flaske_con.firstElementChild.classList = "";
  flaske_con.removeEventListener("animationiteration", genstartFlaske);
  flaske_con.removeEventListener("animationend", genstartFlaske);
  flaske_con.removeEventListener("mousedown", clickFlaske);

  if (liv <= 0) {
    gameover();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log("GAMEOVER");
  //Vis gameover skærm
  gameOverScreen.classList.remove("hide");
  document.querySelector("#game_over_points").textContent =
    "ØVV! Du tabte og fik kun " + point + " point";

  //Klik på genstart1¨
  document
    .querySelector("#start_igen1")
    .addEventListener("click", startSpillet);
}

function levelComplete() {
  console.log("Level complete");

  //Vis levelComplete skærm
  levelCompleteScreen.classList.remove("hide");
  document.querySelector("#level_complete_points").textContent =
    "JUBII! Du vandt og fik " + point + " points";

  //Klik på genstart2
  document
    .querySelector("#start_igen2")
    .addEventListener("click", startSpillet);
}
