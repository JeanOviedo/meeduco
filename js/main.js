
let accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    let title = item.querySelector('.accordion-title');
    let content = item.querySelector('.accordion-content');

    title.addEventListener('click', () => {
        content.classList.toggle('active');
    });
});

let menu = document.querySelector("#menu-btn")
let navbar = document.querySelector(".navbar")


menu.onclick = () =>{
    menu.classList.toggle("fa-times")
    navbar.classList.toggle("active")
}


window.onscroll = () =>{
    menu.classList.remove("fa-times")
    navbar.classList.remove("active")
}


