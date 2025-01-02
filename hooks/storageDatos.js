
// data user stats
const dataPartidas =  document.querySelector(".user-partidas");
const dataVictorias = document.querySelector(".user-victorias");
const dataDerrotas = document.querySelector(".user-derrotas");
const dataMejorRacha = document.querySelector(".user-mejor-racha");
const dataRacha = document.querySelector(".user-racha-actual");


// Partidas totales jugadas por el usuario
let partidasUsuario = Number(localStorage.getItem("partidas"));
export const añadirPartida = () => {
    partidasUsuario = partidasUsuario + 1;
    localStorage.setItem("partidas", partidasUsuario);
    dataPartidas.textContent = `${partidasUsuario}`
}

// Partidas en las que el usuario ha perdido
let derrotaUsuario = Number(localStorage.getItem("derrotas"))
export const añadirDerrota = () => {
    derrotaUsuario = derrotaUsuario + 1;
    localStorage.setItem("derrotas", derrotaUsuario);
    dataPartidas.textContent = `${partidasUsuario}`;
    dataDerrotas.textContent = `${derrotaUsuario}`
    dataRacha.textContent = 0;
}

// Victorias del usuario
let victoriasUsuario = Number(localStorage.getItem("victorias"));
let currentRachaVictorias = Number(localStorage.getItem("rachaVictorias"));
let MayorRachaVictorias = Number(localStorage.getItem("mejorRachaVictoria"));

 export const añadirVictoria = () => {
    victoriasUsuario = victoriasUsuario + 1;
    localStorage.setItem("victorias", victoriasUsuario);
    currentRachaVictorias =  currentRachaVictorias + 1;
    localStorage.setItem("rachaVictorias", currentRachaVictorias);
    dataVictorias.textContent = `${victoriasUsuario}`
    dataRacha.textContent = `${currentRachaVictorias}`;
}

export const actualizarRachaVictorias = () => {
    if(MayorRachaVictorias < currentRachaVictorias){
        MayorRachaVictorias = currentRachaVictorias;
        localStorage.setItem("mejorRachaVictoria", MayorRachaVictorias);
        dataMejorRacha.textContent = `${MayorRachaVictorias}`
    }
}

export const updateStoreStats = () => {
    let porcentajeVictoria = Math.round(victoriasUsuario / partidasUsuario * 100);
    // Inicializando score del usuario
    dataPartidas.textContent = `${partidasUsuario}`;
    dataVictorias.textContent = `${victoriasUsuario}`;
    dataDerrotas.textContent = `${derrotaUsuario}`;
    if(!porcentajeVictoria){
        document.querySelector(".user-porcentaje-victorias").textContent = 0;
    } else{
        document.querySelector(".user-porcentaje-victorias").textContent = `${porcentajeVictoria}%`;
    }
    
    dataRacha.textContent = `${currentRachaVictorias}`;
    dataMejorRacha.textContent = `${MayorRachaVictorias}`;
}



