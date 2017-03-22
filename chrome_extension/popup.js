function onWindowLoad() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        document.body.innerText = url;
        $.ajax({
            type: "GET",
            dataType: "json",
            url:"http://iframe.ly/api/oembed?url=" + url + "&api_key=529a5b3ecaa72e5dd882df",
            success:function(data){
                var htmlSuccess = false;
                var htmlIframeTag;
                var title;
                var provider;
                $.each(data, function(key, val) {
                    if (key == "title") {
                        title = val;
                    } else if (key == "provider_name") {
                        provider = val;
                    } else if (key == "html") {
                        htmlIframeTag = val;
                        htmlSuccess = true;
                    } 
                });
                
                if (htmlSuccess) {
                    document.body.innerHTML = title;
                    document.body.innerHTML += htmlIframeTag;
                    var sendData = "<h4>" + title + "</h2>" + htmlIframeTag;
                    postVideo(sendData);
                }
            }
        });
    });
}


function login(username, password) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(
            {"username": username, "password": password}
        ),
        url:"http://localhost:3000/api/account/signin",
        success:function(data){
            $.each(data, function(key, val) {
                if (key == "success") {
                    if (val == "true") {
                    }
                }
            });
        }
    });
}

function postVideo(videoIframeTag) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(
            {"contents": videoIframeTag}
        ),
        url:"http://localhost:3000/api/memo/",
        success:function(data){
            $.each(data, function(key, val) {
                if (key == "success") {
                    if (val == "true") {
                    }
                }
            });
        },
        error:function(data){
            chrome.tabs.create({url:"http://localhost:4000/login"});
        }
    });
}



window.onload = onWindowLoad;

