window.onload = () => {
    // TODO: Limit scope
    // TODO: Prevent duplicates
    // WARNING: Urls contained within are unsafe and shouldn't be directly displayed!
    var urls = [];
    var urlAddButton = document.querySelector('#url-button-add');
    var urlAddInput

    console.log
}

function addURL() {
    // Obtain the URL from the specified form
    var url = document.querySelector('input[name=url]').value;

    // Add to the URL ledger appropriate elements inside the DOM
    var ledger = document.getElementById("url-ledger");
    var html = `
        <li>
            <a>` + cleanHTML(url) + `</a>
        </li>
    `;

    ledger.innerHTML += html;
    urls.push(url);
}

function removeURL() {
    // TODO: Implement this feature
    return;
}