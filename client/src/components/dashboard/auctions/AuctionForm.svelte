<script>
    import {isBlank} from "../../../utils/utils.js";

    export let auction = {id: null, name: '', startDate: '', endDate: ''};
    export let onSave = (formAuction) => {
    };
    export let onCancel = () => {
    };

    let formAuction = {...auction};
    let error = null;

    let startDate = formAuction.startDate ? new Date(formAuction.startDate).toISOString().slice(0, 16) : '';
    let endDate = formAuction.endDate ? new Date(formAuction.endDate).toISOString().slice(0, 16) : '';

    const handleSubmit = () => {
        formAuction.startDate = startDate;
        formAuction.endDate = endDate;

        try {
            validateForm(formAuction);
            onSave(formAuction);
            error = null;
        } catch (err) {
            error = err;
            return;
        }
    };

    const validateForm = (formData) => {
        validatePrice(formData);
        validateDates(formData.startDate, formData.endDate);
    }

    const validateDates = (startDate, endDate) => {
        if (Date.parse(startDate) > Date.parse(endDate)) {
            throw 'End date must be greater than start date';
        } else {
            console.log("wtf")
        }
    }

    const validatePrice = (formData) => {
        if (formData.bids && formData.bids.length > 0) {
            const lowestBid = formData.bids.sort((a, b) => a.amount - b.amount)[0].amount;
            if (formData.startingPrice > lowestBid) {
                throw 'Starting price must be less than the lowest bid';
            }
        }

        if (formData.startingPrice < 0) {
            throw 'Starting price must be greater than 0';
        }
    }

</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6 pt-4">
    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="name">
            Name <span class="text-red-500">*</span>
        </label>
        <input
                type="text"
                id="name"
                bind:value={formAuction.name}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.name) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        />
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="image">Image</label>
        <input
                type="text"
                id="image"
                bind:value={formAuction.image}
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="description">
            Description <span class="text-red-500">*</span>
        </label>
        <textarea
                id="description"
                bind:value={formAuction.description}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.description) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        ></textarea>
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="startingPrice">
            Starting Price <span class="text-red-500">*</span>
        </label>
        <input
                type="number"
                id="startingPrice"
                bind:value={formAuction.startingPrice}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.startingPrice) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        />
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="feature">
            Feature <span class="text-red-500">*</span>
        </label>
        <select
                id="feature"
                bind:value={formAuction.feature}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.feature) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        >
            <option value="straight">Straight</option>
            <option value="curved">Curved</option>
            <option value="knotty">Knotty</option>
            <option value="special">Special</option>
        </select>
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="length">
            Length <span class="text-red-500">*</span>
        </label>
        <select
                id="length"
                bind:value={formAuction.length}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.length) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
        </select>
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="weight">
            Weight <span class="text-red-500">*</span>
        </label>
        <select
                id="weight"
                bind:value={formAuction.weight}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(formAuction.weight) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
        </select>
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="startDate">
            Start Date <span class="text-red-500">*</span>
        </label>
        <input
                type="datetime-local"
                id="startDate"
                bind:value={startDate}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(startDate) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        />
    </div>

    <div>
        <label class="block text-gray-800 font-semibold mb-1" for="endDate">
            End Date <span class="text-red-500">*</span>
        </label>
        <input
                type="datetime-local"
                id="endDate"
                bind:value={endDate}
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-1
        {isBlank(endDate) ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'}"
                required
        />
    </div>

    {#if (error)}
        <p class="text-red-600 text-center text-sm p-2 bg-red-50 border border-red-500 rounded-md mb-6">
            {error}
        </p>
    {/if}

    <div class="flex justify-end gap-2 mt-4">
        <button type="button" on:click={onCancel} class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Cancel
        </button>
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save
        </button>
    </div>
</form>

