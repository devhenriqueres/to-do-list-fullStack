const express = require('express');
require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Server running at http://localhost:${process.env.PORT}`)
});