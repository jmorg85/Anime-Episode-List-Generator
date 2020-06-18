var api_url = ''; //url that will be used in the JSON get request

document.getElementById("search_button").addEventListener("click", getData); // For some reason, when I lift my mouse over the button, it fires the event twice

async function getData(data = {}){
    var inputValue = document.getElementById("anime").value; // The name of the anime that was put into the search bar
    var anime_name = "";

    clearTable();

    anime_name = addPerctents(inputValue); //While using the API, if an anime title has any spaces between words there needs to be a %20 in that space

    api_url = 'https://api.jikan.moe/v3/search/anime?q=' + anime_name + '&page=1';

    const response = fetch(api_url)
    .then(response => {
        return response.json();
    })

    .then(data => {
        console.log(data);

        for(var i = 10; i>-1; i--)
        {
            displayInfo(data.results[i].title, data.results[i].image_url, data.results[i].synopsis, data.results[i].mal_id);
        }
    })
}

function addPerctents(animeName){
    var splitString = animeName.split(" ");
    var anime_name= "";

    for(var i = 0; i<splitString.length; i++)
    {
        if(i == splitString.length - 1)
            {
                anime_name += splitString[i];
                break;
            }
            

        else
            anime_name += splitString[i] + "%20"
    }

    return anime_name;
}

function getEpisodes(animeId){
    var epi_url = 'https://api.jikan.moe/v3/anime/' + animeId + '/episodes';

    clearTable();

    const response_2 = fetch(epi_url)
    .then(response_2 => response_2.json())
    .then(data_2 => {
        
        data_2.episodes.forEach(function(episodes){
                addRowsAndCells(episodes.episode_id, episodes.title);
            })
    })
}

function addRowsAndCells(episodeNumber, episodeName){
    var table = document.getElementById("table_2");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = episodeNumber;
    cell2.innerHTML = episodeName;
}

function clearTable(){
    var tableRows = document.getElementById("table_2").getElementsByTagName('tr');
    var rowNumbers = tableRows.length;

    for(var i = document.getElementById("table_2").rows.length;i>0;i--)
    {
        document.getElementById("table_2").deleteRow(i-1);
    }
}

function displayInfo(anime_name, anime_cover_url, anime_synopsis, anime_id){
    var table = document.getElementById("table_2");
    var row_1 = table.insertRow(0);
    var animeImage = row_1.insertCell(0);
    var nameAndSynopsis = row_1.insertCell(1);
    
    animeImage.innerHTML = "<img src='" + anime_cover_url + "'>";
    nameAndSynopsis.innerHTML = `<table style = "border: 1px solid black"><tr><td style="color:blue" id="${anime_name}"> ${anime_name}</td></tr><br><br><br><tr><td>${anime_synopsis}</td></tr></table>`;

    document.body.addEventListener("click", function(event)
    {
        if(event.srcElement.id == anime_name){
            getEpisodes(anime_id);
        }
    })
}