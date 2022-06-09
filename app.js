"use strict"

const letras = document.querySelectorAll(".letra");
let secretWord = ("piano").toUpperCase();
let descompuesta = [];
let introducidaUsuario = [];
var abecedario = "abcdefghijklmnñopqrstuvwxyzçABCDEFGHIJKLMNÑOPQRSTUVWXYZÇ";

for (let i = 0; i < secretWord.length; i++) {
    descompuesta.push(secretWord[i])
}

// Cargar datos introducidos por usuario en pantalla

document.addEventListener("keydown", (e) => {
    if (validarInput(e.key) && introducidaUsuario.length <= 4) {
        letras[introducidaUsuario.length].textContent = `${e.key.toLocaleUpperCase()}`
        introducidaUsuario.push(e.key.toLocaleUpperCase())
    } else if (e.key.toUpperCase() === "BACKSPACE") {
        introducidaUsuario.pop()
        letras[introducidaUsuario.length].textContent = null;
    }
})
// Validar que el valor sea una letra

const validarInput = (texto) => {
    for (let i = 0; i < texto.length; i++) {
        if (abecedario.indexOf(texto.charAt(i), 0) != -1 && texto.length == 1) {
            return true;
        }
    }
    return false;
}

document.addEventListener("keydown",
    (e) => {
        validarInput(e.key)
    })
