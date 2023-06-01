document.addEventListener("DOMContentLoaded", function() {
    var countdownElement = document.getElementById("counter");
    var endTime = localStorage.getItem("endTime");
    
    if (!endTime) {
        endTime = new Date().getTime() + (60 * 60 * 1000); // 1 hora en milisegundos
        localStorage.setItem("endTime", endTime);
    }

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = endTime - now;

        if (distance <= 0) {
            countdownElement.innerHTML = "00:00 Oferta terminada pero puede continuar registro";
            countdownElement.style.color = "gray";
            console.log("La oferta ha terminado");
            localStorage.removeItem("endTime");
        } else {
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = "Con descuento en " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + "  ¡Aprovecha OFERTA EXCLUSIVA con descuento!";
            console.log(hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));

            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
});