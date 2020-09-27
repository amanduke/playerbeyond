

// variable for the button
// document.getElementById("enter").addEventListener("click");



// function enter() {
//     onclick="location.href='news.html';";
// }


function newsFunction(){
    fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/articles/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=title:')

    .then(function(newsResponse) {
        return newsResponse.json();
    })

    .then(function(newsResponse){
        console.log(newsResponse.data[0]);
        var newsHeader = document.querySelector("#news-header");
        newsHeader.innerHTML = '';
    })
}


window.addEventListener('load', function() {
    var newsBar = document.querySelector("#news");

    newsBar.addEventListener('keyup', function(event) {
        if(event.key == 'Enter') {
            
            fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&filter=title:'
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
