# Guidelines

1. `nvm use`

2. `npm i`

3. Create a file in the root folder titled `.env` and set the following variables:

```
FRONTEND_URL=http://localhost:5173
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
JWT_TOKEN_KEY=
RECAPTCHA_SECRET_KEY=
```

4. `npm run dev` - This command uses `nodemon` to hot reload the application on save

5. Visit <http://localhost:4000>. If you see a message, the backend is ready to go
