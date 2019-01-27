const toggleButton = document.querySelector("button.toggler");
const showEditButton = document.querySelectorAll(".showEdit");
const cancel = document.querySelectorAll(".cancel");
const showDeleteButton = document.querySelectorAll(".showDelete");

toggleButton.addEventListener("click", (event)=>{
    const id = event.target.getAttribute("data-toggle");
    const ul = document.querySelector(id);
    const blockStatus = ul.classList.contains('d-block');
    ul.classList.toggle('d-block', !blockStatus);
});

const showEditModal = () =>{
    modal_overlay.classList.add('d-block');
    modalEdit.classList.add('d-block');
}

const showDeleteModal = () =>{
    modal_overlay.classList.add('d-block');
    modalDelete.classList.add('d-block');
}

const hideModal = () =>{
    modal_overlay.classList.remove('d-block');
    modalEdit.classList.remove('d-block');
    modalEdit.classList.remove('d-block');
    modalDelete.classList.remove('d-block');
    modalDelete.classList.remove('d-block');
}

showEditButton.forEach(e=>e.addEventListener('click', showEditModal));

showDeleteButton.forEach(e=>e.addEventListener('click', showDeleteModal));

cancel.forEach(e => e.addEventListener('click', hideModal));

