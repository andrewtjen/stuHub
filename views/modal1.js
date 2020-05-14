const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal() {
    // document.getElementById("modal").style.height = '500px';
    // document.getElementById("modal").style.width = '500px';
    const modal = document.getElementById("modal")
    const overlay = document.getElementById("overlay")
    modal.style.transform = "translate(-50%, -50%) scale(1)";
    overlay.style.opacity = "0.6";
    overlay.style.pointerEvents = "all";
    //document.getElementById("modal").style.display = 'block';
    //if (modal == null) return
    // modal.classList.add('active')
    // overlay.classList.add('active')
}

function closeModal() {
    // if (modal == null) return
    // document.getElementById("modal").style.height = '0';
    // document.getElementById("modal").style.width = '0';
    //document.getElementById("modal").style.display = 'none';
    const modal = document.getElementById("modal")
    const overlay = document.getElementById("overlay")
    modal.style.transform = "translate(-50%, -50%) scale(0)";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    // modal.classList.remove('active')
    // overlay.classList.remove('active')
}