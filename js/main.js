// Wait until the web page is properly loaded
window.onload = () => {
	// TODO: Prevent duplicates
	// WARNING: Urls contained within are unsafe and shouldn't be directly displayed!
	var urls = [];
	
	const urlAddButton = document.querySelector("#url-add-button");
	const urlAddInput = document.querySelector("#url-add-input");
	
	// Add event handlers to process new URLs to be searched
	urlAddButton.addEventListener("click", urlAddEvent);
	urlAddInput.addEventListener("keypress", (e) => {
		// Only add a new URL if the "Enter" key is pressed
		if (e.key === "Enter") {
			urlAddEvent(e);
		}
	});
	
	function urlAddEvent(e) {
		// Obtain the URL from the specified form
		const url = document.querySelector("section#url > select[name=protocol]").value + 
			document.querySelector("section#url > input[name=url]").value;
		
		// WARNING: This is incredibly unsafe! Sanitise the inputs!
		const list = document.getElementById("url-list");
		const fragment = document.createDocumentFragment();
		const listItem = fragment.appendChild(document.createElement("li"));
		const anchor = listItem.appendChild(document.createElement("a"));
		const buttonRemove = listItem.appendChild(document.createElement("button"));
		
		listItem.setAttribute("data-url", url);
		buttonRemove.innerHTML = "Remove";
		buttonRemove.addEventListener("click", urlRemoveEvent);
		anchor.setAttribute("href", url);
		anchor.innerHTML = url;
		list.appendChild(listItem);
		
		// Retain a plain-text copy of that URL in the mutual list
		urls.push(url);

		// Reset the input of the text box
		document.querySelector("#url-add-input").value = "";
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

	function urlValidate() {
		// TODO: Make sure user input fits the format we're expecting
		// This will probably make use of regular expressions
		return;
	}

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