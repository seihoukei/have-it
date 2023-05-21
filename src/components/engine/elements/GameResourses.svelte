<script>
    import RESOURCES from "data/data-resources.js"
    import GameResourse from "components/engine/elements/GameResourse.svelte"

    export let resources = {}

    const RESOURCE_LIST = Object.keys(RESOURCES)
</script>

{#each RESOURCE_LIST as id}
    <GameResourse {id} bind:resource={resources[id]} />
{/each}
