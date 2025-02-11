notes routes
-->notes/create
-->notes/
-->notes/update
-->notes/delete

JSON.stringify({...})

Converts the JavaScript object into a JSON string.
The JSON representation of the object is:
json
Copy
Edit
"{ \"username\": \"admin\", \"password\": \"1234\" }"
This is required because HTTP requests send data as text (not as JavaScript objects).
Why do we need JSON.stringify()?

When making a POST request, the server expects the data in a structured format, typically JSON.
JSON.stringify() ensures the data is correctly formatted before sending it.