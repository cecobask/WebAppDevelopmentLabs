<template>
    <div id="app1">
        <h3 class="vue-title">
            <i class="fa fa-list" style="padding: 3px"></i>{{ messagetitle }}
        </h3>
        <v-client-table :columns="columns" :data="donations" :options="options">
        </v-client-table>
    </div>
</template>

<script>
    import DonationService from '../services/donationservice';
    import Vue from 'vue';
    import VueTables from 'vue-tables-2';
    import VueForm from 'vueform'
    import Vuelidate from 'vuelidate'
    import VueSweetalert from 'vue-sweetalert'

    Vue.use(VueTables.ClientTable, {
        compileTemplates: true,
        filterByColumn: true,
    });

    Vue.use(VueForm, {
        inputClasses: {
            valid: 'form-control-success',
            invalid: 'form-control-danger'
        }
    });

    Vue.use(Vuelidate);
    Vue.use(VueSweetalert);

    export default {
        name: 'Donations',
        data() {
            return {
                messagetitle: ' Donations List ',
                donations: [],
                errors: [],
                columns: ['_id', 'paymenttype', 'amount', 'upvotes'],
                options: {
                    headings: {
                        _id: 'ID',
                        paymenttype: 'Payment Type',
                        amount: 'Amount',
                        upvotes: 'Upvotes',
                    },
                },
            };
        },
        // Fetches Donations when the component is created.
        created() {
            this.loadDonations();
        },
        methods: {
            loadDonations: function() {
                DonationService.fetchDonations()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.donations = response.data;
                        console.log(this.donations);
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
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }

    #app1 {
        width: 60%;
        margin: 0 auto;
    }
</style>
