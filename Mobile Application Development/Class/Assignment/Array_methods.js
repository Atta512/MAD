//Arrays methods
const countries = ["Islamabad", "Karachi", "Lahore", "Attock"];
// Add an element to the end of an array:
console.log(countries.push("Rawalpindi"));
// Remove the last element of an array:
console.log(countries.pop());
// Length of an array:
console.log(countries.length);
// First element of an array:
console.log(countries[0]);
// Remove the first element of an array:
console.log(countries.shift());
// Concatenate two arrays
console.log(countries.concat(["Peshawar", "Swabi"]));
// Slice an array
console.log(countries.slice(1, 3));
// Splice an array
console.log(countries.splice(1, 2,3,4,5));
// Reverse an array
console.log(countries.reverse());
// Sort an array
console.log(countries.sort());
// Convert an array to a string
console.log(countries.toString());
// Convert an array to a string with a separator
console.log(countries.toString(", "));
// Flat an array
console.log(countries.flat());
// Add an element to the beginning of an array:
console.log(countries.unshift("Lahore"));
// Find the index of an element in an array
console.log(countries.indexOf("Islamabad"));
// Find the last index of an element in an array
console.log(countries.lastIndexOf("Islamabad"));
// Check if an element is in an array
console.log(countries.includes("Peshawar"));
// Join all elements of an array into a string
console.log(countries.join(" "));
// Join all elements of an array into a string with a separator
console.log(countries.join(", "));
// Join all elements of an array into a string with a separator and a prefix
console.log(countries.join(", ", 2));
// Join all elements of an array into a string with a separator and a limit
console.log(countries.join(", ", 2, 4));

