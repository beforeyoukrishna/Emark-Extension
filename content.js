// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
   'description': document.getSelection().toString()
	//'description': window.disc.content
	//'description':content.document.getElementsByTagName("meta")[0].value
	//'description': document.getElementByName('description')[0].getAttribute('content');
	//'description': document.getElementsByTagName('meta')
//'description': window.content,
//document.getElementsByName('description')[0].getAttribute('content');
});

