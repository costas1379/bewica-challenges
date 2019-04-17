# Bewica - Challenges

### Objective 1 

- To run the objective 1 passwordCheck function with a specified password use: 
        ```node objective1.js {some_password}```
- To run the automated test with a list of predetermined passwords use: 
        ``` npm run test```
### Objective 2 
 - To create and run the docker image use : 
        ```docker-compose up```
 - To check against a specified password use : 
```
curl -H "Content-Type: application/json" \
-d '{"password":"some_password_here"}' \
-X GET http://localhost:5000/password_check
```