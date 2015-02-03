
/*var code = 'var meta = document.querySelector("meta[name=\'description\']");' + 
           'if (meta) meta = meta.getAttribute("content");' +
           '({' +
           '    description: meta || ""' +
           '});';
		   */
// This callback function is called when the content script has been 
// injected and returned its results

function onPageDetailsReceived(pageDetails)  {
	var meta = document.querySelectorAll('meta');
	for(var i=0;i<meta.length;i++){
	   var content = meta[i].getAttribute('content'); /* here's the content */
	}
	
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('url').value = pageDetails.url; 
	document.getElementsById('description')[0].getAttribute('content') = pageDetails.content;
   //// document.getElementById('description').innerText = pageDetails.content; 
	//var desc = document.getElementById('description');
	//desc = pagedetails.content;
	////alert(content.document.content);
	////document.getElementsById('description')[0].getAttribute('content') = pageDetails.description;
} 

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'popup1.html';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);
    
    // Prepare the data to be POSTed by URLEncoding each field's contents
    var title = encodeURIComponent(document.getElementById('title').value);
    var url = encodeURIComponent(document.getElementById('url').value);
    var description = encodeURIComponent(document.getElementById('description').value);
    var tags = encodeURIComponent(document.getElementById('tags').value);
    
    var params = 'title=' + title + 
                 '&url=' + url + 
                 '&description=' + description +
                 '&tags=' + tags;
    
    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
