import _ from 'underscore';  // import {shuffle} from underscore, mas especifico pero menos legible

export const crearDeck = () => {  
    
    const tipos  = ['C', 'D', 'H', 'S'],  // variables tipos de cartas y valores  
          letras = ['J', 'Q', 'K', 'A'];

    // if (!tipos  || tipos.length  === 0) throw new Error('tipos de carta son obligatorios como arreglo de strings');
    // if (!letras || letras.length === 0) throw new Error('letras de carta son obligatorios como arreglo de strings');

    let deck = [];
    for (let tipo of tipos) {
        
        for (let i = 2; i <= 10; i++) {
        deck.push( `${i}` + tipo );          
        }
        for (let letra of letras) {
        deck.push( letra + tipo ); 
        }    
    }
    return  _.shuffle(deck);       
}
export default crearDeck;

// se puede exportar cualquier cosa...