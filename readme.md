API KEYS

User Signup: http://localhost:8080/api/v1/users/register
USER LOGIN: http://localhost:8080/api/v1/users/login

blog create: http://localhost:8080/api/v1/createblog
blog update: http://localhost:8080/api/v1/updateblog/:ID
blog delete: http://localhost:8080/api/v1/deletenlog/:ID
get blog: http://localhost:8080/api/v1/getblog


Account Create JSON data:

{
    "fullName": "Rahul Kumar",
    "email": "abc@gmail.com",
    "password": "Password@123",
    "confirmPassword": "Password@123"
}

Account Login JSON data:

{
    "email": "abc@gmail.com",
  "password": "Password@123"
}