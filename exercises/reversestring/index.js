// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  let rev = "";
  let revStr='';
  for (let i = str.length; i >= 0; i--) {
    revStr = i;
  }
  rev += revStr;
  return rev;
}

module.exports = reverse;
