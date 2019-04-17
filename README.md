# Bewica - Challenges

### Objective I 

- To run the objective 1 passwordCheck function with a specified password use: 
        ```node objective1.js {some_password}```
- To run the automated test with a list of predetermined passwords use: 
        ``` npm run test```

### Objective II

 - To create and run the docker image use : 
        ```docker-compose up```
 - To check against a specified password use : 
```
curl -H "Content-Type: application/json" \
-d '{"password":"some_password_here"}' \
-X GET http://localhost:5000/password_check
```
### Objective IV

 - To run the backend service (node) through docker cd to the objectives_4_node directory and run the docker-compose.yml:
 	```cd objectives_4_node```
 	```docker-compose up```
 - To run the front end react web app , cd to the objectives_4_node directory and start the web server (Note that the backend service has to be running for the web server to work.):
 	```cd ../objectives_3_node```
 	```npm start```

