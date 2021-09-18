let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
    case 'jtabb-yum-app.herokuapp.com':
    APIURL = 'https://jtabb-yum-app-server.herokuapp.com'
}

let CLIENTURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    CLIENTURL = 'http://localhost:300-';
    break;
    case 'jtabb-yum-app.herokuapp.com':
    CLIENTURL = 'https://jtabb-yum-app-server.herokuapp.com'
}


export {
    APIURL,
    CLIENTURL
}