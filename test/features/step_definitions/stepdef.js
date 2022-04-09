const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const axios = require('axios');

const BASE_URL = 'https://ergast.com/api/f1/';
let year = 0;
let response = null;
let numberOfRaces = 0;

Given('I want to know the number of Formula One races in {int}', function (int) {
  console.log("\nBegin Test Execution");
  year = int;
  console.log("Year: " + year);
});

 When('I retrieve the circuit list for that season', async function () {
  await axios.get(`${BASE_URL}${year}`)
    .then(res => {
      response = res.data
    })
    .catch(error => {
      console.error(error)
    })
    .finally(() => {
      var sub_str = "</Race>";
      numberOfRaces = (response.match(new RegExp(sub_str, 'g')) || []).length;
    });
});

Then('there should be {int} circuits in the list returned', function (int) {
  assert.equal(int,numberOfRaces);
  console.log("\nTest Passed!");
});