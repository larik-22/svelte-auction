<script>
    export let active;
</script>
<nav class="container flex justify-between gap-4 py-4">
    <h2>Logo goes here</h2>
    <ul class="flex items-center gap-4">
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul>
</nav>

<style>
    .active {
        @apply text-blue-500;
    }
</style>