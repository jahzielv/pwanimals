let defer;
let state = {
  animalBtnClicks: 0, 
  imageCaptions: [
    "AWWW 😍", 
    "🗣toO C U T E 😩", 
    "ughhh SO MANY ANIMALS 🐭🐶😻🐢",
    "who let the 🐩 out",
    "A black cat crossing your path signifies that the animal is going somewhere. - Groucho Marx"
  ]};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function() {console.log("registed service worker!")});
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    defer = e;
  });
}
//document.getElementsByClassName("spinner")[0].display = "none";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function animalLoad() {
  let animg = document.getElementById("animal-image");
  animg.style.display = "none";
  let spin = document.getElementsByClassName("spinner")[0];
  spin.style.display = "block";
  document.getElementById("animal-image").src = "https://placeimg.com/640/480/animals?t=" + new Date().getTime();
  state.animalBtnClicks++;
  if (state.animalBtnClicks === 3) {
    defer.prompt();
    defer.userChoice
      .then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("accepted a2hs!");
        } else {
          console.log("a2hs rejected :(");
        }
        defer = null;
    });
  }
  let cap = document.getElementById("caption");
  cap.innerHTML = state.imageCaptions[getRndInteger(0, state.imageCaptions.length)];
}



