<template>
    <div id="app1" class="hero">
        <h3 class="vue-title">
            <i class="fa fa-money" style="padding: 3px"></i>{{ messagetitle }}
        </h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <donation-form :donation="donation" donationBtnTitle="Make Donation"
                                   @donation-is-created-updated="submitDonation">
                    </donation-form>
                </div><!-- /col -->
            </div><!-- /row -->
        </div><!-- /container -->
    </div>
</template>

<script>
    import DonationService from '../services/donationservice';
    import DonationForm from './DonationForm';

    export default {
        name: 'Donate',
        data() {
            return {
                messagetitle: ' Make Donation ',
                donation: {
                    message: '',
                    paymenttype: 'Direct',
                    amount: 0,
                },
            };
        },
        components: {
            'donation-form': DonationForm,
        },
        methods: {
            submitDonation: function(donation) {
                DonationService.postDonation(donation)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error);
                    });
            },
        },
    };
</script>

<style scoped>
    #app1 {
        width: 95%;
        margin: 0 auto;
    }
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }
</style>
