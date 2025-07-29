

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
   - token returned after Auth
   returns endpoint

# Forgot Password
   Type: POST
   URL: http://localhost:8081/api/v1/auth/forgot-password
   Request body Example:
   {
   "email": "email.com",
   }
   returns Success – 200 OK

# Reset Password
   Type: POST
   URL: http://localhost:8081/api/v1/auth/reset-password
   Request body Example:
   {
     "token": "some-reset-token",
     "newPassword": "NewSecurePassword123!"
   }
   returns Success – 200 OK


