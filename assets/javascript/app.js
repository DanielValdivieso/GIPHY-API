$(document).ready(function() {
    
    var topics = ["Lost in Space", "The Rain", "The Angry Birds", "Travelers", "Pixels", "Estocolmo", "Kung Fu Panda"];

    var newArtist
    
    function showButtons()  {
        $("#button-place").empty();
        for (i=0; i < topics.length; i++) {

            var buttons = $("<button>");
            buttons.addClass("name-to-click");
            buttons.attr("data-name", topics[i]);
            buttons.text(topics[i]);

            $("#button-place").append(buttons);
        }
    }
    showButtons()

    // Function for adding new movie to list of buttons
    function addMovie(){
        newMovie = $("#new-movie").val();
        topics.push(newMovie);
        showButtons()
    }

    // adding event listener for the submit button
    $('#confirm-movie').on('click', function(event){
        event.preventDefault();
        addMovie()
    })

    // function for adding the gifs to the page
    $(document).on('click', '.name-to-click', function(){

        var movies = $(this).attr("data-name");
        var moviesURL = encodeURIComponent(movies.trim());
        var apiKey = "GTlgqcDw3MjuYJizfiTFuoYyyvShaW0a";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + moviesURL + "&api_key=" + apiKey + "&limit=10";
        console.log(queryURL)
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            var data = response.data

            for (i=0; i < data.length; i++) {

                var divImage = $("<div class='image-place'>")

                var rating = data[i].rating;
                var textLine = $("<p>").text("Rating:" + rating);
                var gifImage = $("<img>");

                gifImage.attr("src", data[i].images.fixed_width_downsampled.url);
                gifImage.attr("alt", "gif image");
                divImage.append(gifImage);
                divImage.append(rating);
                $("#gif-place").append(divImage);
            }
        })
    })
});