<script>
    import {authToken} from "../stores/auth.js";
    import {isUserAdmin} from "../utils/auth.js";
    import Button from "./Button.svelte";
    import {jwtDecode} from "jwt-decode";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let bids;
    export let hasEnded;
    export let startingPrice;
    export let error = null;

    let loggedIn = $authToken !== null;
    let isAdmin = loggedIn && isUserAdmin();
    let amount;
    let focused = false;

    if(isAdmin){
        error = `Admins can't bid!`;
        focused = true;
    }
    bids.sort((a, b) => b.amount - a.amount);

    const handleBidSubmission = (e) => {
        e.preventDefault();
        validateBid();
        if (error) return;

        // if everything is ok, emit the event
        const newBid = {
            amount: amount,
            userId: jwtDecode($authToken).id
        }

        dispatch('submitBid', newBid);
        amount = '';
    }

    const validateBid = () => {
        error = null;

        if (!amount) {
            error = `Please enter a bid`;
            return;
        }

        if (amount < 0) {
            error = `Cannot put negative bid`;
            return;
        }

        const maxBid = bids.length > 0 ? bids[0].amount : startingPrice;
        if (amount <= maxBid) {
            error = `Your bid must be higher than the current highest bid: ${maxBid}`;
            return;
        }

        if (bids.length > 0) {
            const decoded = jwtDecode($authToken);
            if (bids[0].userId === decoded.id) {
                error = `You can't overbid yourself!`;
                return;
            }
        }
    };
</script>

<form class="flex flex-col space-y-2">
    <label for="item-input" class="text-gray-700 font-semibold">Enter Bid:</label>

    <div class="flex items-stretch space-x-3">
        <input
                type="number"
                id="item-input"
                placeholder="Type your bid..."
                bind:value={amount}
                disabled={!loggedIn || isAdmin || hasEnded}
                on:input={validateBid}
                on:focus={() => focused = true}
                on:blur={() => focused = false}
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
        />

        <div class="flex-shrink-0 items-stretch">
            <Button
                    className="h-full"
                    on:click={handleBidSubmission}
                    disabled={!loggedIn || isAdmin || hasEnded || error || !amount}
                    type="submit"
            >
                Place bid
            </Button>
        </div>

    </div>
    {#if error && focused}
        <div class="flex flex-col items-center py-2">
            <p class="text-red-500 text-sm p-2 bg-red-50 border border-red-500 rounded-md">{error}</p>
        </div>
    {/if}
</form>


