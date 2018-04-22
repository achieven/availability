# availability

# prepare client
cd src/client    
npm install  
npm run webpack

# run client
npm run webpack-dev-server

# prepare server
cd src/server  
npm install  

# run server
npm server

#prepare tests
cd tests/client
npm install

#run tests
npm test

# use
http://localhost:8080 (or similar port, whatever webpack-dev-server is using)