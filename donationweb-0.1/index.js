const chalk = require('chalk');
const readlineSync = require('readline-sync');

let donations = [
    {id: 1000000, paymenttype: 'PayPal', amount: 1600, upvotes: 1},
    {id: 1000001, paymenttype: 'Direct', amount: 1100, upvotes: 4},
    {id: 1000002, paymenttype: 'Visa', amount: 100, upvotes: 2}
];

function displayMenu() {
    let choice;
    let options = ['Make A Donation', 'Display All Donations', 'Find A Donation', 'Delete A Donation'];

    console.log('\x1Bc'); // Clear the Screen
    console.log(chalk.bold('----- DONATION -----'));
    console.log('');
    choice = readlineSync.keyInSelect(options, chalk.green.bold('Choose an Option?'));

    if (choice + 1 === 1) addDonation();
    else if (choice + 1 === 2) console.log(donations);
    else if (choice + 1 === 3) findDonation();
    else if (choice + 1 === 4) deleteDonation();
    else return process.exit(0);

    continueYN();
}

function continueYN() {
    if (readlineSync.keyInYN('Do you want to Continue?')) {
        // "Y" key was pressed.
        displayMenu();
    } else {
        // Another key was pressed.
        process.exit(0);
    }
}

function getByValue(array, id) {
    let result = array.filter(obj => obj.id === id);
    return result ? result[0] : null; // or undefined
}

function addDonation() {
    //Randomly generate an id
    let id = Math.floor((Math.random() * 10000000) + 1);
    let currentSize = donations.length;
    let paymentType = readlineSync.question("Please, enter payment type: ");
    let paymentAmount = readlineSync.questionInt("Please, enter donation amount: ");

    //Add a new donation to our list
    const donation = {id: id, paymenttype: paymentType, amount: paymentAmount, upovotes: 3};
    donations.push(donation);

    if (donations.length > currentSize) console.log(chalk.bold("Successfully added donation!"));
    else console.log(chalk.bold("Something went wrong :("));
}

function findDonation() {
    const id = readlineSync.questionInt("Please enter id of the donation you are looking for: ");
    const donation = getByValue(donations, id);
    !donation ? console.log(chalk.bold("No donation with this id."))
        : console.log(donation);
}

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
        console.log(chalk.bold('Successfully deleted donation:'));
        console.log(element);
    }
}

function deleteDonation() {
    const id = readlineSync.questionInt("Please enter id of the donation you want to delete: ");
    const donation = getByValue(donations, id);

    !donation ? console.log(chalk.bold("No donation with this id."))
        : remove(donations, donation);
}

displayMenu();