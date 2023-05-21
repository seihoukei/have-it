<script>
    import RESOURCES from "data/data-resources.js"
    import GameResource from "components/engine/elements/GameResource.svelte"

    export let resources = {}

    const RESOURCE_LIST = Object.keys(RESOURCES)
</script>

{#each RESOURCE_LIST as id}
    <GameResource {id} bind:resource={resources[id]} />
{/each}
