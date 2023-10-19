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
		const url = document.querySelector('input[name=url]').value;
		
		// Add a sanitized version of the URL to the list as HTML
		const list = document.getElementById("url-list");
		const fragment = document.createDocumentFragment();
		const listItem = fragment.appendChild(document.createElement("li"));
		const anchor = listItem.appendChild(document.createElement("a"));
		
		// TODO: Find a way to sanitize this
		anchor.setAttribute("href", url);
		anchor.innerHTML = url;
		list.appendChild(listItem);
		
		// Retain a plain-text copy of that URL in the mutual list
		urls.push(url);
	}
	
	function urlValidate() {
		// TODO: Make sure user input fits the format we're expecting
		// This will probably make use of regular expressions
		return;
	}
	
	function removeURL() {
		// TODO: Implement this feature
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

				window.open(url.replace("{$0}", searchInput.value), "_blank");
			});
		}
	}
}