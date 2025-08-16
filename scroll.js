// scroll-animations.js

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, /* El viewport es el elemento raíz que se observa */
        rootMargin: '0px', /* Margen alrededor del root */
        threshold: 0.1 /* Porcentaje del elemento que debe ser visible para que se active (10%) */
    };

    // Crea una instancia de IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'is-visible'
                entry.target.classList.add('is-visible');
                // Opcional: deja de observar el elemento una vez que se ha animado
                // Esto es útil si quieres que la animación solo ocurra una vez.
                observer.unobserve(entry.target); 
            } 
            // Si quieres que la animación se reinicie cada vez que el elemento sale
            // y vuelve a entrar, puedes descomentar el siguiente 'else':
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, observerOptions);

    // Selecciona todos los elementos con la clase 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Observa cada uno de los elementos
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});