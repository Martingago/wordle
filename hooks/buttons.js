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