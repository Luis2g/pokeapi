const retrievePokemons =  () => {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let screenOne = document.getElementById("screenOne");

        
        data.results.map( async pokemon => {
            
            let divOne = document.createElement('div');
            divOne.innerText = pokemon.name;

            await fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                

                // "<div class='card' style='width: 18rem;'>"
                // +"<img src='' class='card-img-top' alt="...">"
                // <div class="card-body">
                //     <h5 class="card-title">Card title</h5>
                //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                //     <a href="#" class="btn btn-primary">Go somewhere</a>
                // </div>
                // </div>"



                console.log(data);

                let divTwo = document.createElement('div');
                let imageElement = document.createElement('img');

                console.log("Below the image");
                console.log(data.sprites.other['official-artwork'].front_default);


                imageElement.setAttribute('src', data.sprites.other['official-artwork'].front_default);

                divTwo.appendChild(imageElement);

                divOne.appendChild(divTwo);

            
            });



            screenOne.appendChild(divOne);

            console.log(pokemon);
        });
    });
}
