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

// Alerta pantalla error de palabra

var container = document.querySelector(".alertas-usuario")
export const AlertaPalabraNoValida = (texto) => {
    if(container.childElementCount <7){
        var textoAlerta =  document.createElement("p");
        textoAlerta.style.animation = "cartelError .3s linear"
        textoAlerta.innerHTML = texto;
        container.appendChild(textoAlerta)
        setTimeout(() => {
            textoAlerta.style.animation = "ReverseCartelError .3s linear"
        }, 1720);
        setTimeout(() => {
            container.removeChild(textoAlerta)
        }, 2000);
    }   
}