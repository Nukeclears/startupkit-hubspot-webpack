const simpleParallax = require('simple-parallax-js');

const createParallax = () => {
    const createCasesParallax = () => {
        const caseParallax = document.querySelectorAll(".parallax");
        const drawerContent = document.querySelector(".drawer-content");
        const scrollContainer = drawerContent != null ? drawerContent : document.querySelector("html");
        if (caseParallax != undefined) {
            caseParallax.forEach((element) => {
                new simpleParallax(element, {
                    orientation: 'up',
                    customContainer: scrollContainer,
                    overflow: true,
                    scale: 1.4
                });
            });
        }
    }

    createCasesParallax();
}

export const DefaultExport = () => {
    createParallax();
}