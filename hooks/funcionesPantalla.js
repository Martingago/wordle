"use strict";

// Validacion de datos: 
// El usuario sólo puede introducir letras

const abecedario = "abcdefghijklmnñopqrstuvwxyzçABCDEFGHIJKLMNÑOPQRSTUVWXYZÇ";
 export const validarInput = (texto) => {
    for (let i = 0; i < texto.length; i++) {
        if (abecedario.indexOf(texto.charAt(i), 0) != -1 && texto.length == 1) {
            return true;
        }
    }
    return false;
};
