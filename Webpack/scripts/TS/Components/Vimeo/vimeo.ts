const vimeoCreation = async () => {
    const vimeoEmbeds : NodeListOf<HTMLElement> = document.querySelectorAll('.vimeoEmbed');

    if (vimeoEmbeds && vimeoEmbeds.length > 0) {
        const { default: Player } = await import('@vimeo/player');

        vimeoEmbeds.forEach(currentvideo => {
            const dataVimeoID = +currentvideo.dataset.vimeoid;
            const dataBackgroundVideo = (currentvideo.dataset.background === 'true');
            const dataControls = (currentvideo.dataset.controls === 'true');

            const options = {
                id: dataVimeoID,
                responsive: true,
                background: dataBackgroundVideo,
                controls: dataControls,
            };

            new Player(currentvideo, options);
            
        });
    }
}

export const DefaultExport = () => {
    vimeoCreation();
}