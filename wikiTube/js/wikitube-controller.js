var gSearchBy = 'Alfred Jodocus Kwak'
document.body.addEventListener('keypress', event => {
    if (event.keyCode===13) {
        onSearch()
    }
})


function initVideos() {
    getVideos(gSearchBy)
        .then(videos => {
            let firstVidId = videos[0].id.videoId
            renderEmbVideo(firstVidId)
            renderVideos(videos)
            return getWiki(gSearchBy)
        })
        .then(wikis => {
            renderWikis(wikis)
        })
}

function renderVideos(videos) {
    let strHTMLs = videos.map(video => {
        const { videoId, title, thumbnail } = getVideoDetails(video)
        return `
                <div onclick="onChangeVideo('${videoId}')" class="video-card">
                    <img class="video-thumbnail" src="${thumbnail}" alt="">
                    <section class="video-title">${title}</section>
                </div>`
    })
    document.querySelector('.videos-container').innerHTML = strHTMLs.join('');

}

function renderEmbVideo(videoId) {
    let strHTML = `
    <iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    `
    document.querySelector('.main-video').innerHTML = strHTML;
}

function renderWikis(wikis) {
    let strHTMLs = wikis.map(wiki => {
        return `
            <div class="wiki-result">
                <a href="https://en.wikipedia.org/wiki/${getValidFormatWord(wiki.title)}" target="_blank">
                    <h1>${wiki.title}</h1>
                    <p>
                        ...${wiki.snippet}...
                    </p>
                </a>
            </div>`
    })
    
    document.querySelector('.wiki-container').innerHTML = strHTMLs.join('');
}

function onChangeVideo(videoId) {
    renderEmbVideo(videoId)
}

function onSearch() {
    searchVal = document.querySelector('.search-input').value;
    if (!searchVal) return
    gSearchBy = searchVal
    initVideos()

}