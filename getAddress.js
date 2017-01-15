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
                console.log("hihi");
                var div = $(data).find('#basic-data').html();
                console.log(div);
                var addr = $(div).find('tbody > tr:nth-child(2) > td:nth-child(2)').text();
                console.log(addr);
                document.getElementById("address").innerHTML = addr;
            }
        });
    });
});
