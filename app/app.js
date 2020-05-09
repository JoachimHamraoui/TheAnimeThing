'use strict';

class AnimeList {
    constructor(searchValue) {
        this.baseURL = 'https://api.jikan.moe/v3';
        this.searchValue = searchValue;
        this.formElement = document.getElementById('searchanime');
        this.formElementSubmit = document.getElementById('submitbtn');
        console.log(this.formElement);
        // this.bindEvents();
    }
    async init() {
        await this.fetch();
        this.bindEvents();
        // this.render();
    }

    async fetch() {
        const response = await fetch(`${this.baseURL}/search/anime?q=${this.formElement.value}&page=1`);
        const json = await response.json();
        this.searchResults = json.results;
    }
    getSearchedAnime(event) {
        // console.log(this.formElement);
        event.preventDefault();
        console.log(`${this.baseURL}/search/anime?q=${this.formElement.value}&page=1`);
        this.searchResults = this.searchResults;
        this.render();
    }

    render() {
        let htmlString = '';
        this.searchResults.forEach(anime => {
            htmlString += anime.htmlString;
        })
    }

    bindEvents() {
        this.formElementSubmit.addEventListener('click', this.getSearchedAnime.bind(this));
    }
}

const newAnime = new AnimeList(this.formElement);
newAnime.init();
newAnime.bindEvents();