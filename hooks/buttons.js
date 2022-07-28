
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