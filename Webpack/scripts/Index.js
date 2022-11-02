//eslint-disable-next-line
const regeneratorRuntime = require("regenerator-runtime");

const getComponents = async () => {
    const [{ DefaultExport: Main },
        //{ DefaultExport: vimeo },
        //{ DefaultExport: Sliders },
        //{ DefaultExport: Parallax },
        //{ DefaultExport: Backgroundlazyload },
    ] = await Promise.all([
        import('./JS/Main'),
        //import('./JS/Components/Vimeo/vimeo'),
        //import('./JS/Components/Sliders/Sliders'),
        //import('./JS/Components/Parallax/Parallax'),
        //import('./JS/Components/backgroundLazyLoad/BackgroundLazyLoad'),
        //import('./JS/Components/Vimeo/vimeo')
    ]);

    //vimeo();
    //Sliders();
    //Parallax();
    //Backgroundlazyload();
    Main();

}

getComponents();