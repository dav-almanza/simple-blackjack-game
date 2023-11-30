import modalHtml from './modal-html/modal-init.html?raw';

let modal;
/**
 * 
 * @param {HTMLDivElement} elemHtml 
 * @returns {HTMLDivElement} 
 */
export const renderModalInit = ( elemHtml ) => {

    if(!elemHtml) 
        throw new Error('Html Element is required for rendering ModalInit');
    if(!modal){
        modal = document.createElement('div');
        modal.classList.add('modal', 'fade');  // modal-container
        modal.setAttribute('id','modal-id');
        // modal.setAttribute('tabindex','-1');
        modal.innerHTML = modalHtml;
        elemHtml.append(modal);
    }
    // En caso de crear el modal multiples veces al iniciar juego en el evento "Nuevo Juego"...
    // const oldModal = elemHtml.lastElementChild;
    // if( oldModal.classList.contains('modal') && oldModal.id == 'modal-id'){
    //     // elemHtml.replaceChild( modal, oldModal);
    //     // elemHtml.removeChild(oldModal);
    //     oldModal.remove();
    // }
    
    return modal;
}

// export default renderModalInit;