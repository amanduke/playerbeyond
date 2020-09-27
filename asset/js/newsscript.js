

// variable for the button
// document.getElementById("enter").addEventListener("click");



// function enter() {
//     onclick="location.href='news.html';";
// }

document.getElementById("latestNews").onclick = function() {newsFunction()};

function newsFunction(){
    fetch('https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/articles/?api_key=d5f9d95899dd3f623ef0db6a138808c83f7967cd&format=json&sort=publish_date:desc')

    .then(function(newsResponse) {
        return newsResponse.json();
    })

    .then(function(newsResponse){
        console.log(newsResponse)
        console.log(newsResponse.results[0]);


        var resultsNewsTitle;
        var resultsNewsDate;
        var resultsNewsImage;
        var resultsNewsBody;

        for (i = 0; i <= 5; i++) {
            resultsNewsTitle = newsResponse.results[i].title;
            document.getElementById("news-title"+i).innerHTML = resultsNewsTitle;
            resultsNewsDate = newsResponse.results[i].publish_date;
            document.getElementById("news-date"+i).innerHTML = resultsNewsDate;
            resultsNewsImage = newsResponse.results[i].image.original;
            document.getElementById("news-image"+i).innerHTML = `<img src = ` + resultsNewsImage + `>`;
            resultsNewsBody = newsResponse.results[i].body;
            document.getElementById("news-body"+i).innerHTML = resultsNewsBody;
        }
    })
}
