<script>
    import Trigger from "utility/trigger-svelte.js"

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

    function timeDisplay(value) {
        if (value < 60) {
            return value.toFixed(1) + "s"
        } else {
            const seconds = value % 60 | 0
            const minutes = value / 60 % 60 | 0
            const hours = value / 3600 | 0
            return (hours > 100
                    ? `${hours}:${minutes}`
                    : `${hours}:${minutes}:${seconds}`
            )
                .replace(/:(\d)(?=:|$)/g, ":0$1") // add leading zeroes for parts
                .replace(/^(00?:)*0?/g, "") // remove leading zeroes overall
        }
    }

</script>


{#if data && !hidden}
    <div class="hover" style={cssVariables}>
        {#if data.resource}
            {#if resource.value < resource.max}
                ETA: {timeDisplay(resource.max - resource.value)} / {timeDisplay(resource.max)}
            {:else }
                You have it! / {timeDisplay(resource.max)}
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
