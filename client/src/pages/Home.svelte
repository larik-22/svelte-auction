<script>
    import Button from "../components/Button.svelte";
    import Loading from "../components/Loading.svelte";
    import {onMount} from "svelte";
    import {fetchWithAuth, getApiData} from "../utils/api.js";
    import List from "../components/List.svelte";
    import SearchBar from "../components/SearchBar.svelte";
    import Filters from "../components/Filters.svelte";
    import { BASE_BACKEND_URL } from "../config.js";

    /**
     * TODO: Implement the following:
     * 1. Work on general layout of the page (responsive and mobile-friendly)
     * 2. Build the skeleton of all the components (Filters, SearchBar, List, Item)
     * 3. Implement the Filters component with query parameters
     * 4. Implement the SearchBar component with query parameters or on-the-fly search
     * 5. Implement the List component with the Item component (Probably use cards)
     */
    let stickData = [];
    let filters = {};
    let loadingPromise;

    onMount(() => {
        const fetchPromise = getApiData("sticks", filters);
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300 ));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            stickData = data;
            return data;
        });
    });

</script>

<main class="container flex py-8 gap-4">
    <div class="w-1/4">
        <Filters />
    </div>

    <div class="w-3/4">
        <div class="mb-4">
            <SearchBar/>
        </div>

        {#await loadingPromise}
            <div class="w-full flex flex-col justify-center items-center">
                <div class="w-40 h-40">
                    <Loading />
                </div>
            </div>
        {:then data}
            <div>
                {#if stickData.length > 0}
                    <List items={stickData}/>
                {:else}
                    <div class="w-full p-10 flex flex-col justify-center items-center">
                        <p class="text-2xl">No auctions available...</p>
                    </div>
                {/if}
            </div>
        {:catch error}
            <div class="w-full p-10 flex flex-col justify-center items-center">
                <p class="text-2xl">No auctions available...</p>
            </div>
        {/await}
    </div>
</main>

    <!--[]  Filter block component-->
    <!--[]  Search bar component-->
    <!--[]  Item list and item component-->
    <!--[x]  Also components for buttons-->
