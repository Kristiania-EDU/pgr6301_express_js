import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const USERS = [
   {
      username: 'admin',
      password: '1234'
   }
];

app.get('/login', (req, res) => {
   res.json({
      username: 'Hello'
   });
});

/**
 * Type: POST
 * Route: /login
 * Parameters: username and password
 * Description: Logs user into the system
 * */
app.post('/login', (req, res) => {
   const body = req.body;
   const { username, password } = body;

   const user = USERS.find(x => x.username === username && x.password == password);

   if(user) {
      res.sendStatus(200);
   } else {
      res.sendStatus(401);
   }
});

const server = app.listen(process.env.PORT || 3000, () => {
   const address = server.address();

   console.log(`Server started at http://localhost:${address.port}`);
});