const toggleButton = document.querySelector("button.toggler");

toggleButton.addEventListener("click", (event)=>{
    const id = event.target.getAttribute("data-toggle");
    const ul = document.querySelector(id);
    const blockStatus = ul.classList.contains('d-block');
    ul.classList.toggle('d-block', !blockStatus);
});