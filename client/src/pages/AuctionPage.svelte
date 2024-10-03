<script>
    import {afterUpdate, onMount} from "svelte";
    import {fetchWithAuth, getApiData} from "../utils/api.js";
    import page from "page";
    import Loading from "../components/Loading.svelte";
    import Countdown from "../components/Countdown.svelte";
    import BidList from "../components/BidList.svelte";
    import AddBid from "../components/AddBid.svelte";
    import {BASE_BACKEND_URL} from "../config.js";

    export let params;
    const {id} = params.params;

    let auctionStarted = false;
    let auctionEnded = false;

    let bids = [];
    let intervalId;
    let addBidError;
    let isFetching = false;
    let postDebounce = false;

    onMount(() => {
        intervalId = setInterval(() => {
            if (auctionStarted && !auctionEnded && !isFetching) {
                fetchData();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    });

    /**
     * Fetches the data for the auction stick.
     * Bids should be updated to trigger a re-render.
     */
    const fetchData = async () => {
        if (isFetching || postDebounce) return;

        const fetchPromise = getApiData(`sticks/${id}`);
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

        return Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            auctionStarted = new Date(data.startDate) < new Date();
            auctionEnded = new Date(data.endDate) < new Date();
            bids = data.bids; // Set bids based on the fresh data
            return data;
        });
    };

    const postBid = async (bid) => {
        bid = { ...bid, stickId: parseInt(id) };
        try {
            isFetching = true;
            postDebounce = true; // Activate debounce to prevent immediate fetch
            bids = [...bids, bid]; // Optimistically update UI

            // Make POST request to backend
            await fetchWithAuth(`${BASE_BACKEND_URL}/bids`, {
                method: 'POST',
                body: JSON.stringify(bid),
            });

            addBidError = null;
        } catch (e) {
            addBidError = e.message;
        } finally {
            isFetching = false;
            setTimeout(() => {
                postDebounce = false;
            }, 1000);
        }
    };

    const handleTimerEnd = (e) => {
        const timer = e.detail;

        if (timer === 'start') {
            auctionStarted = true;
        } else {
            auctionEnded = true;
        }
    }

    const displayProperties = {
        typeOfTree: 'Type of Tree',
        length: 'Length',
        weight: 'Weight',
        feature: 'Feature',
        startingPrice: 'Starting price'
    };
</script>

<style>
    .border-item:last-of-type {
        border-bottom: none;
    }
</style>
<section class="container-base grid grid-cols-12 py-10 min-h-[500px] gap-6">
    {#await fetchData()}
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
                            {#if displayProperties[key]}
                                <div class="border-item border-b border-gray-200 py-3 flex items-center gap-6">
                                    <p class="text-gray-600 min-w-[28%]">{displayProperties[key]}:</p>
                                    <p class="text-gray-800 uppercase font-semibold text-lg">{value}</p>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-full lg:col-span-6 lg:col-start-7 sticky top-24">
            {#if auctionStarted}
                <div class="sticky top-24 flex flex-col gap-y-6">
                    {#if auctionEnded}
                        <p class="text-xl font-semibold text-gray-800 text-center">Auction has ended...</p>
                    {:else}
                        <Countdown end={new Date(data.endDate)} mode="end" on:end={handleTimerEnd}/>
                    {/if}
                    <BidList bids={bids} hasEnded={auctionEnded}/>
                    <AddBid
                            bids={bids}
                            hasEnded={auctionEnded}
                            startingPrice={data.startingPrice}
                            on:submitBid={(e) => postBid(e.detail)}
                            error={addBidError}
                    />
                </div>
            {:else}
                <Countdown start={new Date(data.startDate)} on:end={handleTimerEnd}/>
            {/if}


        </div>
    {:catch error}
        {page.redirect('/')}
    {/await}
</section>
