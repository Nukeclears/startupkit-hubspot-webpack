import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'

const createSliders = () => {
    document.querySelectorAll('.blaze-slider').forEach(el => {
        new BlazeSlider(el, {
            all: {
                enableAutoplay: true,
                autoplayInterval: 2500,
                transitionDuration: 700,
                slidesToShow: 3,
                slideGap: '50px',
            },
            '(max-width: 1000px)': {
                slidesToShow: 2,
            },
            '(max-width: 700px)': {
                slidesToShow: 1,
            },
        })
    })
}

export const DefaultExport = () => {
    createSliders();
}