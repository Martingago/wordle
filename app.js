"use strict";
import { basePalabras } from "./basePalabras.js";

// Obtener palabra aleatoria desde la BBDD
const posicionPalabra = Number(Math.trunc(Math.random() * basePalabras.length));
const secretWord = basePalabras[posicionPalabra];
console.log(secretWord);

const letras = document.querySelectorAll(".letra");
let descompuesta = [];
let introducidaUsuario = [];

for (let i = 0; i < secretWord.length; i++) {
    descompuesta.push(secretWord[i]);
}

const intentos = document.querySelectorAll(".palabra-usuario");
let posicion = 0;

// Cargar datos introducidos por usuario en pantalla

    document.addEventListener("keydown", (e) => {

        if (validarInput(e.key) && introducidaUsuario.length <= 4) {
            intentos[posicion].children[introducidaUsuario.length].textContent = `${e.key.toLowerCase()}`;
            introducidaUsuario.push(e.key.toLowerCase());
        } else if (e.key.toLowerCase() === "backspace") {
            introducidaUsuario.pop();
            intentos[posicion].children[introducidaUsuario.length].textContent = null;
        }
    });

// Validar que el valor sea una letra
const abecedario = "abcdefghijklmnñopqrstuvwxyzçABCDEFGHIJKLMNÑOPQRSTUVWXYZÇ";
const validarInput = (texto) => {
    for (let i = 0; i < texto.length; i++) {
        if (abecedario.indexOf(texto.charAt(i), 0) != -1 && texto.length == 1) {
            return true;
        }
    }
    return false;
};

// Convertir el input del usuario en string
let letraString = "";
const inputToString = () => {
    letraString = introducidaUsuario.join("");
};

// Validacion de las palabras que introduce el usuario

const pantallaError = document.querySelector(".error-msg");

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "enter") {
        inputToString();
        if (introducidaUsuario.length === 5) {
            if (basePalabras.includes(letraString)) {
                comprobarVictoria();
                posicion++;
                introducidaUsuario = []
                
            } else {
                pintarPantalla("La palabra no es válida");
            }
        } else {
            pintarPantalla("La palabra no tiene 5 letras");
        }
    }
});

const pintarPantalla = (texto) => {
    pantallaError.textContent = texto;
};

// intento perdido

let vidas = 5;
const perderIntento = () => {
    vidas--;
    if (vidas <= 0) {
        pintarPantalla("te has quedado sin vidas");
    } else {
        comprobarLetra();
    }
};
const comprobarVictoria = () => {
    if (letraString == secretWord) {
        pintarPantalla("Ganaste");
        comprobarLetra()
    } else {
        perderIntento();
    }
};

// Pista usuario letras

const comprobarLetra = () => {
    for (let i = 0; i < 5; i++) {
        if (descompuesta[i] == introducidaUsuario[i]) {
            intentos[posicion].children[i].classList.add("correcta")
        } else {
            if (descompuesta.includes(introducidaUsuario[i])) {
                // crear funcion en caso de: una palabra introducida por un usuario que contiene una letra duplicada,
                // si solo se encuentra 1 vez, pintar la que se encuentra mal situada en posicion "noexiste", ya que la que existe ya se ha pintado
                intentos[posicion].children[i].classList.add("existe")
            } else {
                intentos[posicion].children[i].classList.add("noexiste")
            }
        }
    }
};
