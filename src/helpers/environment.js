let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
    case 'jtabb-community-compost.herokuapp.com':
    APIURL = 'https://jtabb-community-compost-server.herokuapp.com'
}

let CLIENTURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
    CLIENTURL = 'http://localhost:3000';
    break;
    case 'jtabb-community-compost.herokuapp.com':
    CLIENTURL = 'https://jtabb-community-compost.herokuapp.com'
}

const ADMIN_DEMO_EMAIL = "captain@compost.com";
const ADMIN_DEMO_PASSWORD = "Compost1";
const MEMBER_DEMO_EMAIL = "member@compost.com";
const MEMBER_DEMO_PASSWORD = "Compost1"


export {
    APIURL,
    CLIENTURL,
    ADMIN_DEMO_EMAIL,
    ADMIN_DEMO_PASSWORD,
    MEMBER_DEMO_EMAIL,
    MEMBER_DEMO_PASSWORD
}