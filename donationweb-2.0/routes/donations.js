let donations = require('../models/donations');
let express = require('express');
let _ = require('lodash');
let router = express.Router();

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(donations, null, 5));
};

router.findOne = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let donation = getByValue(donations, req.params.id);

    if (!donation) {
        res.send(`No donation with id ${req.params.id} found.`)
    }

    res.send(JSON.stringify(donation, null, 5));
};

router.addDonation = (req, res) => {
    //Add a new donation to our list
    const id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    let currentSize = donations.length;
    const donation = {"id": id, "paymenttype": req.body.paymenttype, "amount": req.body.amount, "upvotes": 0};

    donations.push(donation);

    if ((currentSize + 1) == donations.length)
        res.json({message: 'Donation Added!'});
    else
        res.json({message: 'Donation NOT Added!'});
};

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    let donation = getByValue(donations, req.params.id);

    if (!donation) {
        res.send(`No donation with id ${req.params.id} found.`);
    }

    donation.upvotes += 1;
    res.send({status: res.statusCode, message: "Upvote successful", donation: donation});
};

router.deleteDonation = (req, res) => {
    const donation = getByValue(donations, req.params.id);

    if (!donation) res.send(`No donation with id ${req.params.id} found.`);

    _.remove(donations, (el) => el.id == req.params.id);
    res.send(`Deleted donation with id ${donation.id}`);
};

router.totalVotes = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send({totalVotes: getTotalVotes(donations)});
};

function getTotalVotes(array) {
    let upvotes = _.map(donations, donation => donation.upvotes);
    // let totalVotes = 0;
    // array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return _.sum(upvotes);
}

function getByValue(array, id) {
    let result = array.filter(function (obj) {
        return obj.id == id;
    });
    return result ? result[0] : null; // or undefined
}

module.exports = router;