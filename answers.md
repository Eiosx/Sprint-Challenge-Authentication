1. What is the purpose of using _sessions_?

   So that once a user logs in, the server can keep track of said user by validating their cookie on each necessary request, instead of having to login each time when accessing higher level resources.


2. What does bcrypt do to help us store passwords in a secure manner.
   
   It cryptographically hashes passwords. 


3. What does bcrypt do to slow down attackers?

   It introduces time in the form of hash cycles.


4. What are the three parts of the JSON Web Token?
   
   the header, payload, and signature.