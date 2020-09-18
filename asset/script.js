
fetch('https://api-v3.igdb.com/user-key?q=21bc044a492256eb1717ed91dd67cbc1')

.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
})

// fetch('https://api-v3.igdb.com/games?q=&api_key=21bc044a492256eb1717ed91dd67cbc1')

// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     console.log(data);
// })
