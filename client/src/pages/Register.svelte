<script>
    import {validateEmail, validatePassword} from "../utils/utils.js";
    import {BASE_BACKEND_URL} from "../config.js";
    import {handleAuthResponse} from "../utils/auth.js";

    export let params;

    let email = "";
    let password = "";
    let confirmPassword = "";
    let errorMsg = "";

    /**
     * Handles the registration process.
     * Validates the data, makes api request, and handles the response
     */
    const handleRegister = async () => {
        let isValid = validateData({email, password, confirmPassword});
        if (!isValid) return;

        const response = await fetch(`${BASE_BACKEND_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        try {
            await handleAuthResponse(response, 201);
        } catch (err) {
            errorMsg = err.message;
        }
    }

    /**
     * Validates the email and password on registration
     * @param data - the data to validate
     * @returns {boolean} - true if the data is valid, false otherwise
     */
    const validateData = (data) => {
        const {email, password, confirmPassword} = data;

        let validateEmailMsg = validateEmail(email);
        if (validateEmailMsg) {
            errorMsg = validateEmailMsg;
            return false;
        }

        let validatePasswordMsg = validatePassword(password);
        if (validatePasswordMsg) {
            errorMsg = validatePasswordMsg;
            return false;
        }

        if (password !== confirmPassword) {
            errorMsg = "Passwords do not match";
            return false;
        }

        return true;
    }

</script>

<main class="min-h-[600px] flex flex-col justify-center items-center">
    <form class="flex flex-col max-w-4xl gap-6 m-auto p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        {#if (errorMsg)}
            <p class="text-red-500 text-center text-sm p-2 bg-red-50 border border-red-500 rounded-md">{errorMsg}</p>
        {/if}
        <h1 class="text-2xl font-medium mb-2 text-center">Register</h1>
        <div class="flex flex-col gap-1">
            <label for="email" class="text-base font-medium">Email</label>
            <input type="email" placeholder="Enter your email"
                   autocomplete="email"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={email}>
        </div>
        <div class="flex flex-col gap-1">
            <label for="password" class="text-base font-medium">Password</label>
            <input type="password" placeholder="Enter your password"
                   autocomplete="new-password"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={password}>
        </div>
        <div class="flex flex-col gap-1">
            <label for="confirmPassword" class="text-base font-medium">Confirm Password</label>
            <input type="password" placeholder="Confirm your password"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   autocomplete="new-password"
                   required bind:value={confirmPassword}>
        </div>
        <button type="submit"
                class="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                on:click|preventDefault={handleRegister}>
            Register
        </button>
        <p class="text-center text-sm text-gray-400">Already have an account? <a href="/login" class="text-blue-500 underline">Login</a></p>
    </form>
</main>
