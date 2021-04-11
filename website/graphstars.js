//open json file at ../data/visiblestarsjson.json to use in js
console.log("test");

//fetch request
function readFile(file) {
    fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error :( " + response.status);
        }
        return response.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch(function () {
        this.dataError = true;
    })
 }
//print data 
readFile('https://abbymartin.github.io/fun-space-stuff/data/visiblestarsjson.json');

//add stuff to scene