function openModal() {
    // document.getElementById("modal").style.height = '500px';
    // document.getElementById("modal").style.width = '500px';
    const modal = document.getElementById("modal")
    const overlay = document.getElementById("overlay")
    modal.style.transform = "translate(-50%, -50%) scale(1)";
    overlay.style.opacity = "0.6";
    //overlay.style.pointerEvents = "all";
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
    //overlay.style.pointerEvents = "none";
    // modal.classList.remove('active')
    // overlay.classList.remove('active')
}