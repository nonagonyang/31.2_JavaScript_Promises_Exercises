let favNumber = 12;
let baseURL = "http://numbersapi.com";

// Part 1.
async function getFavNumber() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
getFavNumber();

// Part 2.
// Figure out how to get data on multiple numbers in a single request. 
// Make that request and when you get the data back, 
// put all of the number facts on the page.

const favNumbers = [7, 11, 22];
async function getFavNumbers() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
getFavNumbers();


//Part 3

//solution 1

// The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
async function fourFact() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
  fourFact();


//solution 2
let fourNumFactsPromises = [];

for (let i = 0; i < 4; i++) {
    fourNumFactsPromises.push(
        $.getJSON(`${baseURL}/${favNumber}?json`)
  );
}

Promise.all(fourNumFactsPromises)
  .then(factsArr => (
    factsArr.forEach(fact =>$('body').append(`<p>${fact.text}</p>`))
  ))
  .catch(err => console.log(err));