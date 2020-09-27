var resultsName;
var resultsRel;
var resultsImage;
var resultsDeck;
var gamesList = [];


// local storage functions
storedGames();
storedData();


// Displays the games entered by the user.
function renderGames(){
    $("#gamesList").empty();
    $("#searchInput").val("");
    console.log(gamesList)

    for (i=0; i<gamesList.length; i++){
        var a = $("<a>");
        a.addClass("listGroup")
        a.attr("dataName", gamesList[i]);
        a.text(gamesList[i]);
        $("#gamesList").prepend(a);
    }

}
// Pulls the games lists from local storage
function storedGames() {
    var storedGames = JSON.parse(localStorage.getItem("games"));

    if (storedGames !== null) {
        gamesList = storedGames;
    }
    renderGames();
}

// Searches added to local storage and display searches. 
function storedData() {
    var storedData = JSON.parse(localStorage.getItem("currentGame"));

    if (storedData !== null) {
        resultsName = storedData;
  
    }
    displayGames();
}

// Saves the games array to local storage
function storedGamesArray() {
    localStorage.setItem("gamesInput", JSON.stringify(gamesList));
}

// Saves the currently display games to local storage
function storedCurrentGames() {
    localStorage.setItem("currentGame", JSON.stringify(resultsName))
}

// Click the event handler for game search button
$("#gameSearchBtn").on("click", function(event){
    event.preventDefault();

    resultsName = $("#gamesInput")
    .val()
    .trim();
    if(resultsName === ""){
        var message = document.getElementById('message');
        message.innerText = 'Please enter a game or series to look up';

    }else if (gamesList.length >= 5){
        gamesList.shift();
        gamesList.push(cityName);

    }else{
        gamesList.push(resultsName);
    }
    storedCurrentGames();
    storedGamesArray();
    renderGames();
    displayGames();

});

// Event handler if the user hits enter after clicking the games search term.
$("gamesInput").keypress(function(e){
    if(e.which == 6){
        $("#gamesSearchBtn").click();
    }
})

function displayGames() {
    var searchBar = document.querySelector("#gamesInput");
    
    searchBar.addEventListener('keyup', function(event) {
        if(event.key == 'Enter') {
            
            fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=name:'
            + encodeURIComponent(searchBar.value)
            )
            
            
            .then(function(searchBar) {
                return searchBar.json();
 
            })
            .then(function(data) {
                console.log(data);

                gamesList.push(searchBar.value);
                console.log(gamesList)

                for (i = 0; i <= 5; i++) {
                    resultsName = data.results[i].name;
                    document.getElementById("name"+i).innerHTML = resultsName;
                    resultsRel = data.results[i].release_date;
                    document.getElementById("release"+i).innerHTML = resultsRel;
                    resultsImage = data.results[i].image.original;
                    document.getElementById("image"+i).innerHTML = `<img src = ` + resultsImage + `>`;
                    resultsDeck = data.results[i].deck;
                    document.getElementById("deck"+i).innerHTML = resultsDeck;
                }
                storedGamesArray();
                renderGames();
                
                fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=title:'
                + encodeURIComponent (searchBar.value))
                
                .then(function(results){
                    return results.json();
                    
                })

                .then(function(res) {
                    console.log(res);
                    console.log('test' + searchBar.value)

                    var resultsDes;

                    for (i = 0; i <= 5; i++){
                    resultsDes = res.results[i].body;
                    document.getElementById("description"+i).innerHTML = resultsDes;
                    }

                    
                })
            })
            
        }
        
    });
    
};



// When the page load the games from local strage are displayed. 
window.addEventListener('load', displayGames);
       

// Passes the games into the history list to the displayGames function
function historyDisplayGames(){
    resultsName = $(this).attr("dataName");
    displayGames();
    console.log(resultsName);

}

//   fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'user-key': '21bc044a492256eb1717ed91dd67cbc1'
//     },
//     body:
//       'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
//   })
//     .then(data => data.json())
//     .then(response => console.log(response));



    // fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'user-key': '21bc044a492256eb1717ed91dd67cbc1'
    //   },
    //   body: 'search "fallout"; '
    // })
    //   .then(data => data.json())
    //   .then(response => console.log(response));

    // &filter=name:skyrim


// fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=name:' 
// + searchBar + 'd5f9d95899dd3f623ef0db6a138808c83f7967cd')



// fetch("https://cors-anywhere.herokuapp.com/https://whatoplay.p.rapidapi.com/game/?game_id=%3Crequired%3E", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "whatoplay.p.rapidapi.com",
// 		"x-rapidapi-key": "6163485b7bmsh9693ebb0587cf03p1d5ee0jsn4d2061252a39"
// 	}
// })
// .then(function(response) {
//   return response.json();
// })
// .then(function(data) {
//   console.log(data);
// })
// .catch(err => {
// 	console.log(err);
// });


