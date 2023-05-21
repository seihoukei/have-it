<script>
    import interactive from "utility/interactive.js"
    import Trigger from "utility/trigger-svelte.js"
    export let id
    export let type
    export let game

    $: filters = game?.state?.upgradeFilters ?? {}
    $: state = filters[type]?.[id] ?? 0

    $: present = state === 1
    $: absent = state === -1

    function next() {
        Trigger("command-toggle-filter", type, id, 1)
    }

    function last() {
        Trigger("command-toggle-filter", type, id, -1)
    }

</script>

<div class="item"
     class:present
     class:absent
     use:interactive
     on:basicaction={next}
     on:specialaction={last}
>
    <slot />
    <div class="cross"></div>
</div>

<style>
    div.item {
        position: relative;
        opacity: 0.2;
        cursor: pointer;
        transition: opacity 0.2s;
        margin: -0.2em 0 0.2em 0;
    }

    div.present {
        opacity: 1;
    }

    div.absent {
        opacity: 1;
    }

    div.cross {
        position: absolute;
        left : 0;
        top : 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.2s;
        background:
                linear-gradient(45deg,
                    #44000000, #44000000 45%,
                    #440000FF 45%, #440000FF 55%,
                    #44000000 55%, #44000000
                ),
                linear-gradient(-45deg,
                    #44000000, #44000000 45%,
                    #440000FF 45%, #440000FF 55%,
                    #44000000 55%, #44000000
                );
    }

    div.absent div.cross {
        opacity: 1;
    }
</style>
