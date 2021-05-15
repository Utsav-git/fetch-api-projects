//Getting the elements from html doc
searchForm = document.getElementById("searchForm");

//Adding event listeners
if(searchForm){
    searchForm.addEventListener("submit", (e) => {
        let searchText = document.getElementById("searchText").value;
        getMovies(searchText);
        e.preventDefault();
    });
}




// Functions
var getMovies = (searchText) => {
    
   fetch('https://www.omdbapi.com/?apikey=8f532db0&s='+searchText)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
         let output = "";

         data.Search.forEach((movie) => {
             output+= `
                 <div class = "col-md-3">
                     <div class = "well text-center">
                     <img src = "${movie.Poster}">
                     <h5>${movie.Title}</h5>
                     <a onclick = "movieSelected('${movie.imdbID}')" class = "btn btn-outline-warning" href = "#">Movie Details</a>
                     </div>
                 </div>
             `;
         });
         document.getElementById("movies").innerHTML =  output;
    })
    .catch((err) =>{
        console.log(err);
    })
};

var movieSelected = (id) => {

    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;

}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');   

    fetch('https://www.omdbapi.com/?apikey=8f532db0&i='+movieId)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        let output = `
            <div class = "row p-4">
                <div class = "col-md-4">
                    <img src = "${data.Poster}" class = "thumbnail">
                </div>
                <div class = "col-md-8">
                    <h2><strong>Title:</strong> ${data.Title}</h2>
                    <ul class = "list-group">
                        <li class = "list-group-item"><strong>Year : </strong>${data.Year}</li>
                        <li class = "list-group-item"><strong>Genre : </strong>${data.Genre}</li>
                        <li class = "list-group-item"><strong>Released : </strong>${data.Released}</li>
                        <li class = "list-group-item"><strong>Director : </strong>${data.Director}</li>
                        <li class = "list-group-item"><strong>Production : </strong>${data.Production}</li>
                        <li class = "list-group-item"><strong>Writer : </strong>${data.Writer}</li>
                        <li class = "list-group-item"><strong>IMDB Rating : </strong>${data.imdbRating}</li>
                        <li class = "list-group-item"><strong>Language : </strong>${data.Language}</li>
                        <li class = "list-group-item"><strong>Actors : </strong>${data.Actors}</li>
                        <li class = "list-group-item"><strong>BoxOffice : </strong>${data.BoxOffice}</li>
                    </ul>
                </div>
                <div class = "row">
                    <div class = "well">
                        <h3>Description</h3>
                        ${data.Plot}
                        <hr>

                        <a href = "http://imdb.com/title/${data.imdbID}" target = "blank" class = "btn btn-outline-primary">View more on IMDB <i class = "fas fa-chevron-circle-right"></i></a> 
                        <br>
                        <a href = "index.html" class = "btn btn-default"><i class = "fas fa-chevron-circle-left"></i> Go Back</a>
                    </div>
                
                </div>
            </div>
        `;

        document.getElementById("movie").innerHTML = output;
    })
    .catch((err) =>{
        console.log(err);
    })
}
