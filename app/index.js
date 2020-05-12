'use strict';

firebase.initializeApp({
    apiKey: 'AIzaSyCkxpXHJy0ofXrLm4LVfWd0zfJsoVx1-ms',
    projectId: 'fav-anime'
});

class InitializeFirebase {
    constructor() {
        this.db = firebase.firestore();
        this.favAnimeCollection = this.db.collection("favoriete");
    }

    convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
    }));

    renderFavAnime() {
        this.favAnimeCollection.onSnapshot((querySnapshot) => {
            // deze callback wordt elke keer als de data veranderd terug uitgevoerd
            this.favAnimeArray = this.convertQuerySnapshotToRegularArray(querySnapshot);
            console.log(this.favAnimeArray);
        });
    }

    addAnime() {
        console.log(newAnime.searchResults[0]);
        this.favAnimeCollection.add({
            createdAt: new Date(),
            title: newAnime.searchResults[0].title,
            synopsis: newAnime.searchResults[0].synopsis,
            url: newAnime.searchResults[0].url,
            imageURL: newAnime.searchResults[0].image_url,
            startdate: newAnime.searchResults[0].start_date
        });
    }
}

let dbFavAnime = new InitializeFirebase();
dbFavAnime.renderFavAnime();

class AnimeList extends InitializeFirebase {
    constructor() {
        super();
        this.baseURL = 'https://api.jikan.moe/v3';
        this.formElement = document.getElementById('searchanime');
        this.formElementSubmit = document.getElementById('submitbtn');
        this.htmlElement = document.getElementById('animewrapper');
    }
    async init() {
        await this.fetch(this.formElement.value);
        // this.bindEvents();
    }

    async fetch(anime) {
        this.formElement = document.getElementById('searchanime');
        let response = await fetch(`${this.baseURL}/search/anime?q=${anime}&page=1`);
        let json = await response.json();
        this.searchResults = json.results;
    }
    getSearchedAnime(event) {
        event.preventDefault();
        console.log(`${this.baseURL}/search/anime?q=${this.formElement.value}&page=1`);
        // console.log(this.formElement.value);
        this.render();
        this.fetch();
        super.addAnime();
    }

    render() {
        let htmlString = '';
        this.formElement = this.formElement;

        // if (htmlString === '') {
        //     this.searchResults.forEach(anime => {
        //         const searchInstance = new RenderSearch(anime);
        //         htmlString += searchInstance.htmlString;
        //     });
        //     this.htmlElement.innerHTML = htmlString;
        // } else if (htmlString !== '') {
        //     htmlString = '';
        //     this.searchResults.forEach(anime => {
        //         const searchInstance = new RenderSearch(anime);
        //         htmlString += searchInstance.htmlString;
        //     });
        //     this.htmlElement.innerHTML = htmlString;
        // }

        if (htmlString.length == 0) {
            this.searchResults.forEach(anime => {
                // console.log('wesh');
                let searchInstance = new RenderSearch(anime);
                htmlString += searchInstance.htmlString;
            });
            this.htmlElement.innerHTML = htmlString;
            // console.log(htmlString);
        } else {
            // location.reload();
            // console.log('yeah stfu');
            this.searchResults.forEach(anime => {
                let searchInstance = new RenderSearch(anime);
                htmlString += searchInstance.htmlString;
            });
            this.htmlElement.innerHTML = htmlString;
        }
    }

    bindEvents() {
        this.formElementSubmit.addEventListener('click', this.getSearchedAnime.bind(this));
    }
}



class RenderSearch {
    constructor(data) {
        this.data = data;
    }

    get htmlString() {
        return `<div id="anime">
        <div class="anime-img">
            <img src="${this.data.image_url}" alt="${this.data.title}">
        </div>
        <h2>${this.data.title}</h2>
        <h3>${this.data.start_date}</h3>
        <p>${this.data.synopsis}
        </p>
        <a href="${this.data.url}" target="_blank">Meer over weten</a>
        <button href="#" value="${this.data.mal_id}" class="addFav">Favoriet</button>
    </div>`;
    }
}

const newAnime = new AnimeList();
newAnime.init();
newAnime.bindEvents();