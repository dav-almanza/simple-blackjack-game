import { puntosYcartasHTmL } from "./puntos-cartas";
/**
 * 
 * @param {Array<Number>} deck 
 * @param {Array<Number>} puntos  cantidad de puntos de los jugadores
 * @param {Array<Number>} smalls  puntos en HTML
 * @param {Element} divCartasImg  referencia HTML para colocar las cartas
 */
export const turnoComputadora = (deck, puntos, smalls, divCartasImg ) => {
      
    let puntosComputador = 0; 
    const puntosMinimos = Math.max(...puntos.filter( elem => elem <=21 )); 
    do { 
        puntosComputador = puntosYcartasHTmL( deck, puntos.length - 1, puntos, smalls, divCartasImg);
        if ( puntosComputador === 20 ) break;
    } while ( (puntosMinimos >= puntosComputador) && puntosMinimos <= 21);
}

 