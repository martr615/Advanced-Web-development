# Game Collection
Håll koll på din spelsamling. Filtrera och sortera din spelsamling. 
Logga in med ditt google-konto genom Auth0. Frontend och backend är separerade och ligger
på olika servrar. Varje request från frontend skickar med en Token (JWT) som backend
kontrollerar och om Token är godkänd utförs request:en.

Utvecklat med MEAN-Stack, dvs. MongoDB, Express.js, AngularJS och Node.js.

**Client-side:** Framework för frontend är Angular.

**Server-side:** Det Micro-service framework vi använde var Express.js för Node.js.

**Data and user management:** Auth0 för inloggning och mLab för vår MongoDB-databas. 