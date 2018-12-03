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
			var $cardHTML = '<div class="card" id="card-'+ index +'">';
			$cardHTML += '<div class="card-img-container">';
			$cardHTML += '<img class="card-img" src="'+ value.picture.thumbnail +'" alt="profile picture">';
			$cardHTML += '</div><div class="card-info-container>';
			$cardHTML += '<h3 id="name" class="card-name cap">'+ value.name.first + ' '+ value.name.last +'</h3>';
			$cardHTML += '<p class="card-text">'+ value.email +'</p>';
			$cardHTML += '<p class="card-text cap">'+ value.location.city +', '+ value.location.state +'</p>';
			$cardHTML += '</div></div>';

			$('#gallery').append($cardHTML);
			
			var $cardModal = '<div class="modal-container" id="modal-'+ index +'"><div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button><div class="modal-info-container">';
			$cardModal += '<img class="modal-img" src="'+ value.picture.medium +'" alt="profile picture">';
			$cardModal += '<h3 id="name" class="modal-name cap">'+ value.name.first + ' ' + value.name.last +'</h3>';
			$cardModal += '<p class="modal-text">'+ value.email +'</p>';
			$cardModal += '<p class="modal-text cap">'+ value.location.city +'</p><hr>';
			$cardModal += '<p class="modal-text">'+ value.phone +'</p>';
			$cardModal += '<p class="modal-text">'+ value.location.street +'</p>';
			$cardModal += '<p class="modal-text">Birthday: '+ value.dob.date +'</p>';
			$cardModal += '</div></div>';
			
			$('body').append($cardModal);
			
			$('.modal-close-btn').click(function(){
				$('.modal-container').css('display', 'none');
			});
				
			console.log(index);
			
		}); // end each
		
		$('.modal-container').css('display', 'none');
		
		$.each($('.card'), function(index, card){
			console.log("I'm on card nº "+ index);
			$('#card-'+index).click(function(){
				console.log(card);
				var modal = $('#modal-'+index);
				console.log(modal);
				modal.css('display', 'block');
			});
		});
		
		
	});
	
});
