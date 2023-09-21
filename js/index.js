var spørsmål = {
  0: {
      "spørsmål": "Bør Norge melde seg ut av NATO?",
      "enighet": {
          "Helt enig": [ "Rødt" ],
          "Litt enig": [ "MDG" ],
          "Litt uenig": [ "SV", "AP", "SP" ],
          "Helt uenig": [ "KrF", "Venstre", "Høyre", "FrP" ]
      }
  },

  1: {
      "spørsmål": "Bør Norge melde seg ut av EØS?",
      "enighet": {
          "Helt enig": [ "Rødt", "MDG" ],
          "Litt enig": [ "SV", "SP" ],
          "Litt uenig": [ "FrP" ],
          "Helt uenig": [ "AP", "KrF", "Høyre" ]
      }
  },

  2: {
      "spørsmål": "Bør Norge ha tvungen førstegangstjeneste?",
      "enighet": {
          "Helt enig": [ "AP", "MDG", "KrF" ],
          "Litt enig": [ "FrP", "Venstre", "SV" ],
          "Litt uenig": [ "SP", "Høyre" ],
          "Helt uenig": [ "Rødt" ]
      }
  },

  3: {
      "spørsmål": "Bør vi øke forsvarsbudsjettet?",
      "enighet": {
          "Helt enig": [ "Høyre", "FrP" ],
          "Litt enig": [ "SP", "KrF", "Venstre" ],
          "Litt uenig": [ "MDG" ],
          "Helt uenig": [ "Rødt", "SV", "AP" ]
      }
  },

  4: {
    "spørsmål": "Bør Norge øke boligskatten?",
    "enighet": {
      "Helt enig": [ "Rødt" ],
      "Litt enig": [ "SV", "MDG" ],
      "Litt uenig": [ "AP", "SP", "Venstre" ],
      "Helt uenig": [ "Høyre", "FrP" ]
    }
  },

  5: {
    "spørsmål": "Bør Norge øke kommunale skatter og avgifter?",
    "enighet": {
      "Helt enig": [ "SV", "MDG" ],
      "Litt enig": [ "Rødt", "Venstre" ],
      "Litt uenig": [ "AP", "SP", "KrF" ],
      "Helt uenig": [ "Høyre", "FrP" ]
    }
  }

};

const partier = [
  { "navn": "Rødt", "alias": "Rødt", "poeng": 0, "partiFarge": "#B22222" },
  { "navn": "Sosialistisk Venstreparti", "alias": "SV", "poeng": 0, "partiFarge": "#440C1A" },
  { "navn": "Arbeiderpartiet", "alias": "AP", "poeng": 0, "partiFarge": "#d70926" },
  { "navn": "Senterpartiet", "alias": "SP", "poeng": 0, "partiFarge": "#78BE21" },
  { "navn": "Miljøpartiet de grønne", "alias": "MDG", "poeng": 0, "partiFarge": "#4e7e00" },
  { "navn": "Kristi folkeparti", "alias": "KrF", "poeng": 0, "partiFarge": "#db3a33" },
  { "navn": "Venstre", "alias": "Venstre", "poeng": 0, "partiFarge": "#066" },
  { "navn": "Høyre", "alias": "Høyre", "poeng": 0, "partiFarge": "#0065f1" },
  { "navn": "Fremskrittspartiet", "alias": "FrP", "poeng": 0, "partiFarge": "#003955" },

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

      // POENG CORE

      if(Object.keys(spørsmål[spørsmålsnummer].enighet).includes(choice.value)) { // Sjekker om knappen valgt er en av de 4 knappene
          for(let i = 0; i < spørsmål[spørsmålsnummer].enighet[choice.value].length; i++) { // Skaffer alle partiene som er enige med valget
              if(spørsmål[spørsmålsnummer].enighet[choice.value][i] == parti.alias) { // Dobbeltsjekker om aliasen til partiet som er enig stemmer
                  parti.poeng++; // Legger til 1 poeng til partiet
              }
          }
      }
    });

    spørsmålsnummer++; // Øker spørsmålsnummeret med 1

    // HIDE BTNS + QUESTION

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

      sort(partier);

      // CREATE FULL PROGRESS BAR

      partier.forEach(parti => {
        createProgressText(container, parti);
        createProgressDivBar(container, parti);

        // INCREASE PAGE SIZE

        const wrapper = document.querySelector(".wrapper");
        wrapper.style.height = "102%";

      });

      // CREATE RESTART BUTTON

      createRestartButton(container);

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
  const wrapper = document.querySelector(".wrapper");

  wrapper.style.height = "100vh";

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
  // svarids = [];
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

function sort(partier) {
  partier.sort((a, b) => {
    return b.poeng - a.poeng;
  });
}

function createProgressText(container, parti) {
  const progressTekst = document.createElement("div");
  progressTekst.setAttribute("class", "partiTekst");
  progressTekst.style.fontWeight = "bold";
  progressTekst.style.fontSize = "22px";
  progressTekst.style.marginBottom = "3%";
  progressTekst.style.marginTop = "3%";
  progressTekst.style.color = parti.partiFarge;
  progressTekst.innerText = parti.navn;
  container.appendChild(progressTekst);
}

function createProgressDivBar(container, parti) {
  const progressDiv = document.createElement("div");
  progressDiv.setAttribute("class", "progress");
  progressDiv.style.width = "90%";
  progressDiv.style.margin = "auto";
  container.append(progressDiv);

  const progressBar = document.createElement("div");
  progressBar.setAttribute("class", "progress-bar", "role", "progressbar", "aria-valuenow", (parti.poeng / Object.keys(spørsmål).length) * 100, "aria-valuemin", "0", "aria-valuemax", "100");
  progressBar.style.width = "0%";
  progressBar.innerText = "0%";
  progressBar.style.backgroundColor = parti.partiFarge;
  progressDiv.appendChild(progressBar);
  setTimeout(() => {
    progressBar.style.transition = "width 1s ease-in-out";
    progressBar.style.width = (parti.poeng / Object.keys(spørsmål).length) * 100 + "%";
    progressBar.innerText = Number(Math.round((parti.poeng / Object.keys(spørsmål).length) * 100)) + "%";
  }, 250);

}

function createRestartButton(container) {
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
}