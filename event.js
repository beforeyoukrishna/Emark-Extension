// This function is called onload in the popup code
function getPageDetails(callback) { 
    // Inject the content script into the current page 
    chrome.tabs.executeScript(null, 
	{file: 'content.js'})
	/*{code: code},
	function(results) {
    if (!results) {
        // An error occurred at executing the script. You've probably not got
        // the permission to execute a content script for the current tab
        return;
    }
var result = results[0];}); 
*/	
    // Perform the callback when a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message)  { 
        // Call the callback function
        callback(message); 
    }); 
}; 
/*chrome.tabs.executeScript({
    code: code
}, function(results) {
    if (!results) {
        // An error occurred at executing the script. You've probably not got
        // the permission to execute a content script for the current tab
        return;
    }
    var result = results[0];
    // Now, do something with result.title and result.description
});*/
