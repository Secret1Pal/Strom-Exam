export default {
    mounted(el) {
        el.classList.add("lazy");

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.src = el.dataset.src;
                    el.classList.remove("lazy");
                    el.classList.add("lazy-loaded");
                    observer.unobserve(el);
                }
            });
        });

        observer.observe(el);
    }
};
