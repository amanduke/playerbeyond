var resultsName;
var resultsRel;
var resultsImage;
var resultsDeck;
var gamesList = [];


// local storage functions
storedGames();
// storedData();
renderGames();


// Displays the games entered by the user.
function renderGames(){
    $("#gamesList").empty();
    $("#searchInput").val("");
    console.log(gamesList+'testing')

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
    localStorage.setItem("games", JSON.stringify(gamesList));
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
        gamesList.push(resultsName);

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
// Click to clear from local storage.
$('#clear-storage').on('click', function(event){
    event.preventDefault();
    clearStorage();
});

function clearStorage() {
window.localStorage.clear();
}


