<script>
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    // Accept start and end date as props
    export let start = null;
    export let end = null;

    // Mode prop: 'start' or 'end' to toggle countdown type
    export let mode = 'start'; // Default mode is countdown to start

    // Initialize remaining time based on selected mode
    let targetDate = mode === 'start' ? start : end;
    let remainingTime = calculateTimeRemaining(targetDate);

    let timer;

    onMount(() => {
        if (mode === 'start' && start) {
            targetDate = start;
        } else if (mode === 'end' && end) {
            targetDate = end;
        } else {
            console.error("Missing target date for countdown");
            return;
        }
        timer = setInterval(() => {
            targetDate = mode === 'start' ? start : end;
            remainingTime = calculateTimeRemaining(targetDate);
            if (remainingTime.total <= 0) {
                handleEnd();
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    });

    // Function to calculate remaining time (same as before)
    function calculateTimeRemaining(target) {
        const now = new Date().getTime();
        const difference = target - now;

        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        return {
            total: difference,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    const handleEnd = () => {
        clearInterval(timer);
        dispatch('end', mode);
    };
</script>

<!-- Adjusted display to indicate if it's a countdown to the start or end date -->
<div class="flex flex-col items-center gap-4 px-4 py-10 bg-gray-50 rounded-lg shadow border">
    <h2 class="text-xl font-semibold text-gray-800">
        Auction {mode === 'start' ? 'starts' : 'ends'} in:
    </h2>
    <div class="flex justify-center gap-4">
        <div class="w-20 flex flex-col items-center p-2 bg-white rounded-md shadow-sm">
            <div class="text-2xl font-bold text-gray-800">{remainingTime.days}</div>
            <div class="text-sm text-gray-600">Days</div>
        </div>
        <div class="w-20 flex flex-col items-center p-2 bg-white rounded-md shadow-sm">
            <div class="text-2xl font-bold text-gray-800">{remainingTime.hours}</div>
            <div class="text-sm text-gray-600">Hours</div>
        </div>
        <div class="w-20 flex flex-col items-center p-2 bg-white rounded-md shadow-sm">
            <div class="text-2xl font-bold text-gray-800">{remainingTime.minutes}</div>
            <div class="text-sm text-gray-600">Minutes</div>
        </div>
        <div class="w-20 flex flex-col items-center p-2 bg-white rounded-md shadow-sm">
            <div class="text-2xl font-bold text-gray-800">{remainingTime.seconds}</div>
            <div class="text-sm text-gray-600">Seconds</div>
        </div>
    </div>
</div>
