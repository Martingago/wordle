"use strict";

import { basePalabras } from "./hooks/basePalabras.js";
import {
  validarInput,
  AlertaPalabraNoValida,
} from "./hooks/funcionesPantalla.js";
import { secretWord } from "./hooks/basePalabras.js";
import { añadirVictoria, añadirDerrota, añadirPartida, actualizarRachaVictorias } from "./hooks/storageDatos.js";

if (localStorage.getItem("partidas") == null) {
  localStorage.setItem("partidas", 0);
  localStorage.setItem("victorias", 0);
  localStorage.setItem("derrotas", 0);
  localStorage.setItem("rachaVictorias", 0);
  localStorage.setItem("mejorRachaVictoria", 0);
}


console.log("La palabra secreta es:", secretWord);

const letras = document.querySelectorAll(".letra");
// Variables default cuando se inicializa la app
let descompuesta = [];
let introducidaUsuario = [];
let posicion = 0;

// Fragmenta la palabra en un array con las letras separadas
for (let i = 0; i < secretWord.length; i++) {
  descompuesta.push(secretWord[i]);
}

const pantallaError = document.querySelector(".error-msg");
const intentos = document.querySelectorAll(".palabra-usuario");

// Esta funcion se encarga de mostrar por pantalla los datos que introduce el usuario mediante teclado.
// Tambien carga en el array de introducidaUsuario la palabra para posteriormente ser validada y comprobada.
document.addEventListener("keydown", (e) => {
  if (validarInput(e.key) && introducidaUsuario.length < 5 && posicion < 5) {
    añadirAnimacionInput();
    intentos[posicion].children[
      introducidaUsuario.length
    ].textContent = `${e.key.toLowerCase()}`;
    introducidaUsuario.push(e.key.toLowerCase());
  } else if (e.key.toLowerCase() === "backspace" && posicion < 5) {
    suprimir();
  }
  if (e.key.toLowerCase() === "enter") {
    for (let i = 0; i < 5; i++) {
      intentos[posicion].children[i].style.animation = "aparicion .3s linear";
    }
    comprobarVictoria();
  }
});

// De la misma manera que la anterior, esta funcion carga por pantalla los datos que introduce el usuario, pero de esta vez, a través del teclado digital.
// Carga datos en el array de usuario para posteriormente ser comparado y validado.
const tecladoDigital = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "ñ",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
const tecladoLetra = document.querySelectorAll(".cargar-letra");

for (let i = 0; i < tecladoLetra.length; i++) {
  tecladoLetra[i].textContent = `${tecladoDigital[i].toUpperCase()}`;
}

tecladoLetra.forEach((e) => {
  e.addEventListener("click", () => {
    if (introducidaUsuario.length < 5 && posicion < 5) {
      añadirAnimacionInput();
      intentos[posicion].children[
        introducidaUsuario.length
      ].textContent = `${e.textContent}`;
      introducidaUsuario.push(e.textContent.toLowerCase());
    }
  });
});
// Borra ultima letra del teclado digital
const borrarLetra = document.querySelector(".borrar-letra");
borrarLetra.addEventListener("click", () => {
  if (posicion < 5) {
    suprimir();
  }
});
// Enter del teclado digital
const enterTeclado = document.querySelector(".cargar-palabra");
enterTeclado.addEventListener("click", () => {
  if (posicion < 5) {
    comprobarVictoria();
  }
});

//Borra datos de pantalla
const suprimir = () => {
  introducidaUsuario.pop();
  intentos[posicion].children[introducidaUsuario.length].textContent = null;
  quitarAnimacionInput();
};

//Animaciones del input
const añadirAnimacionInput = () => {
  intentos[posicion].children[introducidaUsuario.length].style.animation =
    "keyInput .1s linear";
  intentos[posicion].children[introducidaUsuario.length].classList.add("focus");
};
const quitarAnimacionInput = () => {
  intentos[posicion].children[introducidaUsuario.length].style.animation = "";
  intentos[posicion].children[introducidaUsuario.length].classList.remove(
    "focus"
  );
};

// Validacion de las palabras que introduce el usuario;
// Si la palabra es valida, se comprueba

let letraString = "";
const validarPalabra = () => {
  letraString = introducidaUsuario.join("");
  if (introducidaUsuario.length === 5) {
    if (basePalabras.includes(letraString)) {
      return true;
    } else {
      AlertaPalabraNoValida("La palabra no está en la lista");
      zumbidoError();
    }
  } else {
    AlertaPalabraNoValida("No hay suficientes caracteres");
    zumbidoError();
  }
  return false;
};

const zumbidoError = () => {
  intentos[posicion].style.animation = "palabraNoValida .3s linear";
  setTimeout(() => {
    intentos[posicion].style.animation = "";
  }, 300);
};
// Comprueba si el usuario ha acertado la palabra
const comprobarVictoria = () => {
  if (validarPalabra(letraString)) {
    // Acierta la palabra
    if (letraString === secretWord) {
      añadirVictoria();
      añadirPartida();
      comprobarLetra();
      actualizarRachaVictorias()
      // CREAR ANIMACION PARA LA VICTORIA

    } else {
      comprobarLetra();
      posicion++;
      introducidaUsuario = [];
      if(posicion === 5){
        console.log("a")
        añadirPartida();
        añadirDerrota();
        actualizarRachaVictorias()
        localStorage.setItem("rachaVictorias", 0);
      }
    }
  }
};

// Pista usuario letras

let letrasCorrecta = [];
let letrasExiste = [];
let letrasNoExiste = [];

const comprobarLetra = () => {
  for (let i = 0; i < 5; i++) {
    if (descompuesta[i] == introducidaUsuario[i]) {
      intentos[posicion].children[i].classList.add("correcta");
      pintarTecladoDigital(letrasCorrecta, introducidaUsuario[i], "correcta");
    } else {
      if (descompuesta.includes(introducidaUsuario[i])) {
        intentos[posicion].children[i].classList.add("existe");
        pintarTecladoDigital(letrasExiste, introducidaUsuario[i], "existe");

        const letrasRepetidasUsuario = introducidaUsuario.reduce(
          (ac, current) => {
            if (current == introducidaUsuario[i]) ac.push(current);
            return ac;
          },
          []
        );
        const letrasRepetidasSecreta = descompuesta.reduce((ac, current) => {
          if (current == descompuesta[i]) ac.push(current);
          return ac;
        }, []);

        if (letrasRepetidasSecreta.length == letrasRepetidasUsuario.length) {
          intentos[posicion].children[i].classList.add("existe");
        } else {
          intentos[posicion].children[i].classList.add("noexiste");
        }
      } else {
        intentos[posicion].children[i].classList.add("noexiste");
        pintarTecladoDigital(letrasNoExiste, introducidaUsuario[i], "noexiste");
      }
    }
  }
  letrasCorrecta = [];
  letrasExiste = [];
  letrasNoExiste = [];
};

const pintarTecladoDigital = (estadoLetra, vueltaUsuario, clase) => {
  estadoLetra.push(tecladoDigital.indexOf(vueltaUsuario));
  for (let i = 0; i < estadoLetra.length; i++) {
    tecladoLetra[estadoLetra[i]].classList.add(clase);
  }
};
const limpiarTecladoDigital = () => {
  for (let i = 0; i < letrasExiste.length; i++) {
    if (tecladoLetra[letrasExiste[i]].classList.contains("existe")) {
      tecladoLetra[letrasExiste[i]].classList.remove("existe");
    }
  }
};
