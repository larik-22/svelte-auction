<div class="loading-spinner">
    <div class="spinner-animation">
        <div></div>
    </div>
</div>

<style>
    @keyframes spinner-animation {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    .spinner-animation div {
        position: absolute;
        width: 50%;
        height: 50%;
        border: 5px solid #002663;
        border-top-color: transparent;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: spinner-animation 1s linear infinite;
    }
    .loading-spinner {
        display: inline-block;
        overflow: hidden;
        background: none;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .spinner-animation {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0;
    }
    .spinner-animation div { box-sizing: content-box; }
</style>