let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
    case 'https://jtabb-community-compost.herokuapp.com':
    APIURL = 'https://jtabb-community-compost-server.herokuapp.com'
}

let CLIENTURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    CLIENTURL = 'http://localhost:3000';
    break;
    case 'https://jtabb-community-compost.herokuapp.com':
    CLIENTURL = 'https://jtabb-community-compost.herokuapp.com'
}


export {
    APIURL,
    CLIENTURL
}