<script>
    import {authToken} from "../stores/auth.js";
    import {isUserAdmin} from "../utils/auth.js";

    let loggedIn = $authToken !== null;
    let isAdmin = loggedIn && isUserAdmin();
</script>


