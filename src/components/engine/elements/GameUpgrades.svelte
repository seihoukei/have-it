<script>
    import UPGRADES from "data/data-upgrades.js"
    import GameUpgrade from "components/engine/elements/GameUpgrade.svelte"

    const UPGRADE_LIST = Object.keys(UPGRADES)

    export let upgrades = {}
</script>

{#each UPGRADE_LIST as id}
    <GameUpgrade {id} bind:upgrade={upgrades[id]} />
{/each}
