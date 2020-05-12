# TheAnimeThing

Link: https://theanimething.netlify.app/

Bugs nog aanwezig:

Heeft een pagina refresh nodig om te werken.
Soms meerdere submits nodig om te werken.
Update van render werkt niet 100%.

Joachim Hamraoui 
1MCT Groep C

Beschrijving Via Kitsu API kan je anime researchen met keywords, ze komen tevoorschijn met een banner/header, titel, jaar en korte description. Je kan verschillende anime als favoriet zetten,die “favorieten” komen daarna tevoorscchijn in de Favorites pagina. Een Trending pagina zal trending anime tonen als extra feature.


Design
![](img/basicdesign.png)


Firebase

Id: generated 
checkFavAnime: boolean 
favAnimeBanner: link to image url 
favAnimeTitle: string taken from API 
favAnimeYear: string taken from API 
favAnimeDesc: string taken from API
Externe API/Data
Data wordt gehaald via https://kitsu.docs.apiary.io/#