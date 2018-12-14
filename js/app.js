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
			$cardModal += '<p class="modal-text cap">'+ value.location.city +', '+ value.location.state +'</p><hr>';
			$cardModal += '<p class="modal-text">'+ value.cell +'</p>';
			$cardModal += '<p class="modal-text">'+ value.location.street +'</p>';
			$cardModal += '<p class="modal-text">Birthday: '+ value.dob.date +'</p>';
			$cardModal += '<button type="button" name="Prev" class="modal-prev-btn" style="padding= 5px; margin= 10px;">Prev</button><button type="button" class="modal-next-btn" style="padding= 5px; margin= 10px;">Next</button>'
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
			$(this).on("click", function(){
				console.log(card);
				var modal = $('#modal-'+index);
				console.log(modal);
				modal.css('display', 'block');
			});
		});
		
		$.each($('.modal-prev-btn'), function(index, button){
			$(this).on("click", function(){
				console.log("Prev Button Pressed");
				$('.modal-container').css('display', 'none');
				if(index === 0){
					var modal = $('#modal-11');
				} else {
					var prevIndex = index - 1;
					var modal = $('#modal-'+ prevIndex);
				}
				modal.css('display', 'block');
			});
		});
		
		$.each($('.modal-next-btn'), function(index, button){
			$(this).on("click", function(){
				console.log("Next Button Pressed");
				$('.modal-container').css('display', 'none');
				if(index === 11){
					var modal = $('#modal-0');
				} else {
					var nextIndex = index + 1;
					var modal = $('#modal-'+ nextIndex);
				}
				modal.css('display', 'block');
			});
		});

	}); // end getJSON
	
	
		
		
}); // end ready
