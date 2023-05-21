<script>
    import RESOURCES from "data/data-resources.js"
    import UIResource from "components/ui/elements/UIResource.svelte"

    export let game

    const RESOURCE_LIST = Object.keys(RESOURCES)

</script>

<div class="list" >
    {#each RESOURCE_LIST as id}
        <UIResource {game} {id} />
    {/each}
</div>

<style>
    div.list {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        background-color: #444444;
        padding: 1rem;
        row-gap: 1rem;
        column-gap: 1rem;
        overflow: hidden auto;
    }

</style>
