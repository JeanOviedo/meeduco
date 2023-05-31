
let accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    let title = item.querySelector('.accordion-title');
    let content = item.querySelector('.accordion-content');

    title.addEventListener('click', () => {
        content.classList.toggle('active');
    });
});


let toggles = document.getElementsByClassName('toggle');

        Array.prototype.forEach.call(toggles, function(toggle) {
            toggle.addEventListener('click', function() {
                this.classList.toggle('toggle_open');
                var content = this.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
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


