/**
 * Funcion para obtener una carta del Deck
 * @param {Array<String>} deck  deck de cartas ...
 * @returns {String}            retorna una carta
 */
export const pedirCarta = (deck) => {
    if ( !deck || deck.length === 0 ) throw new Error('No hay cartas en el deck')
    return deck.pop();
}