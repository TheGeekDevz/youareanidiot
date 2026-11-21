/* [Nov 2026] Versión Segura Optimizada - Clic Universal, Barra Espaciadora y Altavoz Fijo */
window.addEventListener('load', iniciarPagina);

function iniciarPagina() {
    // DETECTOR DE CLIC UNIVERSAL: Cualquier clic en la pantalla controla el sonido
    document.addEventListener('click', musicPlay);

    // DETECTOR DE TECLADO: Permite usar la barra espaciadora para alternar el sonido
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.key === ' ') {
            event.preventDefault(); // Evita desplazamientos o clics accidentales en enlaces enfocados
            musicPlay();
        }
    });

    // El sitio inicia estrictamente silenciado por seguridad
    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');
    
    if (audio) {
        audio.muted = true;
        if (micon) {
            micon.src = "images/speakerm.png"; // Empieza con el icono tachado
            micon.style.width = "50px";        // Asegura el tamaño pequeño al iniciar
        }
    }
}

function musicPlay(event) {
    // PROTECCIÓN DE ENLACES: Si el usuario hace clic en un enlace (<a>), no activa el sonido
    if (event && event.type === 'click' && event.target && event.target.closest('a')) {
        return;
    }

    var audio = document.getElementById('youare-audio');
    var micon = document.getElementById('youare-micon');
    
    if (audio) {
        // SI YA ESTÁ SONANDO: Se pausa, se reinicia y se silencia
        if (!audio.muted && !audio.paused) {
            audio.pause();             
            audio.currentTime = 0;     
            audio.muted = true;        
            if (micon) {
                micon.src = "images/speakerm.png"; // Cambia al icono en silencio
                micon.style.width = "50px";        // Mantiene el tamaño en 50px
            }
        } 
        // SI ESTÁ EN SILENCIO: Se activa desde el principio
        else {
            audio.muted = false;
            audio.currentTime = 0;     
            audio.play().catch(function(error) {
                console.log("El navegador bloqueó la reproducción automática: ", error);
            });
            if (micon) {
                micon.src = "images/speaker.png";  // Cambia al icono con sonido activo
                micon.style.width = "50px";        // Mantiene el tamaño en 50px
            }
        }
    }
}
