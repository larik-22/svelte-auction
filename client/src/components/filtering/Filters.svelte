<script>
    import Button from "../Button.svelte";
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import CheckboxFilterBlock from "./CheckboxFilterBlock.svelte";

    const dispatch = createEventDispatcher();
    const possibleLength = ['short', 'medium', 'long'];
    const possibleWeight = ['light', 'medium', 'heavy'];
    const possibleFeatures = ['straight', 'curved', 'knotty', 'special'];

    export let filters = {
        length: "",
        weight: "",
        feature: "",
        typeOfTree: "",
    };

    let selectedLength = filters.length ? filters.length.split(",") : [];
    let selectedWeight = filters.weight ? filters.weight.split(",") : [];
    let selectedFeature = filters.feature ? filters.feature.split(",") : [];
    let selectedTypeOfTree = filters.typeOfTree ? filters.typeOfTree.split(",") : [];

    onMount(() => {
        dispatch("filterChange", filters);
    });

    afterUpdate(() => {
        filters = {
            ...filters,
            length: selectedLength.join(","),
            weight: selectedWeight.join(","),
            feature: selectedFeature.join(","),
            typeOfTree: selectedTypeOfTree.join(",")
        };

        dispatch("filterChange", filters);
    });

    const handleFilterReset = () => {
        if(areFiltersEmpty()) return;

        selectedLength = [];
        selectedWeight = [];
        selectedFeature = [];
        selectedTypeOfTree = [];

        filters = {
            length: "",
            weight: "",
            feature: "",
            typeOfTree: ""
        };

        dispatch('filterChange', filters);
    }

    const areFiltersEmpty = () => {
        return selectedLength.length === 0 &&
            selectedWeight.length === 0 &&
            selectedFeature.length === 0 &&
            selectedTypeOfTree.length === 0;
    }
</script>

<div class="flex flex-col gap-6 border rounded-xl p-6 bg-white drop-shadow-sm sticky top-24 ">
    <div class="flex flex-col gap-6">
        <CheckboxFilterBlock label="Length" options={possibleLength} bind:selectedOptions={selectedLength}/>
        <CheckboxFilterBlock label="Weight" options={possibleWeight} bind:selectedOptions={selectedWeight}/>
        <CheckboxFilterBlock label="Feature" options={possibleFeatures} bind:selectedOptions={selectedFeature}/>


        <Button variant="icon" on:click={handleFilterReset}>
            Reset all filters
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                   stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                   font-family="none" font-weight="bold" font-size="none" text-anchor="end"
                   style="mix-blend-mode: normal">
                    <g transform="scale(8.53333,8.53333)">
                        <path d="M15,3c-2.9686,0 -5.69718,1.08344 -7.79297,2.875c-0.28605,0.22772 -0.42503,0.59339 -0.36245,0.95363c0.06258,0.36023 0.31676,0.6576 0.66286,0.77549c0.3461,0.1179 0.72895,0.03753 0.99842,-0.20959c1.74821,-1.49444 4.01074,-2.39453 6.49414,-2.39453c5.19656,0 9.45099,3.93793 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.51129,-6.14834 -5.67138,-11 -11.94922,-11zM4,10l-4,6h3.05078c0.51129,6.14834 5.67138,11 11.94922,11c2.9686,0 5.69718,-1.08344 7.79297,-2.875c0.28605,-0.22772 0.42504,-0.59339 0.36245,-0.95363c-0.06258,-0.36023 -0.31676,-0.6576 -0.66286,-0.7755c-0.3461,-0.1179 -0.72895,-0.03753 -0.99842,0.20959c-1.74821,1.49444 -4.01074,2.39453 -6.49414,2.39453c-5.19656,0 -9.45099,-3.93793 -9.95117,-9h2.95117z"></path>
                    </g>
                </g>
            </svg>
        </Button>
    </div>
</div>