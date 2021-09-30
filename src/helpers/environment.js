let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
    case 'INSERT CLIENT URL HERE':
    APIURL = 'https://jtabb-community-compost-server.herokuapp.com/'
}

let CLIENTURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    CLIENTURL = 'http://localhost:3000';
    break;
    case 'INSERT CLIENT URL HERE':
    CLIENTURL = 'https://jtabb-yum-app-server.herokuapp.com'
}


export {
    APIURL,
    CLIENTURL
}