<script>
    import Trigger from "utility/trigger-svelte.js"
    import timeString from "utility/time-string.js"

    export let game

    Trigger.on("command-reset-hover", resetHover)
    Trigger.on("command-set-hover", setHover)

    let data = null
    let x = 0
    let y = 0
    let timeout = null

    $: hidden = data?.hidden

    $: resource = game?.state?.resources?.[data?.resource]

    $: cssVariables = `\
        --hover-x:${x + 12}px;\
        --hover-y:${y+ 2}px;\
        --translate-x:${x > window.innerWidth / 2 ? "calc(-100% - 15px)" : "0"};\
        --translate-y:${y > window.innerHeight / 2 ? "calc(-100% + 20px)" : "0"};\
    `

    function setHover(newData, newX, newY) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            clearTimeout(timeout)
            data = newData
            x = newX
            y = newY
        }, 500)
    }

    function resetHover(oldData) {
        clearTimeout(timeout)
        if (oldData === data) {
            data = null
        }
    }



</script>


{#if data && !hidden}
    <div class="hover" style={cssVariables}>
        {#if data.resource}
            {#if resource.value < resource.max}
                ETA: {timeString((resource.max - resource.value) / resource.boost)} / {timeString(resource.max / resource.boost)}
            {:else }
                You have it! / {timeString(resource.max / resource.boost)}
            {/if}
        {:else}
            {data ?? "I'm in loss."}
        {/if}
    </div>
{/if}

<style>
    div.hover {
        position: absolute;
        left : var(--hover-x);
        top : var(--hover-y);
        padding : 0.5em;
        background-color: #222222;
        border: 1px solid #777777;
        font-size: 16px;
        pointer-events: none;
        transform: translate(var(--translate-x), var(--translate-y));
        z-index : 1000;
        white-space: pre-line;
        text-align: center;
    }
</style>
