<script>
    import Button from "../components/Button.svelte";
    import Loading from "../components/Loading.svelte";
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { fetchWithAuth, formatQueryParams, getApiData } from "../utils/api.js";
    import List from "../components/sticks/StickList.svelte";
    import SearchBar from "../components/filtering/SearchBar.svelte";
    import Filters from "../components/filtering/Filters.svelte";
    import page from "page";

    export let params;

    let filters = {
        length: "",
        weight: "",
        feature: "",
        typeOfTree: ""
    };
    let name = "";

    beforeUpdate(() => {
        const decodedParams = decodeQueryParams(params.querystring);
        filters = decodedParams.filters;
        name = decodedParams.name;
    });

    let loadingPromise;
    afterUpdate(() => {
        const fetchPromise = getApiData("sticks", { ...filters, name });
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            return data;
        });
    });

    async function filterChange(event) {
        filters = event.detail;
        updateUrl({ ...filters, name });
    }

    /**
     * Handles search event from SearchBar component
     * @param event
     */
    const handleSearch = (event) => {
        name = event.detail;
        updateUrl({ ...filters, name });
    };

    /**
     * Updates URL with new filters
     * @param filters - new filters
     */
    const updateUrl = (filters) => {
        const queryParams = formatQueryParams(filters);
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
        <SearchBar on:search={handleSearch}/>
        {#await loadingPromise}
            <div class="w-full h-full flex flex-col items-center justify-center">
                <div class="w-40 h-40">
                    <Loading/>
                </div>
            </div>
        {:then data}
            <List items={data}/>
        {:catch error}
            <div class="w-full h-full flex flex-col items-center justify-center text-lg font-semibold">
                <p>No auctions available... Please try again</p>
                <p class="text-red-500">{error.message}</p>
            </div>
        {/await}
    </div>
</section>

