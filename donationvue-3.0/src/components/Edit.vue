<template>
    <div id="app1" class="hero">
        <h3 class="vue-title">
            <i class="fa fa-money" style="padding: 3px"></i>{{ messagetitle }}
        </h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <template v-if="childDataLoaded">
                        <donation-form :donation="donation" donationBtnTitle="Update Donation"
                                       @donation-is-created-updated="updateDonation">
                        </donation-form>
                    </template>
                </div><!-- /col -->
            </div><!-- /row -->
        </div><!-- /container -->
    </div>
</template>

<script>
    import DonationService from '../services/donationservice';
    import DonationForm from './DonationForm';

    export default {
        name: 'Edit',
        data() {
            return {
                donation: {},
                childDataLoaded: false,
                temp: {},
                messagetitle: ' Update Donation ',
            };
        },
        components: {
            'donation-form': DonationForm,
        },
        created() {
            this.getDonation();
        },
        methods: {
            getDonation: function() {
                DonationService.fetchDonation(this.$router.params)
                    .then(response => {
                        this.temp = response.data;
                        this.donation = this.temp[0];
                        this.childDataLoaded = true;
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error);
                    });
            },
            updateDonation: function(donation) {
                DonationService.putDonation(this.$router.params, donation)
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
