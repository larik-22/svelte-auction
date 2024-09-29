<script>
    import {afterUpdate, onMount} from "svelte";
    import {getApiData} from "../utils/api.js";
    import page from "page";
    import Loading from "../components/Loading.svelte";

    export let params;
    const {id} = params.params;

    let loadingPromise = getApiData(`sticks/${id}`);
    let auctionStarted;
    $: console.log(auctionStarted)

    //after bid placed
    afterUpdate(() => {
        const fetchPromise = getApiData(`sticks/${id}`);
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            return data;
        });
    })

</script>

<!--1. Item Details component (CONSTANT)-->
<!--2. Countdown component (EITHER THIS OR BIDS VISIBLE)-->
<!--3. Bid List and add bids component (EITHER THIS OR COUNTDOWN)-->
<!--4. If error redirect to home-->
<section class="container-base grid grid-cols-12 py-10 min-h-[500px] gap-4">
    {#await loadingPromise}
        <div class="col-span-full col-start-1 md:col-span-10 md:col-start-2 lg:col-start-4 lg:col-span-6 flex flex-col justify-center items-center">
            <div class="w-40 h-40">
                <Loading/>
            </div>
        </div>
    {:then data}
        <div class="col-span-full lg:col-span-8">

        </div>
        <div class="col-span-full lg:col-span-4 lg:col-start-9">
            {#if new Date(data.startDate) < new Date()}
                <div class="bg-red-500 text-white p-4 rounded-lg">
                    Bids list here
                </div>
            {:else}
                <div class="bg-green-500 text-white p-4 rounded-lg">
                    Countdown here
                </div>
            {/if}
        </div>
    {:catch error}
        {page.redirect('/')}
    {/await}
</section>
