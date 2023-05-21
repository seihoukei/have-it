<script>
    import UPGRADES from "data/data-upgrades.js"
    import UIUpgrade from "components/ui/elements/UIUpgrade.svelte"
    import UIUpgradeFilters from "components/ui/elements/UIUpgradeFilters.svelte"

    export let game

    const UPGRADE_LIST = Object.keys(UPGRADES)
        .sort((x,y) => UPGRADES[x].repeatable
            ? UPGRADES[y].repeatable
                ? 0
                : -1
            : UPGRADES[y].repeatable
                ? 1
                : 0
        )
</script>

<div class="container">
    <UIUpgradeFilters {game} />
    <div class="list">
        {#each UPGRADE_LIST as id}
            <UIUpgrade {game} {id} />
        {/each}
    </div>
</div>

<style>
    div.container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
    }
    div.list {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: center;
        align-content: start;
        flex-wrap: wrap;
        row-gap: 1rem;
        column-gap: 1rem;
        padding: 1rem 0;

        overflow: hidden auto;
    }
</style>
