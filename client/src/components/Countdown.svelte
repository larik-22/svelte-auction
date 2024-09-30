<script>
    import {createEventDispatcher, onMount} from "svelte";
    const dispatch = createEventDispatcher()
    export let start
    let remainingTime = calculateTimeRemaining(start);

    let timer;

    onMount(() => {
        timer = setInterval(() => {
            remainingTime = calculateTimeRemaining(start);
            if (remainingTime.total <= 0) {
                handleEnd();
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    });

    // Function to calculate remaining time (Has to be declared that way)
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
        dispatch('end')
    }
</script>


<div class="flex flex-col items-center gap-4 px-4 py-10 bg-gray-100 rounded-lg shadow border sticky top-24">
    <h2 class="text-xl font-semibold text-gray-800">Auction starts in:</h2>
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