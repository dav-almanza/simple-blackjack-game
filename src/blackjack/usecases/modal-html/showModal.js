import modalHtmlInit from './modal-init.html?raw';
import modalHtmlNames from './modal-players.html?raw';
import modalHtmlWinner from './modal-winner.html?raw';

let modalinit,
    modalNames,
    modalWinner,
    playersNames = [];

export const hideModal = (modalElement) => {
    modalElement?.classList.add('hidden-modal');
}

export const showModal = (modalElement) => {
    modalElement?.classList.remove('hidden-modal');
}

/**
 * Build the modal
 * @param {HTMLDivElement} elemHtml 
 * @returns {HTMLDivElement} 
 */
export const renderModalInit = ( elemHtml ) => {

    if(!elemHtml) 
        throw new Error('Html Element is required for rendering ModalInit');
    if(!modalinit){
        modalinit = document.createElement('div');
            modalinit.innerHTML = modalHtmlInit;
            modalinit.classList.add('modal-container','hidden-modal');  // modal-container
            modalinit.setAttribute('id','modal-id');
        // modal.setAttribute('tabindex','-1');
        modalinit.addEventListener( 'click', (ev) => {
            if ( ev.target.className === 'modal-container') hideModal(modalinit);
        })

        elemHtml.append(modalinit);
    }
    // En caso de crear el modal multiples veces al iniciar juego en el evento "Nuevo Juego"...
    // const oldModal = elemHtml.lastElementChild;
    // if( oldModal.classList.contains('modal') && oldModal.id == 'modal-id'){
    //     // elemHtml.replaceChild( modal, oldModal);
    //     // elemHtml.removeChild(oldModal);
    //     oldModal.remove();
    // }
    return modalinit;
}
/**
 * Modal for Player's names
 * @param {HTMLDivElement} elemHtml 
 * @param {callback} initGame 
 * @returns 
 */
export const renderModalPlayersName = ( elemHtml, initGame ) => {

    if(!elemHtml) 
        throw new Error("Html Element is required to obtain player's name in ModalNames");
    if(!modalNames){
        modalNames = document.createElement('div');
            modalNames.innerHTML = modalHtmlNames;
            modalNames.classList.add('modal-container','hidden-modal');  // modal-container
            modalNames.setAttribute('id','modal-names-id');
        // modal.setAttribute('tabindex','-1');

        const form = modalNames.querySelector('#players-name'); // form

            form.addEventListener( 'submit', (ev) => {
                ev.preventDefault();
                const formData = new FormData(form); // obj to extract form values
                playersNames = [];
                for (const [key, value] of formData) {              
                    playersNames.push(value);
                }
                hideModal( modalNames );
                initGame( playersNames );
                // return playersNames;
            })

        elemHtml.append(modalNames);
    }
    return modalNames;
}
/**
 * Modal to show who's the winner
 * @param {HTMLDivElement} elemHtml 
 * @returns 
 */
export const showModalWinner = ( elemHtml) => {

    if(!elemHtml) 
        throw new Error('Html Element is required for rendering ModalInit');
    if(!modalWinner){
        modalWinner = document.createElement('div');
            modalWinner.innerHTML = modalHtmlWinner;
            modalWinner.classList.add('modal-container','hidden-modal');  // modal-container
            modalWinner.setAttribute('id','modal-winner-id');

        elemHtml.append(modalWinner);
    }
    return modalWinner;
}

// export default renderModalInit;