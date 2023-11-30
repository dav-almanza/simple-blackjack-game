import _ from 'underscore'; 
import { crearDeck, puntosYcartasHTmL, turnoComputadora, quienGana } from "./usecases"; 

const ModuloBlackJack = ( () => {
  'use strict' 
    /** ------------------------------------------------------------------------------
     INICIALIZACIONES de Variables
    */
    const btnLetsPlay     = document.querySelector('#btnBegin'),
          btnNuevoJuego   = document.querySelector('#btnNuevo'),
          btnPedirCarta   = document.querySelector('#btnPedir'),
          btnDetener      = document.querySelector('#btnDetener'),  // botones
          divContainer    = document.querySelector('#jug'),
          divModal        = document.querySelector('#modal-id');
    let   deck, turno,
          jugadores       = [],
          puntosJugadores = [],
          smalls          = [], 
          divCartasImg    = []; 
    
    /** -------------------------------------------------------------------------------
     *                INFO: InicializarJuego()
     * FUNCION : Inicializar Juego de BlackJack
     * 
     * @param {number} numJugadores cantidad de jugadores: default=2
     */
    const InicializarJuego = (numJugadores=2) => {  

        deck = crearDeck(); turno = 0;
        jugadores       = [],
        puntosJugadores = [];

        // if ( !!divContainer.innerHTML) divContainer.innerHTML = '';
        while ( divContainer.children.length >= 1 ) {
            divContainer.lastElementChild.remove();
        }

       // aqui sacar valores del formulario.. cantidad de jugadores

        for (let i = 0; i < numJugadores; i++) {
            if ( i < numJugadores-1 ) {
                jugadores.push( prompt(`nombre de jugador ${i+1}`) ); // definiendo nombres de jugadores
            } else {
                jugadores.push( 'computadora' );
            }         
            puntosJugadores.push(0);  // inicializando puntajes

            // creando estructura de elementos HTML: espacio de juego de cada jugador
            const divCartas = document.createElement('div');
                  divCartas.classList.add('bloques');

            smalls[i]       = document.createElement('div');
            divCartasImg[i] = document.createElement('div');
            smalls[i].innerHTML = `
              <h2> ${jugadores[i]} </h2>
              <h3> ${0} </h3>
              ` ; 
            
            divCartas.append( smalls[i], divCartasImg[i]);
            divContainer.append( divCartas );
          }
      
        btnPedirCarta.disabled = false;  
        btnDetener.disabled    = false;
    }
    /** --------------------------------------------------------------------------------
     *                INFO: NextPlayerGame()
     * FUNCION para definir el siguiente turno de jugador:
     * distinque entre la computadora y cualquier otro jugador
     * 
     * @param {Number} turno 
     * @param {Array<String>} jugadores 
     */
    const nextPlayerGame = (turno, jugadores) => { 

        // turno++   => por que no funciona incrementar el turno en esta funcion????
        if( turno !== jugadores.length - 1 ) {
            alert( `Turno de ${jugadores[turno]}` ); 
            // otra via: activar clase para resaltar turno de jugador
            // la idea seria: recorrer y quitarselas a todos y luego solo agregar la "clase" al turno actual
        } else {
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( deck, jugadores, puntosJugadores, smalls, divCartasImg  );
            mostrarGanador();
        } 
    }
    /** ---------------------------------------------------------------------------------
     *                INFO: mostrarGanador()
     * FUNCION para mostrar mensaje de ganador(es) en pantalla 
     */
    const mostrarGanador = () => {
        const ganadores = quienGana( jugadores, puntosJugadores );

        let winnerMsg = '';
        ( ganadores.length > 1 ) ? winnerMsg = 'EMPATAN: '
                                 : winnerMsg = 'GANA!';
        setTimeout(() => {
          alert(` ${ganadores.join(' & ')}  ${winnerMsg} `);  // showModal
        }, 250);
    }


    /**---------------------------------------------------------------------------------
     *                EVENTOS del Juego BlackJack   
    */ 
    btnPedirCarta.addEventListener('click', () => {    // evento PEDIR CARTA

      const puntosJug = puntosYcartasHTmL( deck, turno, jugadores, puntosJugadores, smalls, divCartasImg);   
      if( puntosJug >= 21 ) {
          turno++;
          nextPlayerGame( turno, jugadores );
      }
    })

    // ---------------------------------------------------------------------------------
    btnDetener.addEventListener('click', () => {   // evento DETENER
      turno++;
      nextPlayerGame( turno, jugadores);
    })

   //-----------------------------------------------------------------------------------
    btnNuevoJuego.addEventListener('click', () => {  // evento NUEVO JUEGO
        let numJug;
        do {
          numJug = parseInt( prompt('¿Cantidad de Jugadores? ( >=2 )') ); // SHOWMODAL
        } while ( !numJug || numJug < 2 );
        InicializarJuego();  
    })
   //-----------------------------------------------------------------------------------

   btnLetsPlay.addEventListener('click', () => {  
      const form = divModal.querySelector('#form-players');
      console.log(form);
   }) 
   

  return { nuevoJuego: InicializarJuego };  
} ) ()



