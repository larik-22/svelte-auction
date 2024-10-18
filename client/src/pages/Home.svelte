<script>
    import Loading from "../components/Loading.svelte";
    import { afterUpdate, beforeUpdate } from "svelte";
    import { formatQueryParams, getApiData } from "../utils/api.js";
    import SearchBar from "../components/filtering/SearchBar.svelte";
    import Filters from "../components/filtering/Filters.svelte";
    import page from "page";
    import { fade } from "svelte/transition";
    import StickList from "../components/sticks/StickList.svelte";
    import Sort from "../components/filtering/Sort.svelte";

    export let params;

    let filters = {
        length: "",
        weight: "",
        feature: "",
        typeOfTree: ""
    };

    let sort = {
        sortBy: "name",
        sortOrder: "asc"
    };

    let name = "";

    beforeUpdate(() => {
        const decodedParams = decodeQueryParams(params.querystring);
        filters = decodedParams.filters;
        name = decodedParams.name;
    });

    let loadingPromise;
    afterUpdate(() => {
        const fetchPromise = getApiData("sticks", { ...filters, name, ...sort });
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            return data;
        });
    });

    async function filterChange(event) {
        filters = event.detail;
        updateUrl({ ...filters, ...sort, name });
    }

    /**
     * Handles search event from SearchBar component
     * @param event
     */
    const handleSearch = (event) => {
        name = event.detail;
        updateUrl({ ...filters, ...sort, name });
    };

    const handleSort = (event) => {
        sort = event.detail;
        updateUrl({...filters, ...sort, name});
    };

    /**
     * Updates URL with new filters and sorts
     * @param object - new filters and sorts
     */
    const updateUrl = (object) => {
        const queryParams = formatQueryParams(object);
        if (!queryParams) {
            page(params.pathname)
        } else {
            page(`${params.pathname}?${queryParams}`);
        }
    };

    /**
     * Decodes query string in URL into Filters Object and name
     * @param queryString - query string from URL
     */
    const decodeQueryParams = (queryString) => {
        const defaultFilters = {
            length: "",
            weight: "",
            feature: "",
            typeOfTree: ""
        };

        if (!queryString) {
            return { filters: defaultFilters, name: "" };
        }

        const params = new URLSearchParams(queryString.replace(/\?/g, '&'));
        const filters = { ...defaultFilters };
        let name = "";

        for (const [key, value] of params.entries()) {
            const decodedKey = decodeURIComponent(key);
            const decodedValue = decodeURIComponent(value);

            if (filters.hasOwnProperty(decodedKey)) {
                if (filters[decodedKey]) {
                    filters[decodedKey] += `,${decodedValue}`;
                } else {
                    filters[decodedKey] = decodedValue;
                }
            } else if (decodedKey === "name") {
                name = decodedValue;
            }
        }

        return { filters, name };
    };
</script>

<!--since we are already inside <main> tag, sections is better for SEO and generally better practice-->
<section class="container-base grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 items-centers py-10">
    <div class="col-span-1 md:col-span-2 lg:col-span-3">
        <Filters on:filterChange={filterChange} filters={filters}/>
    </div>
    <div class="col-span-1 md:col-span-4 lg:col-span-9">
        <div class="grid grid-cols-6 gap-2">
            <div class="col-span-5">
                <SearchBar on:search={handleSearch}/>
            </div>
            <div class="col-span-1 flex items-stretch">
                <Sort on:sortChange={handleSort}/>
            </div>
        </div>
        {#await loadingPromise}
            <div class="w-full h-full flex flex-col items-center justify-center">
                <div class="w-40 h-40">
                    <Loading/>
                </div>
            </div>
        {:then data}
            <StickList items={data}/>
        {:catch error}
            <div class="w-full h-full flex flex-col items-center justify-center text-lg font-semibold" transition:fade={{duration:200}}>
                <p>No auctions available... Please try again</p>
                <p class="text-red-500">{error.message}</p>
            </div>
        {/await}
    </div>
</section>

