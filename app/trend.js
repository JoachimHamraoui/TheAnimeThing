'use strict';

class TopAnime {
    constructor() {
        this.baseURL = 'https://api.jikan.moe/v3';
        this.htmlElement = document.getElementById('animewrapper');
    }
    async init() {
        await this.fetch();
        this.render();
    }

    async fetch() {
        let response = await fetch(`${this.baseURL}/top/anime`);
        let json = await response.json();
        this.topResults = json.top;
        console.log(this.topResults);
    }

    render() {
        let htmlString = '';
        this.formElement = this.formElement;
        this.topResults.forEach(anime => {
            const searchInstance = new RenderAnime(anime);
            htmlString += searchInstance.htmlString;
        });
        this.htmlElement.innerHTML = htmlString;
    }

}



class RenderAnime {
    constructor(data) {
        this.data = data;
    }

    get htmlString() {
        return `<div id="anime">
        <div class="anime-img">
            <img src="${this.data.image_url}" alt="${this.data.title}">
        </div>
        <h2>${this.data.rank}. ${this.data.title}</h2>
        <h3>${this.data.start_date}</h3>
        <a href="${this.data.url}"  target="_blank">Meer over weten</a>
    </div>`;
    }
}

const newAnime = new TopAnime();
newAnime.init();