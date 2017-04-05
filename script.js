
// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    console.log("opening transmission with url :", info.linkUrl);
    urlTransmission = "http://192.168.0.96:9091/transmission/rpc";
    //get torrent method
    // params = {
    //   "arguments": {
    //       "fields": [
    //           "id", 
    //           "name"
    //       ]
    //   }, 
    //   "method": "torrent-get"
    // };
    var params = {
      "arguments":{
        "filename":info.linkUrl  
      },
      "method": "torrent-add"
    };
    var headers = {
      "X-Transmission-Session-Id": "dxl5FFWt6l4VsfDy5ckCQieQ7w5sBdRO5hrlx5IjmOt4gzsJ"
    }
    $.ajax({
      url: urlTransmission,
      type: "post",
      data: JSON.stringify(params),
      headers: headers,
      success: function(data){
        console.log("response : ", JSON.stringify(data));
      }
    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create link on context menu
  var id = chrome.contextMenus.create({"title": title, "contexts":"link","id": "contextLink"});
});