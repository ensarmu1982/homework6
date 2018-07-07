// Initial array of animals
var animals = ["Cat", "Cow", "Dog", "Donkey", "Horse", "Lion", "Eagle", "Sheep", "Goat", "Elephant", "Bear", "Zibra", "Pig",
"Panda", "Monkey", "Alligator", "Ibex", "Wolf", "Camel"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");

  //change the color of clicked button 
  $(this).addClass("showButton");

  var apikey = "CwEOami8bYtsllilL9FDhuv510OReXHf";

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+ apikey +"&q=" + animal + "&limit=10";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results) {

    //delete previously shown animals and rating 
    $("#animals-view").empty();

    //wanted to remove previously shown showButton class but did not work
    $("#buttons-view").removeClass("showButton");

    // Storing an array of results in the response variable
    var response = results.data;

    //loop through to extract responses 
    for (var i = 0; i < response.length; i++){

      // Storing the rating data
      var rated = response[i].rating;

      // Creating an element to have the rating displayed
      var parOne = $("<span>")
      parOne.text("Rating: " + rated);

      // Retrieving the URL for still and animated button
      var imgStill = response[i].images.fixed_height_still.url;
      var imgAnimate = response[i].images.fixed_height.url;

      // Creating an element to hold the image
      var image = $("<img>");
      
      //assign images attribute
      image.attr("src", imgStill);

      //to holds still image
      image.attr("data-still", imgStill);

      //to hold animated image
      image.attr("data-animate", imgAnimate);

      //initial data-state for later use
      image.attr("data-state", "still");

      //add class to assign on click button for all at once 
      image.addClass("gif");

      //Append it to animals view          
     // $("#animals-view").append(parOne, image);        
      var l = $("<li>").append(parOne);        
      var m = $("<li>").append(image);        

      var n = $("<div class='outView'>").append(l, m);
      $("#animals-view").append(n);        

      //$("#animals-view").append("<div>"+ image.val(event) + "</div>");        
    }
  });
}


// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $(document).removeClass("showButton");

  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    var arrButton = $("<button>");

    // Adding a class of animal-btn to our button
    arrButton.addClass("animal-btn");

    // Adding a data-attribute
    arrButton.attr("data-name", animals[i]);

    // Providing the initial button text
    arrButton.text(animals[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(arrButton);
    //$("#buttons-view").removeClass("showButton");
  }
}

// This function handles events where an animal input button is clicked
//then adds it to an array 
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

//on click animate if still or still if animated
$(document).on("click",".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
      
// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons and to start
renderButtons(); 