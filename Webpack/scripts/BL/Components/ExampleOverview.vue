<template>

    <!--Filter as checkbox-->
    <div v-if="filterUIisCheckbox" v-for="filterGroup in filterGroupList" class="d-flex flex-lg-row flex-column gap-6 gap-lg-10 pb-11 pb-lg-12">
        <div v-if="filterGroup && filterList(filterGroup).length > 0">
            {{filterGroup}}
            <div v-for="item in filterList(filterGroup)" class="filter">
                <input type="checkbox" :name=item.name v-on:click="clickFilter(filterGroup, item.id)">
                <label :for=item.name>{{item.name}}</label>
            </div>
        </div>
    </div>

    <!--Filter as Dropdown-->
    <div v-if="filterUIisDropdown" v-for="filterGroup in filterGroupList">
        <div class="d-flex flex-lg-row flex-column gap-6 gap-lg-10 pb-11 pb-lg-12">
            <div v-if="filterGroup && filterList(filterGroup).length > 0">
                <select class="form-select font-display bg-blue-ad text-white fs-4" v-on:change="clickFilter(filterGroup, Number($event.target.value))" aria-label="Default select example">
                    <option selected value="0">{{filterGroup}}</option>
                    <option v-for="item in filterList(filterGroup)" :value=item.id>{{item.name}}</option>
                </select>
            </div>
        </div>
    </div>

    <!--DocType Filters as checkbox-->
    <div v-if="docTypeUIisCheckbox" class="d-flex flex-lg-row flex-column gap-6 gap-lg-10 pb-11 pb-lg-12">
        <div v-for="item in docTypeList">
            <input type="checkbox" :name=item.name v-on:click="clickDocTypeFilter(item.id)">
            <label :for=item.name>{{item.name}}</label>
        </div>
    </div>

    <!--DocType filters as Dropdown-->
    <div v-if="docTypeUIisDropdown">
        <div class="d-flex flex-lg-row flex-column gap-6 gap-lg-10 pb-11 pb-lg-12">
            <div v-if="docTypeList && docTypeList.length > 0">
                <select class="form-select font-display bg-blue-ad text-white fs-4" v-on:change="clickDocTypeFilter(Number($event.target.value))" aria-label="Default select example">
                    <option selected value="0">{{docTypeFilterName}}</option>
                    <option v-for="item in docTypeList" :value=item.id>{{item.name}}</option>
                </select>
            </div>
        </div>
    </div>


    <!--Pagination-->
    <div class="pb-13">
        <div class="row g-6 g-lg-7">
            <div v-for="item in pagedItems" class="col-12 col-lg-3">
                <a :href=item.url>
                    <div class="row g-0 position-relative">
                        <img class="col-4 col-lg-12 h-auto picture" :src=item.imageUrl height="740" width="500" :alt=item.imageName />
                        <div class="col-8 col-lg-12 pictureOverlay d-flex flex-lg-row flex-column justify-content-between align-items-lg-center py-8 px-7">
                            <p class="text-white fw-light font-display fs-5 mb-0">{{item.fullName}}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <pagination :total-number-of-items="numberOfItems"
                :current-page-number="currentPage"
                :items-per-page="itemsPerPage"
                :pagination-centered="true"
                v-on:changepagenumber="changePageNumber">
    </pagination>
</template>


<script lang="ts">

    import { defineComponent, onMounted } from "vue"

    import filteringService from "../../Common/Services/filteringService"
    import pagination from "../../Common/Components/pagination.vue"
    import { FilteringConstants } from "../../Common/Constants/Constants"


    export default defineComponent({
        props: {
            itemApiUrl: { type: String, required: true },
            filterApiUrl: { type: String, default: undefined },
            overviewId: { type: Number, required: true },
            culture: { type: String, required: true },
            itemsPerPage: { type: Number, default: 24 },
        },
        data: function () {
            return {
                currentPage: Number(1),

                filterUI: Number(FilteringConstants.DROPDOWN), // Set type of used UI
                doctypeUI: Number(FilteringConstants.DROPDOWN), // Set type of used UI

                docTypeFilterName: String("Doctype filters") // Set name of DoctypeFilters
            }
        },
        components: {
            pagination
        },
        methods: {
            changePageNumber: function (paginationCurrentPage: number) {
                this.currentPage = filteringService.changePageNumber(paginationCurrentPage);
            },
            clickFilter: function (filterName: string, id: number) {
                filteringService.clickFilter(this.filterUI, filterName, id);
            },
            clickDocTypeFilter: function (id: number) {
                filteringService.clickDocTypeFilter(this.doctypeUI, id);
            },
            filterList: function (filterGroupName: string) {
                if (filterGroupName) {
                    return filteringService.filterList(filterGroupName);
                }
                return undefined;
            }

        },
        setup(props) {
            // cannot use keyword this, setup is called before resolving of data, computed and methods
            let initPage = async () => {
                filteringService.init(props.overviewId, props.culture, props.itemsPerPage, 1, FilteringConstants.FILTERMODEAND, false);

                if (props.filterApiUrl && props.filterApiUrl !== '') {
                    filteringService.handleFiltersApi(props.filterApiUrl);
                }
                if (props.itemApiUrl && props.itemApiUrl !== '') {
                    filteringService.handleItemsApi(props.itemApiUrl);
                }
            }
            onMounted(initPage);

            // to let the constructed variables/functions be known: return them
            return {
            }
        },
        computed: {
            pagedItems: function () {
                return filteringService.pagedItems.value;
            },
            numberOfItems: function () {
                return filteringService.numberOfItems.value;
            },
            filterGroupList: function () {
                return filteringService.filterGroupList();
            },
            docTypeList: function () {
                return filteringService.docTypeFilterList();
            },
            filterUIisCheckbox: function () {
                return this.filterUI == FilteringConstants.CHECKBOX;
            },
            filterUIisDropdown: function () {
                return this.filterUI == FilteringConstants.DROPDOWN;
            },
            docTypeUIisCheckbox: function () {
                return this.doctypeUI == FilteringConstants.CHECKBOX;
            },
            docTypeUIisDropdown: function () {
                return this.doctypeUI == FilteringConstants.DROPDOWN;
            }
        }
    })

</script>