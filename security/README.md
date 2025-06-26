

# Register
   Type: POST
   URL: http://localhost:8081/api/v1/auth/register
   Request body Example:
   {
       "firstname": "Name",
       "lastname": "Last Name",
       "email": "email.com",
       "password": "password"
   }
   returns token

# Authenticate
   Type: POST
   URL: http://localhost:8081/api/v1/auth/authenticate
   Request body Example:
   {
   "email": "email.com",
   "password": "password"
   }
   returns token

# Secured Endpoint Example
   Type: GET
   URL: http://localhost:8081/api/v1/demo-controller
   Authorization: Bearer Token
   **Paste token returned after Auth**
   returns endpoint
