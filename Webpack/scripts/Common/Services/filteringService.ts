// Filtering Service
//
// import:  import filteringService from '../../services/filteringService';
// usage:   filteringService.functionName()


import { ref, unref, computed } from "vue"
import { FilteringConstants } from "../../Common/Constants/Constants"
import apiService from "../../Common/Services/apiService"


export class DocTypeFilterType {
    public id: number = 0;
    public docTypeAlias: string = '';
    public name: string = '';
    public active: boolean = false;
}


export class FilterType {
    public id: number = 0;
    public name: string = '';
    public active: boolean = false;
}

export class FiltersType {
    public name: string = '';
    public filters: Array<FilterType>;
    constructor() {
        this.filters = new Array<FilterType>();
    }
}

export class OverviewFilterType {
    public parentId: number = 0;
    public culture: string = '';
    public filters: Array<FiltersType>;
    public docTypeFilters: Array<DocTypeFilterType>;
    constructor() {
        this.filters = new Array<FiltersType>();
        this.docTypeFilters = new Array<DocTypeFilterType>();
    }
}



export default new class {
    //PROPERTIES
    allItems: any = ref([]); // ref to make it reactive
    overviewFilter = ref<OverviewFilterType>(new OverviewFilterType());
    itemsPerPage: any = ref(24);
    currentPage: any = ref(1);
    filterMode: any = FilteringConstants.FILTERMODEOR;
    disableUnreferencedFilters: any = false;


    //COMPUTED
    // all filtered items
    filteredItems = computed(() => {
        let items = unref(this.allItems);
        items = this.filterByDocTypes(items);
        return this.filterByFilters(items);
    });
    numberOfItems = computed(() => {
        let self = this;
        if (this.filteredItems) {
            return this.filteredItems.value.length;
        } else {
            return 0;
        }
    });
    // filterd items, in pages
    pagedItems = computed(() => {
        let self = this;
        if (self.filteredItems.value && self.itemsPerPage > 0) {
            let start = (self.currentPage.value - 1) * self.itemsPerPage;
            let end = start + self.itemsPerPage;
            return self.filteredItems.value.slice(start, end);
        } else {
            return self.filteredItems;
        }
    });


    //METHODS
    // initialize values
    init(parentId: number, culture: string, itemsPerPage: number, currentPage: number, filterMode: string, disableUnreferencedFilters: boolean) {
        this.overviewFilter.value.parentId = parentId;
        this.overviewFilter.value.culture = culture;
        this.itemsPerPage = itemsPerPage;
        this.currentPage.value = currentPage;
        this.filterMode = filterMode;
        this.disableUnreferencedFilters = disableUnreferencedFilters;
    }

    // Get FilterGroupList: all filtergroups
    filterGroupList() {
        if (this.overviewFilter.value && this.overviewFilter.value.filters.length > 0) {
            return this.overviewFilter.value.filters.map(x => x.name);
        }
        return undefined;
    }

    // Get filterlist: all filters of certain filterGroup
    filterList(filtername: string) {
        if (this.overviewFilter.value && this.overviewFilter.value.filters.length > 0) {
            return this.overviewFilter.value.filters.find(x => x.name === filtername)?.filters;
        }
        return undefined;
    };

    // Get docTyeFilterList
    docTypeFilterList() {
        if (this.overviewFilter.value && this.overviewFilter.value.docTypeFilters.length > 0) {
            return this.overviewFilter.value.docTypeFilters;
        }
        return undefined;
    }


    // Get items from API
    handleItemsApi(itemApiUrl: string) {
        if (itemApiUrl === undefined || itemApiUrl === null || itemApiUrl === '') {
            console.error("no itemApiUrl given");
        }
        else {
            apiService.fetchApiPost(itemApiUrl, { overviewFilter: this.overviewFilter.value }, this.setItems.bind(this)); // this is a class, so setItems needs to be bound
        }
    }
    setItems(data: any) {
        //console.log(data);
        this.allItems.value = data.items;
    }



    // Get filters and docTypeFilters from API
    handleFiltersApi(filterApiUrl: string) {
        if (filterApiUrl === undefined || filterApiUrl === '' || filterApiUrl === null) {
            console.error("no filterApiUrl given");
        }
        else {
            apiService.fetchApiPost(filterApiUrl, { overviewFilter: this.overviewFilter.value }, this.setFilters.bind(this)); // this is a class, so setFiltrs needs to be bound
        }
    }
    setFilters(data: any) {
        //console.log(data);
        this.overviewFilter.value.filters = new Array<FiltersType>();
        this.overviewFilter.value.docTypeFilters = new Array<DocTypeFilterType>();
        if (data && data.overviewFilter && data.overviewFilter.filters) {
            this.overviewFilter.value.filters = data.overviewFilter.filters;
        }
        if (data && data.overviewFilter && data.overviewFilter.docTypeFilters) {
            this.overviewFilter.value.docTypeFilters = data.overviewFilter.docTypeFilters;
        }
    }



    // Perform Filters
    filterByFilters(items: any) {
        let self = this;
        if (items && self.overviewFilter.value.filters) {

            let activeFilters = new Array<FilterType>();
            self.overviewFilter.value.filters.forEach(x => {
                activeFilters = activeFilters.concat(x.filters.filter(y => y.active));
            });

            if (activeFilters && activeFilters.length > 0) {
                return items.filter(function (item: any) {
                    if (item.filterids != null) {

                        // FILTERMODEOR: return true if one of the filters found
                        if (self.filterMode === FilteringConstants.FILTERMODEOR) {
                            return activeFilters.some(x => item.filterids.includes(x.id));
                        }
                        // FILTERMODEAND: return true if all of the filters found
                        else {
                            return activeFilters.every(x => item.filterids.includes(x.id));
                        }

                    }
                    return false;
                });
            }
        }
        return items;
    }

    //Perform DocTypeFilters
    filterByDocTypes(items: any) {
        if (items && this.overviewFilter.value.docTypeFilters) {
            let activeDocTypes = this.overviewFilter.value.docTypeFilters.filter(x => x.active); // all doctypes that are checked
            if (activeDocTypes !== undefined && activeDocTypes.length > 0) {
                return items.filter((x: any) => activeDocTypes.find(y => y.id === x.docTypeId)?.active);
                // return all items of which the docType is within the checked docTypes
            }
        }
        return items;
    }


    // Click Filter Action
    clickFilter(uiType: number, filterName: string, id: Number) {
        switch (uiType) {
            case FilteringConstants.DROPDOWN:
                this.clickFilterDropDown(filterName, id);
                break;
            case FilteringConstants.CHECKBOX:
                this.clickFilterCheckbox(filterName, id);
                break;
            case FilteringConstants.RADIOBUTTONLIST:
                console.error("FilteringService: Radiobutton not yet implemented");
                break;
            default:
        }
    }

    //Actions for filterclicks in dropdowns
    clickFilterDropDown(filterName: string, id: Number) {

        let filterGroup = this.overviewFilter.value.filters.find(x => x.name === filterName);

        if (filterGroup) {

            // dropdown: so all other options must be set to false
            filterGroup.filters.forEach(x => x.active = false);

            if (id > 0) {
                let filter = filterGroup.filters.find(x => x.id === id);
                if (filter) {
                    filter.active = true;
                }
            }
        }
    }

    // Actions for filterclicks in checkboxes
    clickFilterCheckbox(filterName: string, id: Number) {

        if (!this.isCheckBoxDisabled(filterName, id)) {

            let filterGroup = this.overviewFilter.value.filters.find(x => x.name === filterName);

            if (filterGroup) {
                if (id <= 0) {
                    // id <= 0 so set all options to false
                    filterGroup.filters.forEach(x => x.active = false);
                }
                else {
                    let filter = filterGroup.filters.find(x => x.id === id);
                    if (filter) {
                        filter.active = !filter.active;
                    }
                }
            }
        }
    }


    // Click DocTypeFilter Action
    clickDocTypeFilter(uiType: number, id: Number) {
        switch (uiType) {
            case FilteringConstants.DROPDOWN:
                this.clickDocTypeFilterDropDown(id);
                break;
            case FilteringConstants.CHECKBOX:
                this.clickDocTypeFilterCheckbox(id);
                break;
            case FilteringConstants.RADIOBUTTONLIST:
                console.error("FilteringService: Radiobutton not yet implemented");
                break;
            default:
        }
    }


    //Actions for DoctypeFilterClicks in dropdowns
    clickDocTypeFilterDropDown(id: Number) {
        // dropdown: so all other options must be set to false
        this.overviewFilter.value.docTypeFilters.forEach(x => x.active = false);
        if (id > 0) {
            let docTypeFilter = this.overviewFilter.value.docTypeFilters.find(x => x.id === id);
            if (docTypeFilter) {
                docTypeFilter.active = true;
            }
        }
    }

    // Actions for DoctypeFilterClicks in checkbox
    clickDocTypeFilterCheckbox(id: any) {
        if (id <= 0) {
            this.overviewFilter.value.docTypeFilters.forEach(x => x.active = false);
        }
        else {
            let docTypeFilter = this.overviewFilter.value.docTypeFilters.find(x => x.id === id);
            if (docTypeFilter) {
                docTypeFilter.active = !docTypeFilter.active;
            }
        }
    }


    // UI functions
    changePageNumber(paginationCurrentPage: number) {
        this.currentPage.value = paginationCurrentPage;
        return this.currentPage.value;
    }


    // Lookup functions: overridden functions for the two types
    isActiveFilter(filterName: string, filter: FilterType): boolean;
    isActiveFilter(filterName: string, filter: DocTypeFilterType): boolean;

    isActiveFilter(filterName: string, filter: any): boolean {
        let filterGroup = this.overviewFilter.value.filters.find(x => x.name === filterName);
        if (filterGroup && filter.id > 0) {
            let currentFilter = filterGroup.filters.find(x => x.id === filter.id);
            if (currentFilter) {
                return currentFilter.active;
            }
        }
        return false;
    }

    // Returns true if a filter needs to be disabled because the items containing this filter hava already been filtered out
    // so clicking would be useless
    isCheckBoxDisabled(filterName: string, id: Number) {
        let filterGroup = this.overviewFilter.value.filters.find(x => x.name === filterName);
        if (filterGroup) {
            if (this.disableUnreferencedFilters && (this.filteredItems.value.length > 0)) {
                return !this.filteredItems.value.some((item: any) => item.filterids != null && item.filterids.includes(id));
            }
        }
        return false;
    }

}