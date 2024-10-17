<script>
    import {validateEmail, validatePassword} from "../utils/utils.js";
    import {handleAuthResponse} from "../utils/auth.js";
    import {BASE_BACKEND_URL} from "../config.js";

    export let params

    let email = "";
    let password = "";
    let errorMsg = "";

    /**
     * Handles the login process.
     * Validates the data, makes api request, and handles the response
     */
    const handleLogin = async () => {
        let isValid = validateData(email, password);
        if (!isValid) return;

        const response = await fetch(`${BASE_BACKEND_URL}/tokens`, {
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
            await handleAuthResponse(response, 200);
        } catch (err) {
            errorMsg = err.message;
        }
    }

    /**
     * Validates the email and password on login
     * @param email - the email to validate
     * @param password - the password to validate
     * @returns {boolean} - true if the data is valid, false otherwise
     */
    const validateData = (email, password) => {
        let emailError = validateEmail(email);
        if (emailError) {
            errorMsg = emailError;
            return false;
        }

        let passwordError = validatePassword(password);
        if (passwordError) {
            errorMsg = passwordError;
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
        <h1 class="text-2xl font-medium mb-2 text-center">Login to your account</h1>
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
                   autocomplete="current-password"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={password}>
        </div>
        <button type="submit"
                class="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                on:click|preventDefault={handleLogin}>
            Login
        </button>
        <p class="text-center text-sm text-gray-400">Don't have an account? <a href="/register" class="text-blue-500 underline">Register</a></p>
    </form>
</main>
