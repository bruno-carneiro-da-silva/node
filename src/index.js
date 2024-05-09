const http = require('http');
const routes = require('./routes');
const { URL } = require('url');
const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(`http://localhost:3000${req.url}`);
    
    let { pathname } = parsedUrl;
    const splitEndpoint = pathname.split('/').filter(Boolean);
    let id = null;

    if(splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
    }
    
    const route = routes.find((routeObjec) => (
        routeObjec.path == pathname && routeObjec.method == req.method
    ))
    if(route) { 
        req.query = Object.fromEntries(parsedUrl.searchParams);
        req.params = { id };

        res.send = (statusCode, body) => {
            res.writeHead(statusCode, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(body));
        }

        if(['POST', 'PUT', 'PATCH'].includes(req.method)) {
            bodyParser(req, () => route.handler(req, res));
        } else {
          route.handler(req, res);
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(`Cannot ${req.method} ${req.url}`);
    }
});

server.listen(3000, () => console.log('Server is running on port http://localhost:3000'))