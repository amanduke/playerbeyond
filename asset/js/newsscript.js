

// variable for the button
// document.getElementById("enter").addEventListener("click");



// function enter() {
//     onclick="location.href='news.html';";
// }


window.addEventListener('load', function() {
    var newsBar = document.querySelector("#news");

    newsBar.addEventListener('keyup', function(event) {
        if(event.key == 'Enter') {
            
            fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/articles/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=title:'
            + encodeURIComponent(newsBar.value)
            )
            
            
            .then(function(newsBar) {
                return newsBar.json();
 
            })
            .then(function(data) {
                console.log(data);

                var resultsName;
                var resultsRel;
                var resultsImage;
                var resultsDeck;

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

        
                fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/reviews/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=title:'
                + encodeURIComponent (newsBar.value))
                
                .then(function(results){
                    return results.json();
                    
                })

                .then(function(res) {
                    console.log(res);
                    console.log('test' + newsBar.value)

                    var resultsDes;

                    for (i = 0; i <= 5; i++){
                    resultsDes = res.results[i].body;
                    document.getElementById("description"+i).innerHTML = resultsDes;
                    }

                    
                })
            })
            // searchBar.value = "" 
        }
    });
});

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


