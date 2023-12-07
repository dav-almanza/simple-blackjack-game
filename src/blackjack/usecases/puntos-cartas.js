  import { pedirCarta } from "./pedir-carta";
  import { valorCarta } from "./valor-carta";
  
  /**
   * Funcion para crear puntos y cartas de cada jugador
   * @param {Array<String>} deck               baraja de cartas
   * @param {Number} turno                     indice del turno de jugador
   * @param {Array<Number>} jugador            jugador
   * @param {Array<Number>} puntos             cantidad de puntos de los jugador
   * @param {Array<Number>} smalls             puntos en HTML
   * @param {Element} divCartasImg             referencia HTML para colocar las cartas
   * @returns {Number}                cantidad de puntos del jugador de turno
   */
 export const puntosYcartasHTmL = ( deck, turno, jugador, puntos, smalls, divCartasImg ) => {
  
    // calcular puntos
    const carta = pedirCarta(deck); 
    puntos[turno] = puntos[turno] + valorCarta(carta);

    // HTmL
    smalls[turno].innerHTML = `<h2> ${jugador[turno]}: <small> ${puntos[turno]} </small> </h2> `;
    const CartaHTmL     = document.createElement('img');
          CartaHTmL.src = `assets/cartas/${carta}.png`; 
          CartaHTmL.classList.add('cartasHTML');
    divCartasImg[turno].append(CartaHTmL);

    return puntos[turno]; 
 }


