function onWindowLoad() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        document.body.innerText = url;
        alert("start now");
        $.ajax({
            type: "GET",
            dataType: "json",
            url:"http://iframe.ly/api/oembed?url=" + url + "&api_key=529a5b3ecaa72e5dd882df",
            success:function(data){
                $.each(data, function(key, val) {
                    if (key == "html") {
                        document.body.innerHTML = val;
                    }
                });
            }
        });
    });
}
window.onload = onWindowLoad;

