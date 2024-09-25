<script>
    import Button from "../components/Button.svelte";
    import Loading from "../components/Loading.svelte";
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import {fetchWithAuth, formatQueryParams, getApiData} from "../utils/api.js";
    import List from "../components/List.svelte";
    import SearchBar from "../components/SearchBar.svelte";
    import Filters from "../components/Filters.svelte";
    import page from "page";

    /**
     * TODO: Implement the following:
     * 1. Work on general layout of the page (responsive and mobile-friendly)
     * 2. Build the skeleton of all the components (Filters, SearchBar, List, Item)
     * 3. Implement the Filters component with query parameters
     * 4. Implement the SearchBar component with query parameters or on-the-fly search
     * 5. Implement the List component with the Item component (Probably use cards)
     */
    export let params;

    let filters = {
        length: "",
        weight: "",
        feature: "",
        typeOfTree: ""
    };

    beforeUpdate(() => {
        filters = decodeQueryParams(params.querystring);
    });

    let loadingPromise;
    afterUpdate(() => {
        const fetchPromise = getApiData("sticks", filters);
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            return data;
        });
    });

    async function filterChange(event) {
        filters = event.detail;
        const queryParams = formatQueryParams(filters);

        if (!queryParams) {
            page(params.pathname)
        } else {
            page(`${params.pathname}?${queryParams}`);
        }

    }

    const decodeQueryParams = (queryString) => {
        const defaultFilters = {
            length: "",
            weight: "",
            feature: "",
            typeOfTree: ""
        };

        if (!queryString) {
            return defaultFilters;
        }

        const params = new URLSearchParams(queryString.replace(/\?/g, '&'));
        const filters = {...defaultFilters};

        for (const [key, value] of params.entries()) {
            const decodedKey = decodeURIComponent(key);
            const decodedValue = decodeURIComponent(value);

            if (filters.hasOwnProperty(decodedKey)) {
                if (filters[decodedKey]) {
                    filters[decodedKey] += `,${decodedValue}`;
                } else {
                    filters[decodedKey] = decodedValue;
                }
            }
        }

        return filters;
    };
</script>

<!--since we are already inside <main> tag, sections is better for SEO and generally better practice-->
<section class="container grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 items-centers py-10">
    <div class="col-span-1 md:col-span-2 lg:col-span-3">
        <Filters on:filterChange={filterChange} filters={filters}/>
    </div>
    <div class="col-span-1 md:col-span-4 lg:col-span-9">
        <SearchBar/>
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

