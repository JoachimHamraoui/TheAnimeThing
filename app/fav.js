firebase.initializeApp({
    apiKey: 'AIzaSyCkxpXHJy0ofXrLm4LVfWd0zfJsoVx1-ms',
    projectId: 'fav-anime'
});

class showFavs {
    constructor() {
        this.db = firebase.firestore();
        this.favAnimeCollection = this.db.collection("favoriete");
        this.htmlElement = document.getElementById('animewrapper');
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
            let htmlString = '';
            this.favAnimeArray.forEach(favAnimes => {
                let getData = new RenderAnime(favAnimes);
                htmlString += getData.htmlString;
            });
            this.htmlElement.innerHTML = htmlString;
        });
    }
}

class RenderAnime {
    constructor(data) {
        this.data = data;
    }

    get htmlString() {
        return `<div id="anime">
        <div class="anime-img">
            <img src="${this.data.imageURL}" alt="${this.data.title}">
        </div>
        <h2>${this.data.title}</h2>
        <h3>${this.data.startdate}</h3>
        <p>${this.data.synopsis}</p>
        <a href="${this.data.url}"  target="_blank">Meer over weten</a>
    </div>`;
    }
}

let favAnime = new showFavs();

favAnime.renderFavAnime();