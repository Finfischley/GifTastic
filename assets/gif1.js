$(document).ready(function() {

	$(document).on("click", ".move", function() {
		var state = $(this).attr("data-state");
		console.log(state);
		if(state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}

	})

	var topics = ["David Bowie", "Bruce Springsteen", "Prince", "Blondie", "Rolling Stones", "Sly and The Family Stone", "Stevie Wonder", "Fleetwood Mac", "Rush", "Tom Waits"];

	function renderButtons() {
		$("#buttons").empty();
		for (var i = 0; i < topics.length; i++) {	
			var rockBtn = $("<button>");
			rockBtn.addClass("topics");
			rockBtn.attr("data-name", topics[i]);
			rockBtn.text(topics[i]);
			$("#buttons").append(rockBtn);
		}			
	}

	function displayRocker() {
		var rocker = $(this).attr("data-name");
		//API URL and key with 
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rocker
			 + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

		//Calling giphy API for data
		$.ajax({
			url: queryURL,
			method: "Get"
		}).done(function(response) {
		var results = response.data;
		console.log(results);

	//looping through query results and rendering gathered data to p
	for (var i=0; i < results.length; i++) {

			var gifDiv = $("<div class='gif'>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			
			var rockerImage = $("<img>");
			rockerImage.attr("src", results[i].images.fixed_height_still.url);
			rockerImage.attr("data-still", results[i].images.fixed_height_still.url);
			rockerImage.attr("data-animate", results[i].images.fixed_height.url);
			rockerImage.attr("data-state", "still");
			rockerImage.addClass("move");		
			
			
			gifDiv.prepend(p);
			gifDiv.prepend(rockerImage);

			$("#gif-render").prepend(gifDiv);	
		

		}

	
	})	
		
};	

	$("#add-topics").on("click", function(event) {
		event.preventDefault();
		var topic = $("#topics-input").val().trim();
		topics.push(topic);
		renderButtons();
	})




$(document).on("click", ".topics", displayRocker);

renderButtons();
});
