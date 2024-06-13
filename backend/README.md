# Guidelines

1. `npm i`

2. Create a file in the root folder titled `.env`

```
FRONTEND_URL=http://localhost:3000
MSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
JWT_TOKEN_KEY=
```

3. `npm run dev` - This command uses `nodemon` to hot reload the application on save

4. Visit <http://localhost:4000/projects>. If you see some JSON, the backend is ready to go