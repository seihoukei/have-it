<script>
    import RESOURCES from "data/data-resources.js"
    import displayString from "utility/display-string.js"
    import UIUpgradeFilter from "components/ui/elements/UIUpgradeFilter.svelte"
    import interactive from "utility/interactive.js"
    import Trigger from "utility/trigger-svelte.js"

    const RESOURCES_LIST = Object.keys(RESOURCES)

    export let game
    let colorBlindToggle

    $: resources = game?.state?.resources ?? {}
    $: knownResources = RESOURCES_LIST.filter(x => resources[x]?.seen)
    function resetFilter(type) {
        Trigger("command-reset-filters", type)
    }

    function setSetting() {
        Trigger("command-set-setting", "colorBlind", colorBlindToggle.checked)
    }

    function menu() {
        Trigger("command-open-dialog", "menu")
    }
</script>

<div class="filters">
    <div class="settings">
        <label><input type="checkbox" bind:this={colorBlindToggle} checked={game?.settings?.colorBlind} on:change={setSetting}>Display letters</label>
    </div>
    <div class="filter">
        <div class="title">Cost filter:</div>
        {#each knownResources as id}
            <UIUpgradeFilter {game} {id}
                               type = "cost">
                {@html displayString(`~${id}~`)}
            </UIUpgradeFilter>
        {/each}
        <div class="reset button"
             use:interactive
             on:basicaction={() => resetFilter("cost")}
        >
            Reset
        </div>
    </div>
    <div class="filter">
        <div class="title">Target filter:</div>
        {#each knownResources as id}
            <UIUpgradeFilter {game} {id}
                               type = "target">
                {@html displayString(`~${id}~`)}
            </UIUpgradeFilter>
        {/each}
        <div class="reset button"
             use:interactive
             on:basicaction={() => resetFilter("target")}
        >
            Reset
        </div>
    </div>
    <div class="filter">
        <div class="title">Special filter:</div>
        <UIUpgradeFilter {game}
                           type="special"
                           id="repeatable"
        >
            <span class="icon circle">⟳</span>
        </UIUpgradeFilter>
        <div class="reset button"
             use:interactive
             on:basicaction={() => resetFilter("special")}
        >
            Reset
        </div>
    </div>
    <div class="menu button"
         use:interactive
         on:basicaction={menu}
    >
        ☰
    </div>
</div>

<style>
    div.filters {
        position : relative;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1rem;
        background-color: #555555;
    }

    div.filter {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.5em;
        row-gap: 0.5em;
        flex-wrap: wrap;
    }

    span.icon {
        background-color: #333333;
    }

    div.button {
        background-color: #444444;
        padding: 0 1em;
        margin-left : 1em;
        transition: background-color 0.2s;
    }

    div.button:hover {
        background-color: #666666;
        cursor: pointer;
    }

    div.menu.button {
        position: absolute;
        top : 1rem;
        right : 1rem;
        padding : 0.5em;
    }
</style>
