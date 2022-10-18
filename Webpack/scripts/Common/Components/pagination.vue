<template>
    <nav aria-label="pagination">
        <ul :class="['pagination', (paginationCentered === true) ? 'justify-content-center' : '']" v-if="totalPages > 1">
            <li class="page-item previous" v-if="totalPages > 0 && currentPageNumber > 1">
                <a class="page-link" href="#" aria-label="Previous" v-on:click.prevent="gotoPreviousPage()">
                    <span aria-hidden="true">&lsaquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item disabled previous" v-if="totalPages > 0 && currentPageNumber <= 1">
                <span class="page-link" aria-hidden="true">&lsaquo;</span>
                <span class="sr-only">Previous</span>
            </li>
            <li v-for="page in pages" :class="['page-item', (page === currentPageNumber) ? 'active' : '']">
                <a v-if="typeof page == 'number'" class="page-link" href="#" v-on:click.prevent="gotoPage(page)">{{page}}</a>
                <span v-else class="page-link">{{page}}</span>
            </li>
            <li class="page-item  next" v-if="totalPages > 0 && currentPageNumber < totalPages">
                <a class="page-link" href="#" aria-label="Next" v-on:click.prevent="gotoNextPage()">
                    <span aria-hidden="true">&rsaquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <li class="page-item disabled next" v-if="totalPages > 0 && currentPageNumber >= totalPages">
                <span class="page-link" aria-hidden="true">&rsaquo;</span>
                <span class="sr-only">Next</span>
            </li>
        </ul>
    </nav>
</template>


<script lang="ts">

    import { defineComponent } from "vue"


    export default defineComponent({
        props: {
            currentPageNumber: {
                type: Number, default: 1
            },
            totalNumberOfItems: {
                type: Number,
                default: 0
            },
            itemsPerPage: {
                type: Number,
                default: 20
            },
            maxVisiblePages: {  // number of pagenumbers visible in pagination
                type: Number,
                default: 8
            },
            paginationCentered: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            gotoPreviousPage: function () {
                let self = this;
                if (self.currentPageNumber > 1) {
                    this.$emit('changepagenumber', self.currentPageNumber - 1)
                }
            },
            gotoNextPage: function () {
                let self = this;
                if (self.currentPageNumber < self.totalPages) {
                    this.$emit('changepagenumber', self.currentPageNumber + 1)
                }
            },
            gotoPage: function (pageNumber: Number) {
                let self = this;
                if (typeof (pageNumber) == 'number'
                    && pageNumber > 0
                    && pageNumber <= self.totalPages) {
                    this.$emit('changepagenumber', pageNumber)
                }
            },
        },
        computed: {
            totalPages: function (): number {
                let self = this;
                if (self.itemsPerPage <= 0 || self.totalNumberOfItems <= 0) {
                    return 0;
                }
                return Math.ceil(self.totalNumberOfItems / self.itemsPerPage);
            },
            pages: function () : any[] {
                let self = this;

                if (self.totalPages > 0) {
                    // make an array of all pagenumbers and let the pagenumbers start at 1
                    let allPages = Array(self.totalPages);
                    for (let i = 0; i < allPages.length; i++) {
                        allPages[i] = i + 1;
                    }

                    let visiblePages = Math.max(self.maxVisiblePages, 5);

                    if (allPages.length < visiblePages) {
                        return allPages;
                    } else {
                        let lowerBound = visiblePages - 2;
                        let upperBound = self.totalPages - visiblePages + 4;
                        let lastNumber = allPages[allPages.length - 1];
                        let filteredPages = allPages.slice(); // straight copy of array

                        if (self.currentPageNumber <= lowerBound) {
                            filteredPages.length = lowerBound;
                            filteredPages.splice(lowerBound, 2, "...", lastNumber);
                            return filteredPages;
                        }

                        if (self.currentPageNumber >= upperBound) {
                            filteredPages.splice(0, self.totalPages - lowerBound, 1, '...');
                            return filteredPages;
                        }

                        let allowedPages = visiblePages - 5;
                        let left = allowedPages / 2;
                        let right = allowedPages - allowedPages / 2;
                        filteredPages = filteredPages.slice(self.currentPageNumber - 1 - left, self.currentPageNumber + right);
                        filteredPages.unshift(1, '...');
                        filteredPages.push('...', lastNumber);

                        return filteredPages;
                    }
                }
                return [];
            },

        },
    });

</script>

