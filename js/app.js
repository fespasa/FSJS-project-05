$(document).ready(function(){
	
	/* ------------- Search Markup Creation ------------- */
	$('.search-container').append('<form action="#" method="get"><input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"></form>'); // we create the Search Profile
	
	// Change font color to blue
	$('body').css('color', 'blue');
	
	/* ------------- Display Cards ------------- */
	var randomUserAPI = "https://randomuser.me/api/?results=12";

	// getJSON fetch
	$.getJSON(randomUserAPI, function(response){
		
		console.log(response.results);
		
		/* ------------- Card Creation ------------- */
		$.each(response.results, function(index, value){
			var $cardHTML = '<div class="card" id="card-'+ index +'">';
			$cardHTML += '<div class="card-img-container">';
			$cardHTML += '<img class="card-img" src="'+ value.picture.thumbnail +'" alt="profile picture">';
			$cardHTML += '</div><div class="card-info-container>';
			$cardHTML += '<h3 id="name" class="card-name cap"><span class="cap">' + value.name.first +'</span>'+' '+'<span class="cap">'+ value.name.last +'</span>' +'</h3>';
			$cardHTML += '<p class="card-text">'+ value.email +'</p>';
			$cardHTML += '<p class="card-text cap">'+ value.location.city +', '+ value.location.state +'</p>';
			$cardHTML += '</div></div>';

			$('#gallery').append($cardHTML);
			
			
			// Birthday date fixed to make it more readable 
			var birthday = value.dob.date;
			var year = "";
			var month = "";
			var day = "";
			for(var i = 0; i < 4; i++){
				year += birthday[i];
			}
			for(var i = 5; i < 7; i++){
				month += birthday[i];
			}
			for(var i = 8; i < 10; i++){
				day += birthday[i];
			}
			var okBirthday = day + "/" + month + "/" + year;
			console.log(birthday + " -> " + okBirthday);
			// end of fixing
						
			/* ------------- Modal Creation ------------- */
			var $cardModal = '<div class="modal-container" id="modal-'+ index +'"><div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button><div class="modal-info-container">';
			$cardModal += '<img class="modal-img" src="'+ value.picture.medium +'" alt="profile picture">';
			$cardModal += '<h3 id="name" class="modal-name cap">'+ value.name.first + ' ' + value.name.last +'</h3>';
			$cardModal += '<p class="modal-text">'+ value.email +'</p>';
			$cardModal += '<p class="modal-text cap">'+ value.location.city +', '+ value.location.state +'</p><hr>';
			$cardModal += '<p class="modal-text">'+ value.cell +'</p>';
			$cardModal += '<p class="modal-text">'+ value.location.street +'</p>';
			$cardModal += '<p class="modal-text">Birthday: '+ okBirthday +'</p>';
			$cardModal += '<div class="modal-btn-container"><button type="button" name="Prev" class="modal-prev-btn btn" style="padding= 5px; margin= 10px;">Prev</button><button type="button" class="modal-next-btn btn" style="padding= 5px; margin= 10px;">Next</button></div>'
			$cardModal += '</div></div>';
			// append modal html to the html body
			$('body').append($cardModal);
			
			// closing modal window button utility
			$('.modal-close-btn').click(function(){
				$('.modal-container').css('display', 'none');
			});
							
			console.log(index);
			
		}); // end each
		
		// hide all modals 
		$('.modal-container').css('display', 'none');
		
		// show modal when you click the card.
		$.each($('.card'), function(index, card){
			$(this).on("click", function(){
				console.log(card);
				var modal = $('#modal-'+index);
				console.log(modal);
				modal.css('display', 'block');
			});
		});
		
		
		/* ------------- Modal Navigation Buttons ------------- */
		
		// PREV Button
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
		
		// NEXT Button
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
		 
		 
		/* ------------- Filter of users ------------- */
    
		const searchInput = $('#search-input');
    
		$('#search-submit').on('click', function(event){
			searchUser(searchInput.prop('value').toLowerCase());
    	});
    	
    	//Created a button to show all cards when needed.
    	const $showAllButton = '<div class="bottom-btn"><button type="button" id="show-all-btn" class="btn">Show All Cards</btn></div>'
    	$('body').append($showAllButton);
    	$('#show-all-btn').css('display', 'none');
    	
    	// function to filter users in the display.
		function searchUser(user) {
			var usersFound = 0;
			$.each(document.querySelectorAll('#name'), function(index, name){
				console.log(name);
				nameText = name.innerText;
				console.log(nameText);
				if(nameText.indexOf(user) === 0){
					$('#card-'+ index).css('display', 'block');
					usersFound++;
				} else {
					$('#card-'+ index).css('display', 'none');
				}
			});
			if(usersFound === 0){
				// if the user is not found it shows all the users and it changes the background color  to green. 
				showAllCards();
				//change background css property
				$('body').addClass('searchFailed');
				setTimeout(()=>{
					$('body').removeClass('searchFailed');
				}, 1500);
				alert('User "' + user + '" not found! :(');
			} else {
				//change background css property
				$('body').addClass('searchSuccess');
				setTimeout(()=>{
					$('body').removeClass('searchSuccess');
				}, 1500);
				$('#show-all-btn').css('display', 'block');
			}
		}	
		
		// Function when it clicks show all cards button.
		$('#show-all-btn').on('click', function(event){
	    	showAllCards();
	    	$('#show-all-btn').css('display', 'none');
    	});
		
		// function to show all cards again
		function showAllCards(){
			$.each($('.card'), function(index, card){
				$(this).css('display', 'block');
			});
		}
		
}); // end ready
