//storing variable for the X-Transmission-Session-Id header
var xSessionID = ""

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
      //"X-Transmission-Session-Id": "hJjdAAJl7OQTOYPYOIfOIQ0ycfZO0w9S8czbI1kXNx07ETVv"
      "X-Transmission-Session-Id": xSessionID
    }
    $.ajax({
      url: urlTransmission,
      type: "post",
      data: JSON.stringify(params),
      headers: headers,
      success: function(data){
        console.log("[torrentmission] response : ", data);
        alert("Torrent '"+data.arguments["torrent-added"].name+"' added successfuly ! \n");
      },
      error: function(request, textStatus, err){
        console.error("[torrentmission] error when sending request :", err, textStatus);
        if(request.getResponseHeader('X-Transmission-Session-Id'))
        {
          console.log("[torrentmission] error response session id :",request.getResponseHeader('X-Transmission-Session-Id') );
          xSessionID = request.getResponseHeader('X-Transmission-Session-Id');
          this.headers = {"X-Transmission-Session-Id": xSessionID};
          console.log("[torrentmission] retrying with new tranmission session id...", xSessionID);
          $.ajax(this);
        }
      }

    });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create link on context menu
  var id = chrome.contextMenus.create({"title": "Add torrent directly to tranmission...", "contexts":["link"],"id": "contextLink"});
});