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
        //import('./JS/StaticComponents/Vimeo/vimeo'),
        //import('./JS/DynamicComponents/Sliders/Sliders'),
        //import('./JS/DynamicComponents/Parallax/Parallax'),
        //import('./JS/StaticComponents/backgroundLazyLoad/BackgroundLazyLoad'),
        //import('./JS/StaticComponents/Vimeo/vimeo')
    ]);

    //vimeo();
    //Sliders();
    //Parallax();
    //Backgroundlazyload();
    Main();

}

getComponents();