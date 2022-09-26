import express from 'express';

const app = express();

app.get('/login', (req, res) => {
   res.json({
      username: 'Hello'
   });
});

app.post('/login', (req, res) => {
   // set something so that GET /login returns username

   res.end();
});

const server = app.listen(process.env.PORT || 3000, () => {
   const address = server.address();

   console.log(`Server started at http://localhost:${address.port}`);
});