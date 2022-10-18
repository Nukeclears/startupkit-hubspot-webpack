const { tns } = require("tiny-slider");
import './tiny-slider.css';

const createSliders = () => {
    const createImageSlider = () => {
        const imageSlider = document.querySelectorAll(".imageSlider");
        if (imageSlider != undefined) {
            imageSlider.forEach((element) => {
                new tns({
                    container: element,
                    items: 3,
                    gutter: 0,
                    autoWidth: true,
                    center: true,
                    mouseDrag: true,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout: 2500,
                    speed: 750,
                    controls: false,
                    autoplayButtonOutput: false,
                });
            });
        }
    }
    createImageSlider();
}

export const DefaultExport = () => {
    createSliders();
}