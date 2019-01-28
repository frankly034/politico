const toggleButton = document.querySelector("button.toggler");
const voteButtons = document.querySelectorAll('.voteBtn');

const showVoteModal = () =>{
    modal_overlay.classList.add('d-block');
    modalVote.classList.add('d-block');
}

const hideVoteModal = () =>{
    modal_overlay.classList.remove('d-block');
    modalVote.classList.remove('d-block');
}

toggleButton.addEventListener("click", (event)=>{
    const id = event.target.getAttribute("data-toggle");
    const ul = document.querySelector(id);
    const blockStatus = ul.classList.contains('d-block');
    ul.classList.toggle('d-block', !blockStatus);
});

voteButtons.forEach(e=>e.addEventListener('click', showVoteModal));

cancelVote.addEventListener('click',hideVoteModal);

modal_overlay.addEventListener('click', ()=>{
    hideModal();
});

// modalVote.addEventListener('click', ()=>{
//     hideModal();
// });
