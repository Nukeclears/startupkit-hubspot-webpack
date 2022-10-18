<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-9 my-5 mx-lg-auto">
                <a class="searchResult" :href="item.url" v-for="item in pagedItems" :key="item.id">
                    <div class="image">
                        <img :src="item.imageUrl" v-if="item.imageUrl" class="img-fluid" />
                    </div>
                    <div class="content">
                        <h3>{{item.name}}</h3>
                        <p>{{item.description}}</p>
                    </div>
                </a>
            </div>
        </div>
        <pagination :total-number-of-items="numberOfItems"
                    :current-page-number="currentPage"
                    :items-per-page="itemsPerPage"
                    :pagination-centered="true"
                    v-on:changepagenumber="changePageNumber">
        </pagination>
    </div>
</template>

<script lang="ts">

    import { defineComponent, onMounted } from "vue"

    import queryStringService from "../../Common/Services/queryStringService"
    import apiService from "../../Common/Services/apiService"
    import pagination from "../../Common/Components/pagination.vue"

    export default defineComponent({
        props: {
            searchApiUrl: { type: String, required: true },
            culture: { type: String, required: true },
            itemsPerPage: { type: Number, default: 24 }
        },
        data: function () {
            return {
                searchInput: String(''),
                searchResult: Array([]),
                currentPage: Number(1),
            }
        },
        methods: {
            handleApi: function () {
                apiService.fetchApiPost(this.searchApiUrl, this.searchInput, this.setSearchResult(), this.onInvalid(), this.onError());
            },
            setSearchResult: function (data) {
                let self = this;
                if (data !== null && data.length > 0) {
                    self.searchResult = data;
                    self.currentPage = 1;
                }
            },
            onInvalid: function () {
                console.error("invalid Api call search");
            },
            onError: function () {
                console.error("error in Api call search");
            },
            changePageNumber: function (paginationCurrentPage: number) {
                this.currentPage = paginationCurrentPage;
            },
        },
        setup(props) {
            // cannot use keyword this, setup is called before resolving of data, computed and methods
            let initPage = async () => {
                props.searchInput = queryStringService.getQueryStringParameter("q");
                if (props.searchInput != null && props.searchInput.trim() != '') {
                    this.handleApi();
                }
            }
            onMounted(initPage);
        },
        computed: {
            numberOfItems: function () {
                if (this.searchResult) {
                    return this.searchResult.length;
                } else {
                    return 0;
                }
            },
            pagedItems: function () {
                if (this.searchResult && this.itemsPerPage > 0) {
                    let start = (this.currentPage - 1) * this.itemsPerPage;
                    let end = start + this.itemsPerPage;
                    return this.searchResult.slice(start, end);
                } else {
                    return this.searchResult;
                }
            }

        },
    })
</script>