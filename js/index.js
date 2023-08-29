var spørsmål = {
  0: {
      "spørsmål": "Spørsmål 1",
      "enighet": {
          "Helt enig": [ "Høyre" ],
          "Litt enig": [ "Venstre" ],
          "Litt uenig": [ "SV" ],
          "Helt uenig": [ "Høyre" ]
      }
  },

  1: {
      "spørsmål": "Spørsmål 2",
      "enighet": {
          "Helt enig": [ "SV" ],
          "Litt enig": [ "Venstre" ],
          "Litt uenig": [ "Høyre" ],
          "Helt uenig": [ "Venstre" ]
      }
  },

  2: {
      "spørsmål": "Spørsmål 3",
      "enighet": {
          "Helt enig": [ "Høyre" ],
          "Litt enig": [ "Venstre" ],
          "Litt uenig": [ "SV" ],
          "Helt uenig": [ "Høyre" ]
      }
  }

};

const partier = [
  { "navn": "Høyre", "poeng": 0 },
  { "navn": "Venstre", "poeng": 0 },
  { "navn": "SV", "poeng": 0 }

];

const felt = document.getElementById("spørsmålsfelt");
const choices = document.querySelectorAll(".choice");
const btn = document.getElementById("submit-btn");

var spørsmålsnummer = 0;
var svar = [];

felt.innerText = spørsmål[spørsmålsnummer].spørsmål;

// SUBMITTION CORE

function submitted(value) {

for (const choice of choices) {
  if(choice.id == value) {
    
    svar.push(choice.value);
    partier.forEach(parti => {
      if(Object.keys(spørsmål[spørsmålsnummer].enighet).includes(choice.value)) {
          for(let i = 0; i < spørsmål[spørsmålsnummer].enighet[choice.value].length; i++) {
              if(spørsmål[spørsmålsnummer].enighet[choice.value][i] == parti.navn) {
                  parti.poeng++;
              }
          }
      }
    });

    spørsmålsnummer++;

    // HIDE STUFF

    if(spørsmålsnummer > Object.keys(spørsmål).length - 1) {
      felt.style.display = "none";
      choices.forEach(choice => {
        choice.style.display = "none";
      });

      // TEKST

      const container = document.querySelector(".spørsmål-container");
      const tekst = document.createElement("h1");
      tekst.setAttribute("class", "resultatTekst")
      tekst.innerText = "Resultat";
      container.appendChild(tekst);

      // SORTERING AV "partier" MED HØYEST "poeng"

      partier.sort((a, b) => {
        return b.poeng - a.poeng;
      });

      // CREATE FULL PROGRESS BAR

      partier.forEach(parti => {

        // CREATE PROGRESS TEXT

        const progressTekst = document.createElement("div");
        progressTekst.setAttribute("class", "partiTekst");
        progressTekst.innerText = parti.navn;
        container.appendChild(progressTekst);

        // CREATE PROGRESS DIV

        const progressDiv = document.createElement("div");
        progressDiv.setAttribute("class", "progress");
        progressDiv.style.width = "90%";
        progressDiv.style.margin = "auto";
        container.append(progressDiv);

        // CREATE PROGRESS BAR

        const progressBar = document.createElement("div");
        progressBar.setAttribute("class", "progress-bar", "role", "progressbar", "aria-valuenow", (parti.poeng / Object.keys(spørsmål).length) * 100, "aria-valuemin", "0", "aria-valuemax", "100");
        progressBar.style.width = "0%";
        progressBar.innerText = "0%";
        progressDiv.appendChild(progressBar);
        setTimeout(() => {
          progressBar.style.transition = "width 1s ease-in-out";
          progressBar.style.width = (parti.poeng / Object.keys(spørsmål).length) * 100 + "%";
          progressBar.innerText = Number(Math.round((parti.poeng / Object.keys(spørsmål).length) * 100)) + "%";
        }, 250);
      });

      // CREATE BUTTON

      const restartButton = document.createElement("button");
      restartButton.classList.add("restart");
      restartButton.setAttribute("id", "restart-btn");
      restartButton.setAttribute("onclick", "restartButton()");
      restartButton.style.display = "block";
      restartButton.style.marginLeft = "auto";
      restartButton.style.marginRight = "auto";
      restartButton.style.marginTop = "3%";
      restartButton.style.marginBottom = "3%";
      restartButton.innerText = "Start på nytt";
      container.appendChild(restartButton);

    } else {
      felt.innerText = spørsmål[spørsmålsnummer].spørsmål;
    }

  }
}

}

function startButton() {
  document.querySelector(".start").style.display = "none";
  document.querySelector(".valgomat-container").style.display = "block";
  const tittel = document.querySelector(".tittel");
  tittel.style.display = "none";
  const overFlowEllipsis = document.querySelector(".overflow-ellipsis");
  overFlowEllipsis.style.paddingTop = "2.4%";
  overFlowEllipsis.style.paddingBottom = "2.4%";
}

function restartButton() {
  for(const parti in partier) {
    partier[parti].poeng = 0;
  }

  const progressTekst = document.querySelectorAll(".partiTekst");
  const progressBarer = document.querySelectorAll(".progressBarer");
  const resultatTekst = document.querySelector(".resultatTekst");
  const restartKnapp = document.getElementById("restart-btn");
  const progressDiv = document.querySelectorAll(".progress");

  restartKnapp.remove(); 
  resultatTekst.remove();

  progressTekst.forEach(tekst => {
    tekst.remove();
  });

  progressBarer.forEach(bar => {
    bar.remove();
  });

  progressDiv.forEach(choice => {
    choice.remove();
  });

  choices.forEach(choice => {
    choice.style.display = "block";
  });

  felt.style.display = "block";
  spørsmålsnummer = 0;
  svar = [];
  felt.innerText = spørsmål[spørsmålsnummer].spørsmål;
}

function onLoad() {
  const overFlowEllipsis = document.querySelector(".overflow-ellipsis");

  // Fade in overFlowEllipsis
  setTimeout(() => {
    overFlowEllipsis.style.transition = "opacity 1s ease-in-out";
    overFlowEllipsis.style.opacity = "1";
  }, 250);


}