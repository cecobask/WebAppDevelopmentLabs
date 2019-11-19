let donations = require('../models/donations');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Donation = require('../models/donations');
var mongodbUri = 'mongodb+srv://cecobask:393939@mongocluster-yevae.mongodb.net/donationsdb?retryWrites=true&w=majority';

mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Donation.find(function (err, donations) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(donations, null, 5));
    });
};

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Donation.find({"_id": req.params.id}, function (err, donation) {
        if (err)
            res.send("err");
        else
            res.send(JSON.stringify(donation, null, 5))
    });
};

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function (obj) {
        totalVotes += obj.upvotes;
    });
    return totalVotes;
}

router.addDonation = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const donation = new Donation();
    donation.paymenttype = req.body.paymenttype;
    donation.amount = req.body.amount;
    donation.upvotes = req.body.upvotes;

    donation.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Donation Added Successfully!'})
    });
};

router.editDonation = async (req, res) => {
    let donation = await Donation.findByIdAndUpdate(req.params.id, {
        paymenttype: req.body.paymenttype,
        amount: req.body.amount,
        upvotes: req.body.upvotes
    });
    if (!donation) {
        res.status(404);
        res.json({
            message: 'Donation NOT Found!'
        });
    } else {
        res.json({
            message: 'Donation Successfully UpDated!',
            data: donation
        });
    }
};

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    Donation.findById(req.params.id, function (err, donation) {
        if (err)
            res.send(err);
        else {
            donation.upvotes += 1;
            donation.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({status: 200, message: 'UpVote Successful', donation: donation});
            });
        }
    });
};

router.deleteDonation = (req, res) => {
    //Delete the selected donation based on its id
    Donation.findByIdAndRemove(req.params.id, function (err, donation) {
        if (err)
            res.json({message: "Donation NOT found!", errmsg: err});
        else
            res.json({message: 'Donation Deleted!', donation: donation});
    });
};

router.findTotalVotes = (req, res) => {

    // let votes = getTotalVotes(donations);
    // res.json({totalvotes: votes});

    Donation.find(function(err, donations) {
        if (err)
        res.send(err);
        else
        res.json({totalVotes: getTotalVotes(donations)});
    });
};

module.exports = router;