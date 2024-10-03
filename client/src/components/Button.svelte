<script>
    export let className = '';
    export let variant = '';
    export let disabled = false;
    export let type = 'button';

    let getVariant = () => {
        let defaultStyles = 'py-2 px-4 rounded transition-all duration-200 focus:outline focus:outline-2 focus:outline-black';
        let variants = {
            primary: 'bg-blue-600 hover:bg-blue-800 text-white',
            secondary: 'border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-500 ',
            danger: 'bg-red-500 hover:bg-red-700 text-white',
            icon: "flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-800 text-white"
        }

        switch (variant){
            case 'primary':
                return defaultStyles + ' ' + variants.primary;
            case 'secondary':
                return defaultStyles + ' ' + variants.secondary;
            case 'danger':
                return defaultStyles + ' ' + variants.danger;
            case 'icon':
                return defaultStyles + ' ' + variants.icon;
            default:
                return defaultStyles + ' ' + variants.primary;
        }
    }
</script>

<button class={`${getVariant()} ${className} disabled:bg-gray-200 disabled:cursor-not-allowed `} on:click disabled={disabled} type={type}>
    <slot></slot>
</button>
