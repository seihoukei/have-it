<script>
    import RESOURCES from "data/data-resources.js"

    export let game
    export let id

    $: data = RESOURCES[id] ?? {}
    $: resource = game?.state?.resources?.[id] ?? {}
    $: seen = resource.seen
    $: progress = resource.value / resource.max
    $: available = resource.available

    $: cssVariables = `
        --bar-color: ${data.color ?? "#777777"};
        --bar-progress: ${progress * 100}%;
    `
</script>

{#if seen}
    <div class="resource"
         class:available
         style={cssVariables}>
        <div class="bar layer {data.class}"></div>
        <div class="icon-text layer">{data.text}</div>
        <div class="fade layer {data.class}"></div>
    </div>
{/if}

<style>
    div.resource {
        position: relative;
        min-width: 5em;
        min-height: 5em;
    }

    div.layer {
        position: absolute;
        left : 0;
        top : 0;
        right: 0;
        bottom: 0;
    }

    div.bar {
        background: linear-gradient(to top,
            var(--bar-color), var(--bar-color) var(--bar-progress),
            #444444 var(--bar-progress), #444444
        );
    }

    div.bar.circle {
        border-radius: 50%;
    }

    div.bar.hexagon {
        background: linear-gradient(60deg,
            #444444, #444444 35%,
            #44444400 35%, #44444400
        ),linear-gradient(-60deg,
                #444444, #444444 35%,
                #44444400 35%, #44444400
        ),linear-gradient(-120deg,
                #444444, #444444 35%,
                #44444400 35%, #44444400
        ),linear-gradient(120deg,
                #444444, #444444 35%,
                #44444400 35%, #44444400
        ),
        linear-gradient(to top,
                var(--bar-color), var(--bar-color) var(--bar-progress),
                #444444 var(--bar-progress), #444444
        );
        background-size: 2.5em 2.5em,  2.5em 2.5em,  2.5em 2.5em,  2.5em 2.5em, 5em 5em;
        background-repeat: no-repeat;
        background-position: 0 2.5em, 2.5em 2.5em, 2.5em 0, 0 0, 0 0;
    }

    div.bar.triangle {
        background: linear-gradient(120deg,
            #444444, #444444 50%,
            #44444400 50%, #44444400
        ),linear-gradient(-120deg,
                #444444, #444444 50%,
                #44444400 50%, #44444400
        ),
        linear-gradient(to top,
                var(--bar-color), var(--bar-color) var(--bar-progress),
                #444444 var(--bar-progress), #444444
        );
        background-size: 2.5em 4.5em,  2.5em 4.5em, 5em 4.5em;
        background-repeat: no-repeat;
        background-position: 0 0, 2.5em 0, 0 0;
    }

    div.icon-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        color: #FFFFFF;
        font-weight: bold;
    }

    div.fade.circle:not(div.available div) {
        background: radial-gradient(closest-side, #00000000, #00000000 50%, #00000077);
        border-radius: 50%;
    }

    div.fade.square:not(div.available div) {
        background:
            linear-gradient(to right, #00000077, #00000000 25%, #00000000 75%, #00000077),
            linear-gradient(to bottom, #00000077, #00000000 25%, #00000000 75%, #00000077);
    }

    div.fade.hexagon:not(div.available div) {
        background: linear-gradient(60deg,
            #00000000, #00000000 35%,
            #00000077 35%, #00000000 75%
        ),linear-gradient(-60deg,
                #00000000, #00000000 35%,
                #00000077 35%, #00000000 75%
        ),linear-gradient(-120deg,
                #00000000, #00000000 35%,
                #00000077 35%, #00000000 75%
        ),linear-gradient(120deg,
                #00000000, #00000000 35%,
                #00000077 35%, #00000000 75%
        );
        background-size: 2.5em 2.5em,  2.5em 2.5em,  2.5em 2.5em,  2.5em 2.5em;
        background-repeat: no-repeat;
        background-position: 0 2.5em, 2.5em 2.5em, 2.5em 0, 0 0;
    }

    div.fade.triangle:not(div.available div) {
        background: linear-gradient(120deg,
        #00000000, #00000000 50%,
        #00000077 50%, #00000000
        ),linear-gradient(-120deg,
                #00000000, #00000000 50%,
                #00000077 50%, #00000000
        );
        background-size: 2.5em 4.5em,  2.5em 4.5em;
        background-repeat: no-repeat;
        background-position: 0 0, 2.5em 0;
    }


</style>
