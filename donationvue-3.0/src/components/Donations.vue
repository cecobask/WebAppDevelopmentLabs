<template>
    <div id="app1">
        <h3 class="vue-title">
            <i class="fa fa-list" style="padding: 3px"></i>{{ messagetitle }}
        </h3>
        <v-client-table :columns="columns" :data="donations" :options="options">
            <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
            <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteDonation(props.row._id)"></a>
            <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editDonation(props.row._id)"></a>
        </v-client-table>
    </div>
</template>

<script>
    import DonationService from '../services/donationservice';

    export default {
        name: 'Donations',
        data() {
            return {
                messagetitle: ' Donations List ',
                donations: [],
                errors: [],
                columns: ['_id', 'paymenttype', 'amount', 'upvotes', 'upvote', 'remove', 'edit'],
                options: {
                    headings: {
                        _id: 'ID',
                        paymenttype: 'Payment Type',
                        amount: 'Amount',
                        upvotes: 'Upvotes',
                    },
                    sortable: ['upvotes'],
                    perPage: 10,
                    filterable: ['paymenttype', 'amount', 'upvotes']
                },
                props: ['_id']
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
            // Fetches Donations when the component is created.
            upvote: function (id) {
                DonationService.upvoteDonation(id)
                    .then(response => {
                        console.log(response);
                        this.loadDonations();
                    })
                    .catch(error => {
                        this.errors.push(error);
                        console.log(error);
                    })
            },
            deleteDonation: function (id) {
                this.$swal({
                    title: 'Are you totally sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK, delete it',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result);
                    if (result.value === true) {
                        DonationService.deleteDonation(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data;
                                console.log(this.message);
                                this.loadDonations();
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Donation ' + JSON.stringify(response.data, null, 5), 'success')
                            })
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                                this.errors.push(error);
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'Your Donation still Counts!', 'info')
                    }
                })
            },
            editDonation: function (id) {
                this.$router.params = id;
                this.$router.push('edit');
            }
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
