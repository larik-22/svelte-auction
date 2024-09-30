<script>
    import {afterUpdate, onMount} from "svelte";
    import {getApiData} from "../utils/api.js";
    import page from "page";
    import Loading from "../components/Loading.svelte";
    import Countdown from "../components/Countdown.svelte";
    import BidList from "../components/BidList.svelte";
    import AddBid from "../components/AddBid.svelte";

    export let params;
    const {id} = params.params;

    let loadingPromise = getApiData(`sticks/${id}`);
    let auctionStarted;

    afterUpdate(() => {
        const fetchPromise = getApiData(`sticks/${id}`);
        const delayPromise = new Promise(resolve => setTimeout(resolve, 300));

        loadingPromise = Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            auctionStarted = new Date(data.startDate) < new Date();
            return data;
        });
    })

    const handleTimerEnd = () => auctionStarted = true;

    // We need to display only these properties, but still want to keep the rest in the data object
    const displayProperties = ['typeOfTree', 'length', 'weight', 'feature'];
</script>

<style>
    .border-item:last-of-type {
        border-bottom: none;
    }
</style>
<section class="container-base grid grid-cols-12 py-10 min-h-[500px] gap-6">
    {#await loadingPromise}
        <div class="col-span-full col-start-1 md:col-span-10 md:col-start-2 lg:col-start-4 lg:col-span-6 flex flex-col justify-center items-center">
            <div class="w-40 h-40">
                <Loading/>
            </div>
        </div>
    {:then data}
        <div class="col-span-full lg:col-span-6">
            <div class="grid grid-cols-8 gap-4">
                <div class="col-span-full">
                    <img src={data.image} alt={data.name}
                         class="w-full h-full object-cover rounded-lg max-h-[500px] shadow"/>
                </div>
                <div class="col-span-full border rounded-md bg-gray-50">
                    <div class="border-b py-4 bg-gray-100">
                        <p class="text-lg font-semibold px-4 text-gray-800">Stick details</p>
                    </div>
                    <div class="px-4">
                        {#each Object.entries(data) as [key, value]}
                            {#if displayProperties.includes(key)}
                                <div class="border-item border-b border-gray-200 py-3 flex items-center gap-6">
                                    <p class="text-gray-600 min-w-[28%]">{key}:</p>
                                    <p class="text-gray-800 uppercase font-semibold text-lg">{value}</p>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-full lg:col-span-6 lg:col-start-7">
            {#if auctionStarted}
                <BidList bids={data.bids}/>
                <AddBid/>
            {:else}
                <Countdown start={new Date(data.startDate)} on:end={handleTimerEnd}/>
            {/if}
        </div>
    {:catch error}
        {page.redirect('/')}
    {/await}
</section>
