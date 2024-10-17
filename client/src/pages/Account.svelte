<script>
    import {jwtDecode} from "jwt-decode";
    import {authToken} from "../stores/auth.js";
    import {fetchWithAuth} from "../utils/api.js";
    import StickItem from "../components/sticks/StickItem.svelte";
    import BidList from "../components/bids/BidList.svelte";
    import Loading from "../components/Loading.svelte";
    import {BASE_BACKEND_URL} from "../config.js";

    const decodedToken = jwtDecode($authToken);


    const fetchData = async () => {
        const fetchSticksPromise = fetchWithAuth(`${BASE_BACKEND_URL}/sticks`);
        const fetchBidsPromise = fetchWithAuth(`${BASE_BACKEND_URL}/users/bids`);
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

        return Promise.all([fetchSticksPromise, fetchBidsPromise, delayPromise]).then(([sticksData, bidsData]) => {
            const wonAuctions = sticksData.filter(stick =>
                stick.bids.length > 0 &&
                new Date(stick.endDate) < new Date() &&
                stick.bids[stick.bids.length - 1].userId === decodedToken.id
            );

            let totalAmount = wonAuctions.reduce((sum, auction) => {
                // Get the highest bid amount
                const highestBid = auction.bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
                return sum + highestBid.amount;
            }, 0);

            return {wonAuctions, allBids: bidsData, totalAmount};
        });
    };
</script>

<section class="container-base py-10 flex flex-col gap-12">
    {#await fetchData()}
        <div class="col-span-full col-start-1 md:col-span-10 md:col-start-2 lg:col-start-4 lg:col-span-6 flex flex-col justify-center items-center">
            <div class="w-40 h-40">
                <Loading/>
            </div>
        </div>
    {:then data}
        <div class="flex flex-col gap-4">
            <h1 class="text-4xl font-bold text-blue-600">Hello,
                <span class="text-gray-800">
                {decodedToken.email}!
            </span>
            </h1>
            <p class="text-gray-500">You need to pay: <span class="font-semibold">${data.totalAmount.toFixed(2)}</span></p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="col-span-full md:col-span-2">
                <h2 class="text-2xl font-semibold text-gray-700 mb-4">List of won auctions:</h2>
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {#if data.wonAuctions.length > 0}
                        {#each data.wonAuctions as item}
                            <StickItem {item} className="col-span-full lg:col-span-1"/>
                        {/each}
                    {:else}
                        <p class="text-gray-400 text-lg">You haven't won any auctions yet...</p>
                    {/if}
                </div>
            </div>
            <div>
                <h2 class="text-2xl font-semibold text-gray-700 mb-4">History of all your bids:</h2>
                <div class="grid grid-cols-1 gap-2">
                    {#if data.allBids.length > 0}
                        <BidList bids={data.allBids} highlightHighest={false} className="max-h-[310px]"/>
                    {:else}
                        <p class="text-gray-400 text-lg">You haven't placed any bids yet...</p>
                    {/if}
                </div>
            </div>
        </div>
    {:catch error}
        <p class="text-red-500">Failed to load data.</p>
    {/await}
</section>
