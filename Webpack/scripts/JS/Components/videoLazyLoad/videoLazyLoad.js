const videolazyloader = () => {
    var lazyVideos = document.querySelectorAll("video.lazy");
      
    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }
      
                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });
      
        lazyVideos.forEach((lazyVideo) => {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
}

export const DefaultExport = () => {
    videolazyloader();
}