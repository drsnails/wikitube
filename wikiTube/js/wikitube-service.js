'use strict'

const YT_API_KEY = 'AIzaSyClvVGGjrueg0wXTOwhrtBxbgwCRK1caLc'
const gVideosAmount = 25
var gVideos;


function getVideos(searchVal) {
    if (!localStorage[searchVal]) {
        return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${gVideosAmount}&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchVal}`)
            .then(res => {
                let data = res.data
                let videos = data.items
                saveToStorage(searchVal, videos)
                return Promise.all(videos)
            })
    } else {
        let videos = loadFromStorage(searchVal)
        return Promise.all(videos)
    }
}




function getVideoDetails(video) {
    const {id, snippet} = video
    const {title, thumbnails} = snippet

    const videoId = id.videoId
    const thumbnail = thumbnails.default.url
    return {videoId, title, thumbnail}
}

function getWiki(searchVal) {
    const WIKI_KEY = searchVal+'wiki'
    if (!localStorage[WIKI_KEY]) {
        return axios.get(`https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&list=search&%20srsearch=${searchVal}`)
            .then(res => {
                let data = res.data
                let wikiResults = data.query.search
                saveToStorage(WIKI_KEY, wikiResults)
                return Promise.all(wikiResults)
                
                
            })
    } else {
        let wikiResults = loadFromStorage(WIKI_KEY)
        return Promise.all(wikiResults)
    }
}



function getValidFormatWord(str) {
    let strArr = Array.from(str)
    let formatedArr = strArr.map(letter => {
        if (letter === ' ') return '_'
        return letter
    })
    return formatedArr.reduce((letter1, letter2) => {
        return letter1 + letter2
    },'')
}

