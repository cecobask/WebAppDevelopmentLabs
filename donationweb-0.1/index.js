const chalk         = require('chalk');
const readlineSync  = require('readline-sync');

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

    if(choice+1 === 1) console.log(chalk.red.bold('Make a donation...'));
    else if(choice+1 === 2) console.log(donations);
    else if(choice+1 === 3) console.log(chalk.red.bold('Search for a donation...'));
    else if(choice+1 === 4) console.log(chalk.red.bold('Delete a donation...'));
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

displayMenu();