let defaultUrl = "https://pokeapi.co/api/v2/pokemon";
let nextUrl = undefined;
let previousUrl = undefined;



const next = () => {
    retrievePokemons(nextUrl);
}

const previous = () => {
    retrievePokemons(previousUrl);
}



const retrievePokemons = ( urlIn ) => {

    let url = urlIn === undefined ? defaultUrl : urlIn;

    fetch(url)
    .then(response => response.json())
    .then(data => {

        let screenOne = document.getElementById("screenOne");
        let card = "<div class='row d-flex justify-content-center'>";

        let mainPaginador = document.getElementById('mainPaginador');
        let paginador = document.getElementById('paginador');
        mainPaginador.removeChild(paginador);
        paginador = document.createElement('div');
        paginador.setAttribute('id', 'paginador');
        mainPaginador.appendChild(paginador);


        if(data.previous !== null){
            previousUrl = data.previous;
            let previous = document.createElement("button");
            previous.setAttribute('onclick',"previous()"); 
            previous.setAttribute('class',"btn btn-outline-warning"); 
            previous.setAttribute("style", "margin: 5px");
            previous.innerText = 'Anterior';
            paginador.appendChild(previous);
        }

        let next = document.createElement("button");
        nextUrl = data.next;
        next.setAttribute('onclick', 'next()'); 
        next.setAttribute('class',"btn btn-outline-success"); 
        next.setAttribute("style", "margin: 5px");
        next.innerText = 'Siguiente';

        paginador.appendChild(next);


        data.results.map( async pokemon => {

            await fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {

                console.log(data);
                
                let abilittiesString = "";
                let counter = 1;


                data.abilities.map( attribute => {
                    abilittiesString += "<p class='card-text'> " + counter + "- " + attribute.ability.name +"</p>";
                    counter ++;
                });

                card += "<div class='card shadow m-2' style='width: 18rem;'>" +
                            "<img src='" + data.sprites.other['official-artwork'].front_default + "' class='card-img-top' alt='...'>" +
                            "<div class='card-body'>" +
                                "<h5 class='card-title'> <span class='fs-4' >Nombre:</span class='text-muted' >  "+ pokemon.name +"</h5>" +
                                "<h1 class='card-title fw-light '>Habilidades</h1>" +
                                abilittiesString +
                            "</div>" +
                        "</div>"

                screenOne.innerHTML = card;
            });

        });
    });
    screenOne.innerHTML = '</div>'
}


