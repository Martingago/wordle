
let partidasUsuario = Number(localStorage.getItem("partidas"));

// Partidas totales jugadas por el usuario
export const añadirPartida = () => {
    partidasUsuario = partidasUsuario + 1;
    localStorage.setItem("partidas", partidasUsuario)
}

let derrotaUsuario = Number(localStorage.getItem("derrotas"))
export const añadirDerrota = () => {
    derrotaUsuario = derrotaUsuario + 1;
    localStorage.setItem("derrotas", derrotaUsuario)
}

// Victorias del usuario
let victoriasUsuario = Number(localStorage.getItem("victorias"));
let currentRachaVictorias = Number(localStorage.getItem("rachaVictorias"));
let MayorRachaVictorias = Number(localStorage.getItem("mejorRachaVictoria"))

 export const añadirVictoria = () => {
    victoriasUsuario = victoriasUsuario + 1;
    localStorage.setItem("victorias", victoriasUsuario);
    currentRachaVictorias =  currentRachaVictorias + 1;
    localStorage.setItem("rachaVictorias", currentRachaVictorias);
}


export const actualizarRachaVictorias = () => {
    if(MayorRachaVictorias < currentRachaVictorias){
        MayorRachaVictorias = currentRachaVictorias;
        localStorage.setItem("mejorRachaVictoria", MayorRachaVictorias)
    }
}

let porcentajeVictoria = victoriasUsuario / partidasUsuario * 100;
let porcentajeDerrota = derrotaUsuario / partidasUsuario * 100;

