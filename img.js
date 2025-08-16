document.addEventListener('DOMContentLoaded', function() {
    const imgInner = document.getElementById('in');
    const imgOuter = document.getElementById('out');

    const images = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg'
    ];

    function getRandomImage(excludeIndex = -1) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * images.length);
        } while (excludeIndex !== -1 && randomIndex === excludeIndex);
        return randomIndex;
    }

    if (imgOuter && imgInner && images.length > 0) {
        const outerIndex = getRandomImage();
        imgOuter.src = images[outerIndex];
        imgInner.src = images[getRandomImage(outerIndex)];
    } else {
        console.error("Error: Elementos de imagen no encontrados o sin imágenes disponibles.");
    }
});

const hoverImages = document.querySelectorAll('.gif-hover');

hoverImages.forEach(img => {
    let originalSrc = img.src;
    let gifSrc = img.dataset.gif;
    
    // Precargar el GIF
    const preload = new Image();
    preload.src = gifSrc;
    
    img.addEventListener('mouseenter', () => {
        img.style.transition = 'opacity 0.5s';
        img.src = gifSrc;
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transition = 'opacity 0.5s';
        img.src = originalSrc;
    });
});