// Wait until the web page is properly loaded
window.onload = () => {
	// TODO: Prevent duplicates
	// WARNING: Urls contained within are unsafe and shouldn't be directly displayed!
	var urls = [];
	
	const urlAddButton = document.querySelector("#url-custom-add-button");
	const urlAddInput = document.querySelector("#url-custom-add-input");
	
	// Add event handlers to process new URLs to be searched
	urlAddButton.addEventListener("click", urlAddEvent);
	urlAddInput.addEventListener("keypress", (e) => {
		// Only add a new URL if the "Enter" key is pressed
		if (e.key === "Enter") {
			urlAddEvent(e);
		}
	});
	
	function urlAddEvent(e) {
		// Obtain the plain text href from the specified form
		const href = document.querySelector("section#url > select[name=protocol]").value + 
			document.querySelector("section#url > input[name=url]").value;
		
		if (urlValidate(href) === true) {
			// WARNING: This is incredibly unsafe! Sanitise the inputs!
			// TODO: Figure out how to validate and sanitize URLs
			const list = document.getElementById("url-list");
			const fragment = document.createDocumentFragment();
			const listItem = fragment.appendChild(document.createElement("li"));
			const anchor = listItem.appendChild(document.createElement("a"));
			const buttonRemove = listItem.appendChild(document.createElement("button"));
			
			listItem.setAttribute("data-url", href);
			buttonRemove.innerHTML = "Remove";
			buttonRemove.addEventListener("click", urlRemoveEvent);
			anchor.setAttribute("href", href);
			anchor.setAttribute("target", "_blank"); // Target a new tab in the browser
			anchor.innerHTML = href;
			list.appendChild(listItem);
			
			// Make sure to store a copy of the href so we can open the tabs later
			urls.push(href);

			// Reset the input of the text box so the user doesn't have to
			document.querySelector("#url-custom-add-input").value = "";
		} else {
			// TODO: Make this happen inside the DOM
			alert("ERROR: Plain text href '" + href + "' contains invalid formatting.");
		}
	}
	
	function urlRemoveEvent(e) {
		// Find the nodes responsible for URL removal
		const target = e.target;
		const urlList = document.querySelector("#url-list");

		// Find all the URLs entered by the user
		let listItems = [];
		let listedUrls = [];
		for (let child = 0; child < urlList.children.length; child++) {
			let listItem = urlList.children[child];

			listItems.push(listItem);
			listedUrls.push(listItem.getAttribute("data-url"));
		}

		// Find the index of the URL the user wants to remove
		const targetListItem = target.parentNode;
		const childIndex = listedUrls.indexOf(targetListItem.getAttribute("data-url"));

		// Remove that URL from the list and update the DOM to reflect this
		urls.splice(childIndex, 1)
		target.parentNode.remove();
	}

	function urlValidate(href) {
		// This will fail if the URL isn't valid
		// Modified solution from https://urlregex.com/
		// NOTE: This is a horrible solution that doesn't account for Unicode,
		// but I've been working on this for weeks and this is the best I
		// can come up with.
		const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_$0-9]*)?\??(?:[\-\+=&;%@\.\w_$0-9]*)#?(?:[\.\!\/\\\w]*))?)/;
		
		return pattern.test(href);
	}

	// Search functionality
	const searchInput = document.querySelector("#search-input");
	const searchButton = document.querySelector("#search-button");

	searchInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			searchEvent(e);
		}
	});
	searchButton.addEventListener("click", searchEvent);

	function searchEvent(e) {
		if (urls.length !== 0) {
			urls.forEach(url => {

				window.open(url.replace("$0", encodeURIComponent(searchInput.value)), "_blank");
			});
		}
	}
}