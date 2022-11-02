import './backgroundLazyLoad.css';

const lazyLoadBackgrounds = () => {
    let lazyloadImages = document.querySelectorAll("div.lazy");
        
    if ("IntersectionObserver" in window) {
        let imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach((image) => {
            imageObserver.observe(image);
        });
    } else {
        lazyloadImages.forEach((image) => {
            image.classList.remove("lazy");
        })
    }
}

export const DefaultExport = () => {
    lazyLoadBackgrounds();
}