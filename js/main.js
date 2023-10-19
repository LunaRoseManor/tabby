function testAlert() {
    alert("test");
}

// TODO: Limit scope
var urls = [];

function addNewUrl() {
    // Find all the necessary info submitted by the user
    var form = document.getElementById("url-management");
    var url = form.children[1].value; // TODO: Remove hard-coded values

    // TODO: Validate and sanitize inputs
    // Currently the unsafe "url" variable is trusted

    // Add that element to the URL ledger inside the DOM
    var ledger = document.getElementById("url-ledger");
    var domElement = "<li>" + url + "</li>"; // TODO: Add 

    ledger.innerHTML += domElement;
    urls.push(url);

    console.log(urls);
}

function removeExistingUrl() {
    // TODO: Implement this feature
    return;
}