function onWindowLoad() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
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
                    var successLink = $("<a/>");
                    successLink.attr("href", "http://localhost:3000");
                    successLink.append($("<h3/>").text("Sharing Suceeded!"));
                    $("body").html(successLink);
                    $('body').on('click', 'a', function(){
                        chrome.tabs.create({url: $(this).attr('href')});
                    return false;
                    });

                    document.body.innerHTML += 
                        "<h4>" + title + "</h4>" +
                        htmlIframeTag;
                    var sendData = "<h4>" + title + "</h4>" + htmlIframeTag;
                    postVideo(sendData);
                } else {
                    document.body.innerHTML = "<h3/>Failed to save the video of current page.</h3>";
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

