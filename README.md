Chrome Extension Torrent from pirateBay to Tranmission - 2017-04
================================================================

This extension aims to put a context menu to chrome witch allow the user to add a torrent from the PirateBay directly into transmission via the tranmission-daemon RPC.

# Pre-Requisite

- Client : Google chrome
- Server : tranmission-daemon (https://doc.ubuntu-fr.org/transmission)

# Install
- Goto chrome://extensions
- Check "Developer mode"
- Click on load non-packaged extension
- Select this folder

# Reference

- Google Chrome extension reference for context menus : https://developer.chrome.com/extensions/samples#search:contextmenus
- Tranmission Web RPC reference : https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt
- Pirate Bay link example : magnet:?xt=urn:btih:71dac39824e6dae52a77a6a127e3593f59a4a9e8&dn=The.100.S04E08.HDTV.x264-KILLERS%5Bettv%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969

# Note
The default url for transmission web RPC is '''http://hostIp:hostPort/transmission/rpc'''
To get the method right you have to stringify a json var containing arguments, ie : 

params = {
       "arguments": {
           "fields": [
               "id", 
               "name"
           ]
       }, 
       "method": "torrent-get"
    };
and send JSON.stringify(params) as request body.

# Todo

- Problem with CORS (cross origin check inside chrome) prevents to send a post request from the javascript to the transmission server ! It's a ongooing bug : https://trac.transmissionbt.com/ticket/5463
-> ok you just have to put the tranmission server address in the manifest under "permissions". 
This brings another todo : 
- set the url of the server in extension options.
- Check for the missing header "X-Transmission-Session-Id" error, and add it to next request headers
- React directly to a click on a "magnet" link