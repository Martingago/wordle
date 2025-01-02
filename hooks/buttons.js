import { reiniciarPartida } from "../app.js";

// modal información
const btnInfo = document.querySelector(".btn-info");
const modalInfo = document.querySelector(".modal-background-info");
const closeBtnInfo = document.querySelector(".close-btn-info");

btnInfo.addEventListener("click", () => {
  modalInfo.classList.add("mostrar-modal-info")
});
closeBtnInfo.addEventListener("click",
()=> {
    modalInfo.classList.remove("mostrar-modal-info")
} )

// Modal estadisticas

const btnStats = document.querySelector(".btn-stats");
const modalStats = document.querySelector(".modal-background-stats");
const closeBtnStats = document.querySelector(".close-btn-stats");

btnStats.addEventListener("click",()=> {
  modalStats.classList.add("mostrar-modal-stats")
})

closeBtnStats.addEventListener("click", ()=> {
  modalStats.classList.remove("mostrar-modal-stats")
})

// Modal victoria
const modalWin = document.querySelector("#modal-win-info");
const resetBtn = document.querySelector(".reset-game-btn");
const palabraSecreta = document.querySelector(".confirmation-word")

//Reinicia la partida

resetBtn.addEventListener("click", ()=> {
  reiniciarPartida()
  modalWin.classList.add("hide-win-modal")
  modalWin.classList.remove("show-win-modal")
})

export const showWinModal = (palabra) => {
  palabraSecreta.textContent = palabra;
  modalWin.classList.add("show-win-modal");
  modalWin.classList.remove("hide-win-modal")
}

//Modal derrota
const modalLose = document.querySelector("#modal-lose-info");
const resetBtnLose = document.querySelector("#reset-btn-lose");
const palabraSecretaLose = document.querySelector(".confirmation-lose-word");

resetBtnLose.addEventListener("click", () => {
  reiniciarPartida();
  modalLose.classList.add("hide-lose-modal");
  modalLose.classList.remove("show-lose-modal");
});

export const showLoseModal = (palabra) => {
  palabraSecretaLose.textContent = palabra;
  modalLose.classList.add("show-lose-modal");
  modalLose.classList.remove("hide-lose-modal");
}