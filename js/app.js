$(document).ready(function(){
	
	alert('Document is ready!');
	
	/* ------------- Search Markup Creation ------------- */
	$('.search-container').append('<form action="#" method="get"><input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit"></form>'); // we create the Search Profile
	
	
	/* ------------- Display Cards ------------- */
	var randomUserAPI = "https://randomuser.me/api/?results=12";
	
	$.getJSON(randomUserAPI, function(response){
		console.log(response);
		console.log($.type(response));
		
		console.log(response.results);
		
		$.each(response.results, function(index, value){
			var cardHTML = '<div class="card">';
			cardHTML += '<div class="card-img-container">';
			cardHTML += '<img class="card-img" src="'+ value.picture.thumbnail +'" alt="profile picture">';
			cardHTML += '</div><div class="card-info-container>';
			cardHTML += '<h3 id="name" class="card-name cap">'+ value.name.first + ' '+ value.name.last +'</h3>';
			cardHTML += '<p class="card-text">'+ value.email +'</p>';
			cardHTML += '<p class="card-text cap">'+ value.location.city +', '+ value.location.state +'</p>';
			cardHTML += '</div></div>';
			console.log(cardHTML);
			$('#gallery').append(cardHTML);
		}); // end each
	});
	
});
