import _ from 'underscore'; 
import { crearDeck, puntosYcartasHTmL, turnoComputadora, quienGana } from "./usecases"; 
import { hideModal, renderModalInit, renderModalPlayersName, showModal } from './usecases/modal-html/showModal';

const ModuloBlackJack = ( () => {
  'use strict' 
    /** ------------------------------------------------------------------------------
     INICIALIZACIONES de Variables
    */
    const btnNuevoJuego   = document.querySelector('#btnNuevo'),
          btnPedirCarta   = document.querySelector('#btnPedir'),
          btnDetener      = document.querySelector('#btnDetener'),  // botones
          divContainer    = document.querySelector('#jug'),
          divApp          = document.querySelector('#app');
    let   deck, turno,
          jugadores       = [],
          puntosJugadores = [],
          smalls          = [], 
          divCartasImg    = []; 
    let   modalinit, 
          modalNames;
    
    /** -------------------------------------------------------------------------------
     *                INFO: InicializarJuego()
     * FUNCION : Inicializar Juego de BlackJack
     * 
     * @param {number} numJugadores cantidad de jugadores: default=2
     */
    const InicializarJuego = ( playersNames ) => {  

        deck  = crearDeck(); 
        turno = 0;
        jugadores       = [...playersNames, 'computer'],
        puntosJugadores = [];
        console.log(jugadores);

        while ( divContainer.children.length >= 1 ) {
            divContainer.lastElementChild.remove();
        }
        // for (let i = 0; i < numJugadores; i++) {
        //     if ( i < numJugadores-1 ) {
        //         jugadores.push( prompt(`nombre de jugador ${i+1}`) ); // definiendo nombres de jugadores
        //     } else {
        //         jugadores.push( 'computadora' );
        //     }         
        //     puntosJugadores.push(0);  // inicializando puntajes

        //     // creando estructura de elementos HTML: espacio de juego de cada jugador
        //     const divCartas = document.createElement('div');
        //           divCartas.classList.add('bloques');

        //     smalls[i]       = document.createElement('div');
        //     divCartasImg[i] = document.createElement('div');
        //     smalls[i].innerHTML = `
        //       <h2> ${jugadores[i]} </h2>
        //       <h3> ${0} </h3>
        //       ` ; 
            
        //     divCartas.append( smalls[i], divCartasImg[i]);
        //     divContainer.append( divCartas );
        //   }
        for (const playerIndx in jugadores) {
            puntosJugadores.push(0);  // inicializando puntajes
            
            // creando estructura de elementos HTML: espacio de juego de cada jugador
            const divCartas = document.createElement('div');
                  divCartas.classList.add('bloques');

            smalls[playerIndx]       = document.createElement('div');
            divCartasImg[playerIndx] = document.createElement('div');
            smalls[playerIndx].innerHTML = `<h2> ${jugadores[playerIndx]}: <small> ${0} </small> </h2> ` ; 
            
            divCartas.append( smalls[playerIndx], divCartasImg[playerIndx]);
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

            //TODO: otra via: activar clase para resaltar turno de jugador
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
        ( ganadores.length > 1 ) ? winnerMsg = 'EMPATAN '
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

        if (!modalinit) {
          modalinit  = renderModalInit( divApp );

          const formInputPlayersNum = modalinit.querySelector('#players-num');  // input: players num
          const continueBtn         = modalinit.querySelector('#continue-button-players');  // continue button
          
          formInputPlayersNum.addEventListener( 'input', (ev) => {
              numJug = +ev.target.value;
              continueBtn.disabled = (numJug > 4 || numJug < 1 || isNaN(numJug)) ? true : false;
              
          })

          if (!modalNames) {
              modalNames = renderModalPlayersName( divApp, InicializarJuego );
              const formPlayerNames = modalNames.querySelector('#players-name');  // form: players's name
              const formLetsPlayBtn = modalNames.querySelector('.play-button');  // form: Let's play button
              
              let inputsPlayersNames = document.createElement('div');
                  // inputsPlayersNames.classList.add('');

              // event after press button continue (new Game)
              continueBtn.addEventListener( 'click', () => {
                  hideModal( modalinit );
                  inputsPlayersNames.innerHTML = '';
                  for (let i = 1; i <= numJug; i++) {
                    inputsPlayersNames.innerHTML += `
                        <br/>
                        <input type="text" placeholder="player's name ${i}" name="players" id="player-name-${i}" class="players-name--input form-control" >
                    `;
                  }
                  formPlayerNames.insertBefore( inputsPlayersNames, formLetsPlayBtn );
                  showModal( modalNames );     
                  //TODO: Falta inicializar el juego          
              });
          } 
        }
        showModal(modalinit);
      
        // const modalNames = render
        // do {9
        //   numJug = parseInt( prompt('¿Cantidad de Jugadores? ( >=2 )') ); // SHOWMODAL
        // } while ( !numJug || numJug < 2 );
        // InicializarJuego();  
    })
   //-----------------------------------------------------------------------------------

   

  return { nuevoJuego: InicializarJuego };  
} ) ()



