$(document).ready(function() {
    
    var topics = ["Vincent van Gogh", "Pablo Picasso", "Rembrandt van Rijn", "Damien Hirst", "Francis Bacon", "Leonardo da Vinci", "Caravaggio"];

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

    // Function for adding new artist to list of buttons
    function addArtist(){
        newArtist = $("#new-artist").val();
        topics.push(newArtist);
        showButtons()
    }

    // adding event listener for the submit button
    $('#confirm-artist').on('click', function(event){
        event.preventDefault();
        addArtist()
    })

    // function for adding the gifs to the page
    $(document).on('click', '.name-to-click', function(){
        var artist = $(this).attr("data-name");
        var artistURL = encodeURIComponent(artist.trim());
        var apiKey = "O2vVGnEDjNNy3RiaCdaeGIc1UATF3Za3";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artistURL + "&api_key=" + apiKey + "&limit=10";
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
                gifImage.attr("src", data[i].images.fixed_height.url);
                divImage.append(gifImage);
                divImage.append(rating);
                $("#gif-place").append(divImage);
            }
        })
    })
});// $(document).ready(function () {
    
// })

// $("button").on("click", function() {

//     // Grabbing and storing the data-animal property value from the button
//     var animal = $(this).attr("data-animal");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(function(response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var animalDiv = $("<div>");

//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var animalImage = $('<img src="'+results[i].images.fixed_height.url+'" >');
//           // Setting the src attribute of the image to a property pulled off the result item
//           //animalImage.attr("src", results[i].images.fixed_height.url);

//           // Appending the paragraph and image tag to the animalDiv
//           animalDiv.append(p);
//           animalDiv.append(animalImage);

//           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(animalDiv);
//         }
//       });
//   });