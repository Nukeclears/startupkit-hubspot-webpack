const { tns } = require("tiny-slider");
const createSliders = () => {
    document.querySelectorAll('.slider').forEach(el => {
        new tns({
            container: el,
            items: 1,
            gutter: 50,
            autoplay: true,
            speed: 1000,
            mouseDrag: true,
            controls: false,
            nav: false,
            autoWidth: false,
            center: true,
            autoplayButtonOutput: false,
            responsive: {
                1024: {
                    items: 3
                }
            }
        })
    })
}

export const DefaultExport = () => {
    createSliders();
}