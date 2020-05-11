'use strict';

class AnimeList {
    constructor(searchValue) {
        this.baseURL = 'https://api.jikan.moe/v3';
        this.searchValue = searchValue;
        this.formElement = document.getElementById('searchanime');
        this.formElementSubmit = document.getElementById('submitbtn');
        this.htmlElement = document.getElementById('animewrapper');
        // console.log(this.formElement);
        // console.log(this.htmlElement);
        // this.bindEvents();
    }
    async init() {
        await this.fetch();
        this.bindEvents();
    }

    async fetch() {
        let response = await fetch(`${this.baseURL}/search/anime?q=${this.formElement.value}&page=1`);
        let json = await response.json();
        this.searchResults = json.results;
        console.log(json.results);
        // console.log(this.searchResults);
    }
    getSearchedAnime(event) {
        event.preventDefault();
        console.log(`${this.baseURL}/search/anime?q=${this.formElement.value}&page=1`);
        // searchResults = this.searchResults;
        this.render();
    }

    render() {
        let htmlString = '';
        this.searchResults.forEach(anime => {
            let searchInstance = new RenderSearch(anime);
            htmlString += searchInstance.htmlString;
        });
        this.htmlElement.innerHTML = htmlString;
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
        <a href="${this.data.url}">Meer over weten</a>
    </div>`;
    }
}

const newAnime = new AnimeList(this.formElement);
newAnime.init();
newAnime.bindEvents();