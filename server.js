const express = require('express')
const validator = require('validator')

const app = express ()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// app.get('/', (req, res) =>{
//   res.send(`<h1>Hello World!</h1>`);
// })

// exercise 1
app.get('/greet/:name', (req, res) => {
  res.send(`<h1>Greetings earthling named, ${req.params.name}</h1>`);
})

// exercise 2
app.get('/roll/:number', (req, res) => {
  const numberParam = req.params.number;
  const num = parseInt(numberParam, 10);
  if (isNaN(num)) {
    return res.send('You must specify a number.');
  }
  const rolledNumber = Math.floor(Math.random() * (num +1))
  res.send(`You rolled a ${rolledNumber}`);
});

// exercise 3
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10); 
  
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }
  const collectible = collectibles[index];

  res.send(`So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`);
});

// exercise 4
app.get('/shoes', (req, res) => {
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
// filter syntax from chat gbt
  let filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }
  if (filteredShoes.length === 0) {
    return res.send("No shoes match your criteria.");
  }
  res.json(filteredShoes);
  })



app.listen(3000, () => {
    console.log('Listening on port 3000');
  });  


