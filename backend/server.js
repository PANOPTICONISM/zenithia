const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ users: ['one', 'two'] });
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
});