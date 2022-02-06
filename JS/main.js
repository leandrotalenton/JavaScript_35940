let jugadaJugador
let jugadaComputadora
let puntajeJugador = 0
let puntajeComputadora = 0
let jugada

function piedraPapelOTijera(jugada){ // esta funcion transforma a los numeros 1, 2 o 3 en piedra papel o tijera respectivamente
    if(jugada === 1){
        jugada = "piedra";
    } else if(jugada === 2){
        jugada = "papel";
    } else if(jugada === 3){
        jugada = "tijera";
    } else {
        console.log("jugada no valida");
    }
    return jugada
}

for( let i=0 ; i<10 ; i++ ) { // este for hace que se juegue 10 veces
    do{
        do{
            jugadaJugador = parseInt(prompt("1: piedra, 2: papel, 3: tijera"))
            if(isNaN(jugadaJugador)){ // este if transforma en 0 a cualquier cosa que se introduzca que no sea un numero para evitar posibles errores
                jugadaJugador=0
            }
            jugadaJugador = piedraPapelOTijera(jugadaJugador)
        } while ( jugadaJugador < 1 || jugadaJugador > 3 )

        jugadaComputadora = piedraPapelOTijera(rndInt = Math.floor(Math.random() * 3) + 1)

        console.log(`el jugador juega ${jugadaJugador}`)
        console.log(`la computadora juega ${jugadaComputadora}`)

        if (jugadaJugador === "piedra" && jugadaComputadora === "papel"){
            console.log('%c gana computadora ', 'background: pink; color: red');
            puntajeComputadora++;
        } else if (jugadaJugador === "piedra" && jugadaComputadora === "tijera"){
            console.log('%c gana jugador ', 'background: lightgreen; color: green');
            puntajeJugador++;
        } else if (jugadaJugador === "papel" && jugadaComputadora === "piedra"){
            console.log('%c gana jugador ', 'background: lightgreen; color: green');
            puntajeJugador++;
        } else if (jugadaJugador === "papel" && jugadaComputadora === "tijera"){
            console.log('%c gana computadora ', 'background: pink; color: red');
            puntajeComputadora++;
        } else if (jugadaJugador === "tijera" && jugadaComputadora === "piedra"){
            console.log('%c gana computadora ', 'background: pink; color: red');
            puntajeComputadora++;
        } else if (jugadaJugador === "tijera" && jugadaComputadora === "papel"){
            console.log('%c gana jugador ', 'background: lightgreen; color: green');
            puntajeJugador++;
        } else {
            console.log('%c empate ', 'background: yellow; color: darkgoldenrod');
        }
    } while (jugadaJugador == jugadaComputadora)
}

document.write(`El puntaje del jugador es ${puntajeJugador} <br>`)
document.write(`El puntaje de la computadora es ${puntajeComputadora} <br>`)

if( puntajeJugador > puntajeComputadora ){
    document.write(`Gana el jugador por ` + ((puntajeJugador) - (puntajeComputadora)) + ` puntos <br>`);
} else if ( puntajeComputadora > puntajeJugador ) {
    document.write(`Gana la computadora por `  + ((puntajeComputadora) - (puntajeJugador)) + ` puntos <br>`)
} else {
    document.write(`Empate ${puntajeJugador} a ${puntajeComputadora}`)
}