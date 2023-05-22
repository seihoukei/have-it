<script>
    import RESOURCES from "data/data-resources.js"
    import GameResource from "components/engine/elements/GameResource.svelte"

    export let resources = {}
    export let game

    const RESOURCE_LIST = Object.keys(RESOURCES)
</script>

{#each RESOURCE_LIST as id, index}
    <GameResource {game} {id} {index} bind:resource={resources[id]} />
{/each}
