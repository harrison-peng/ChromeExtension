var queryInfo = {
    active: true,
    currentWindow: true
};

function getAddress(tabUrl, cb) {
    $.ajax({
        url: tabUrl,
        method: "GET",
        success: function(data) {
            cb(null, data);
        },
        error: function(err) {
            cb(err);
        }
    });
}

function getData(url, cb) {
    console.log("aaaaaaaaaaa", url);
    $.ajax({
        url: url,
        method: "GET",
        success: function(data) {
            console.log(data);
            cb(null, data);
        },
        error: function(err) {
            cb(err);
        }
    });
}

$(document).ready(function() {
    chrome.tabs.query(queryInfo, function(arrayOfTabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = arrayOfTabs[0];
        var activeTabUrl = activeTab.url;
        console.log(activeTabUrl);
        getAddress(activeTabUrl, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                var div = $(data).find('#basic-data').html();
                console.log(div);
                var addr = $(div).find('tbody > tr:nth-child(2) > td:nth-child(2)').text();
                console.log(addr);
                document.getElementById("address").innerHTML = addr;

                var youtubeURL = "https://www.youtube.com/results?search_query=" + encodeURIComponent(addr);

                getData(youtubeURL, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var resList = $(data).find('ol.item-section');
                        var alist = $(resList).find('a');

                        var videoIds = $(alist).map(function() {
                            var substring = "watch?v=";
                            if (this.href.includes(substring)) {
                                return this.href.split('=')[1];
                            }
                        });
                        console.log(videoIds);

                        for (var i = 1; i <= videoIds.length; i++) {
                            if (videoIds[i] === videoIds[i - 1]) {
                                console.log(videoIds[i]);
                                var iframe = "<p><iframe id='existing-iframe-example' width='360' height='203' src='https://www.youtube.com/embed/" + videoIds[i] + "?enablejsapi=1' frameborder='0' style='border: solid 4px #37474F' ></iframe></>";
                                $(document).find('#videos').append(iframe);
                            }
                        }
                        // var resList = $(data).find('ol.item-section').html();
                        // var videoURL = $(resList).find('div a').attr('href');
                        // var videoId = videoURL.split('=')[1];
                        // console.log(videoURL);
                        // var iframe = "<iframe id='existing-iframe-example' width='360' height='203' src='https://www.youtube.com/embed/" + videoId + "?enablejsapi=1' frameborder='0' style='border: solid 4px #37474F' ></iframe>";
                        // document.getElementById("video").innerHTML = iframe;
                    }
                });
            }
        });
    });
});
// var aurl = "https://www.youtube.com/results?search_query=新竹縣竹北市成功九街";

// $(document).ready(function() {
//         getData(aurl,function(err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 var resList = $(data).find('ol.item-section').html();
//                 var firstRes = $(resList).find('div a').html();
//                 var videoURL = $(resList).find('div a').attr('href');
//                 var videoId = videoURL.split('=')[1];
//                 console.log(videoId);
//
//                 var iframe = "<iframe id='existing-iframe-example' width='640' height='360' src='https://www.youtube.com/embed/" + videoId + "?enablejsapi=1' frameborder='0' style='border: solid 4px #37474F' ></iframe>";
//                 console.log(iframe);
//
//                 var htmlData = firstRes;
//                 document.getElementById("video").innerHTML = iframe;
//             }
//         });
// });
