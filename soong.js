// --- Elementos del DOM ---
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');
const musicLoader = document.querySelector('.music-loader');

// Elementos de volumen
const volumeIcon = document.getElementById('volumeIcon');
const volumeSlider = document.getElementById('volumeSlider');

// --- Variables de Estado ---
let isPlaying = false;
let currentSongIndex = 0;
let lastVolume = 1; // Guarda el último volumen antes de mutear

// --- Lista de Canciones ---
const songs = [
    {
        name: "Cucaracha con Autotune",
        artist: "Desconocido",
        src: "./song/cucaracha con autotune (letra).mp3"
    },

     {
        name: "Do I Wanna Know?",
        artist: "Arctic Monkeys",
        src: "./song/Arctic Monkeys - Do I Wanna Know_ (Official Video).mp3"
    },
    
];

// --- Funciones del Reproductor ---

// Función para cargar una canción
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = `${song.name} - ${song.artist || 'Artista Desconocido'}`;
    audioPlayer.load();
}

// Función para actualizar el tiempo y la barra de progreso
function updateProgressBar() {
    const { duration, currentTime } = audioPlayer;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeSpan.textContent = formatTime(currentTime);
        totalTimeSpan.textContent = formatTime(duration);
    }
}

// Función para formatear el tiempo
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para reproducir o pausar
function playPauseSong() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play()
            .catch(error => {
                console.error("Error al reproducir:", error);
                alert("Por favor, haz clic en el botón de reproducción.");
                isPlaying = false;
                playPauseBtn.className = 'fas fa-play';
                musicLoader.style.display = 'none';
            });
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

// Función para actualizar el ícono de play/pause
function updatePlayPauseIcon() {
    if (isPlaying) {
        playPauseBtn.className = 'fas fa-pause';
        musicLoader.style.display = 'flex';
    } else {
        playPauseBtn.className = 'fas fa-play';
        musicLoader.style.display = 'none';
    }
}

// Función para manejar el volumen
function handleVolumeChange() {
    const volume = volumeSlider.value;
    audioPlayer.volume = volume;
    
    // Actualiza el ícono según el volumen
    if (volume == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
    
    // Guarda el último volumen (para la función de mute)
    if (volume > 0) {
        lastVolume = volume;
    }
}

// Función para alternar mute
function toggleMute() {
    if (audioPlayer.volume > 0) {
        // Mute
        lastVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.className = 'fas fa-volume-mute';
    } else {
        // Unmute
        audioPlayer.volume = lastVolume;
        volumeSlider.value = lastVolume;
        volumeIcon.className = lastVolume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
    }
}

// --- Event Listeners ---
playPauseBtn.addEventListener('click', playPauseSong);

// Barra de progreso
audioPlayer.addEventListener('timeupdate', updateProgressBar);
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeSpan.textContent = formatTime(audioPlayer.duration);
});

// Final de canción
audioPlayer.addEventListener('ended', () => {
    currentSongIndex++;
    if (currentSongIndex < songs.length) {
        loadSong(currentSongIndex);
        if (isPlaying) audioPlayer.play();
    } else {
        currentSongIndex = 0;
        loadSong(currentSongIndex);
        isPlaying = false;
        updatePlayPauseIcon();
    }
});

// Botones de navegación
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audioPlayer.play();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audioPlayer.play();
});

// Control de volumen
volumeSlider.addEventListener('input', handleVolumeChange);
volumeIcon.addEventListener('click', toggleMute);

// --- Inicialización ---
loadSong(currentSongIndex);
musicLoader.style.display = 'none';
audioPlayer.volume = volumeSlider.value; // Establece el volumen inicial