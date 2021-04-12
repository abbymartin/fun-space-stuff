//fetch request
let url = 'https://abbymartin.github.io/fun-space-stuff/website/visiblestars.json'

async function readFile() {
    let response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error :( ${response.status}`);
    }
    let data = await response.json(); 
    console.log(data);

    
  }

readFile();



