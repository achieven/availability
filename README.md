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
node app.js

# use
http://localhost:8080 (or similar port, whatever webpack-dev-server is using)