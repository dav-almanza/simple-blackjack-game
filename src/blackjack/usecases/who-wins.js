/**
 * funcion para el delay necesario y mostrar cartas antes del ALERT, es para N jugadores
 * @param { Array<Number>} jugadores jugadores
 * @param { Array<Number>} puntos puntaje de los jugadores
 * @param { Array<Number>} indx indices de los jugadores ganadores
 */
export const quienGana = ( jugadores, puntos ) => { 
    if ( !jugadores || !puntos ) throw new Error('jugadores y puntos son necesarios');
    
    const puntosGanador = Math.max(...puntos.filter( elem => elem <=21 )); 
     
    let ind  = 0, indx = [];   
    while ( ind < puntos.length ) {
        ind = puntos.indexOf(puntosGanador, ind ) ; 
        if ( ind === -1 ) break;
        indx.push( ind );        // indices de los q son <= 21
        ind++;    
    }
    let ganador = [];
    // if ( indx.length > 1 ) {
    //     for (const ind of indx) {
    //         ganador = [ ...ganador, jugadores[ind] ];
    //     }
    // } else { 
    //     ganador = [jugadores[indx]];
    // }    
    indx.forEach( ind => ganador = [ ...ganador, jugadores[ind] ] );
     
    return ganador;
}