import _ from 'underscore'; 
import { crearDeck, puntosYcartasHTmL, turnoComputadora, quienGana } from "./usecases"; 
import { hideModal, renderModalInit, renderModalPlayersName, showModal, showModalWinner } from './usecases/modal-html/showModal';

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

    let   deck, turno, numJug,
          jugadores       = [],
          puntosJugadores = [],
          smalls          = [], 
          divCartasImg    = []; 

    let   modalinit, 
          modalNames,
          modalWinner;
    
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

        while ( divContainer.children.length >= 1 ) {
            divContainer.lastElementChild.remove();
        }
      
        for (const playerIndx in jugadores) {
            puntosJugadores.push(0);  // inicializando puntajes
            
            // creando estructura de elementos HTML: espacio de juego de cada jugador
            const divCartas = document.createElement('div');
                  divCartas.classList.add('bloques');

            smalls[playerIndx] = document.createElement('div');
            smalls[playerIndx].innerHTML = `
                <p class="active-player">It's your turn!</p>
                <h2> ${jugadores[playerIndx]}</h2> 
                <small> ${0} </small> 
                ` ; 
            
            divCartasImg[playerIndx] = document.createElement('div');
            
            divCartas.append( smalls[playerIndx], divCartasImg[playerIndx] );
            divContainer.append( divCartas );

            if ( playerIndx == 0 ) {
                smalls[playerIndx].querySelector('.active-player').style.opacity = 1;  // mark the first player's turn
            }
          }
        btnPedirCarta.disabled = false;  
        btnDetener.disabled    = false;
        btnNuevoJuego.disabled = true;
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

        if( jugadores[turno] !== 'computer') {
           smalls.forEach( playerDiv => playerDiv.querySelector('.active-player').style.opacity = 0 );
        //    smalls.forEach( playerDiv => playerDiv.querySelector('h2').classList.remove('active-player2'));
           showNextTurn( turno );
        } else {
           smalls.forEach( playerDiv => playerDiv.querySelector('.active-player').style.opacity = 0 );
        //    smalls.forEach( playerDiv => playerDiv.querySelector('h2').classList.remove('active-player2'));
           showNextTurn( turno );
           turnoComputadora( deck, puntosJugadores, smalls, divCartasImg  );
           mostrarGanador();

           btnPedirCarta.disabled = true;
           btnDetener.disabled = true;
        } 
    }

    const showNextTurn = ( turn ) => {
        smalls[turn].querySelector('.active-player').textContent = `${jugadores[turn]}'s turn`;
        smalls[turn].querySelector('.active-player').style.opacity = 1;
        // smalls[turn].querySelector('h2').classList.add('active-player2');
    }
    /** ---------------------------------------------------------------------------------
     *                INFO: mostrarGanador()
     * FUNCION para mostrar mensaje de ganador(es) en pantalla 
     */
    const mostrarGanador = () => {
        const ganadores = quienGana( jugadores, puntosJugadores );

        let winnerMsg = '';
        ( ganadores.length > 1 ) ? winnerMsg = 'Draw ' : winnerMsg = 'Winner!';
                                 
        setTimeout(() => {
            modalWinner.querySelector('h2').innerHTML = ` ${winnerMsg} `;
            modalWinner.querySelector('#player-winner').textContent = ` ${ganadores.join(' & ')} `;
            showModal( modalWinner );
        }, 1000);        
    }


    /**-----------------------------------------------------------------------------
     *                EVENTOS del Juego BlackJack   
    */ 
    btnPedirCarta.addEventListener('click', () => {    // PEDIR CARTA
      const puntosJug = puntosYcartasHTmL( deck, turno, puntosJugadores, smalls, divCartasImg);   
      if( puntosJug >= 21 ) {
          turno++;
          nextPlayerGame( turno, jugadores );
      }
    })
    // DETENER ---------------------------------------------------------------------
    btnDetener.addEventListener('click', () => {   
      turno++;
      nextPlayerGame( turno, jugadores);
    })
   // NUEVO JUEGO-------------------------------------------------------------------
    btnNuevoJuego.addEventListener('click', () => {  
        // configGameModals( modalinit, modalNames, modalWinner );
        if (!modalinit) {
            modalinit  = renderModalInit( divApp );
    
            const formInputPlayersNum = modalinit.querySelector('#players-num');  // input: players num
            const btnContinue         = modalinit.querySelector('#continue-button-players');  // continue button
            formInputPlayersNum.addEventListener( 'input', (ev) => {
                numJug = +ev.target.value;
                btnContinue.disabled = (numJug > 4 || numJug < 1 || isNaN(numJug)) ? true : false;
            });
            
            if (!modalNames) {
                modalNames = renderModalPlayersName( divApp, InicializarJuego );
    
                const formPlayerNames = modalNames.querySelector('#players-name');  // form: players's name
                const formLetsPlayBtn = modalNames.querySelector('.play-button');  // form: Let's play button
                let inputsPlayersNames = document.createElement('div');  // inputsPlayersNames.classList.add('');
                // event after press button continue (new Game)
                btnContinue.addEventListener( 'click', () => {
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
                });
            } 
          }
    
          if (!modalWinner) {
              modalWinner = showModalWinner( divApp );
    
              const btnRepeatGame = modalWinner.querySelector('#repeat-game-button');
              const btnCloseGame  = modalWinner.querySelector('.btn-winner-close');
              btnRepeatGame.addEventListener( 'click', () => {
                  const players = jugadores.filter(jugador => jugador !== 'computer');
                  hideModal( modalWinner );
                  InicializarJuego( players );
              })
              btnCloseGame.addEventListener( 'click', () => {
                  while ( divContainer.children.length >= 1 ) {
                      divContainer.lastElementChild.remove();
                  }
                  hideModal( modalWinner );
                  btnNuevoJuego.disabled = false;
              });
          }
        showModal(modalinit);   
    })
  return { nuevoJuego: InicializarJuego };  
})()



