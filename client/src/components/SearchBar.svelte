<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();

    export let search = "";

    const handleChange = (e) => {
        dispatch("search", search);
    }
</script>

<div class="relative flex items-center">
    <input
            type="text"
            class="w-full p-2 pl-10 border border-gray-300 rounded-2xl placeholder-gray-300 text-black"
            placeholder="Search stick..."
            bind:value={search}
            on:input={handleChange}
            on:keydown={(e) => e.key === "Escape" && e.target.blur()}
    />
    <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-2 w-6 h-6 text-gray-400" viewBox="0,0,256,256">
        <g fill="#bbbbbb" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <g transform="scale(8.53333,8.53333)">
                <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
            </g>
        </g>
    </svg>
</div>