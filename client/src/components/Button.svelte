<script>
    export let className = '';
    export let variant = '';

    let getVariant = () => {
        let defaultStyles = 'py-2 px-4 rounded transition-all';
        let variants = {
            primary: 'bg-blue-600 hover:bg-blue-800 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
            danger: 'bg-red-500 hover:bg-red-700 text-white',
        }

        switch (variant){
            case 'primary':
                return defaultStyles + ' ' + variants.primary;
            case 'secondary':
                return defaultStyles + ' ' + variants.secondary;
            case 'danger':
                return defaultStyles + ' ' + variants.danger;
            default:
                return defaultStyles + ' ' + variants.primary;
        }
    }
</script>

<button class={`${getVariant()} ${className}`} on:click>
    <slot></slot>
</button>
