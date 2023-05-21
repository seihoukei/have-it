<script>
    import UPGRADES from "data/data-upgrades.js"
    import interactive from "utility/interactive.js"
    import Trigger from "utility/trigger-svelte.js"
    import displayString from "utility/display-string.js"
    import hoverable from "utility/hoverable.js"

    export let game
    export let id

    $: data = UPGRADES[id] ?? {}
    $: upgrades = game?.state?.upgrades ?? {}
    $: resources = game?.state?.resources ?? {}
    $: filter = game?.state?.upgradeFilters ?? {}
    $: costFilter = filter.cost ?? {}
    $: targetFilter = filter.target ?? {}
    $: specialFilter = filter.special ?? {}

    $: upgrade = upgrades[id] ?? {}
    $: cost = data.cost ?? []
    $: targets = data.targets ?? []

    $: repeatable = data.repeatable

    $: seenInvolved = cost.every(x => resources[x]?.seen)
        && targets.every(x => resources[x]?.seen)

    $: fitsCostFilter = (costFilter._required ?? []).every(x => cost.includes(x))
        && !cost.some(x => costFilter[x] === -1)
    $: fitsTargetFilter = (targetFilter._required ?? []).every(x => targets.includes(x))
        && !targets.some(x => targetFilter[x] === -1)
    $: fitsSpecialFilter = !specialFilter.repeatable
        || specialFilter.repeatable === 1 && repeatable
        ||  specialFilter.repeatable === -1 && !repeatable
    $: fitsFilters = fitsCostFilter && fitsTargetFilter && fitsSpecialFilter

    $: seen = (!upgrade.owned || repeatable)
        && seenInvolved
        && fitsFilters

    $: available = seen && cost.every(x => resources[x]?.available)

    $: autoAvailable = data.autoUpgrade && upgrades[data.autoUpgrade]?.owned
    $: autoActive = data.isAuto && autoAvailable && resources[data.isAuto[0]][data.isAuto[1]]
    $: autoAction = data.autoAction ?? null

    function buy() {
        if (!available)
            return

        Trigger("command-buy-upgrade", id)
    }

    function toggleAuto() {
        if (autoAction === null || !autoAvailable)
            return

        Trigger(...autoAction)
    }

    $: costText = cost.length
        ? displayString(`~${cost.join("~ ~")}~`)
        : "FREE"
    $: descriptionText = displayString(data.description)
</script>

{#if seen}
    <div class="upgrade"
         class:available
    >
        {#if repeatable}
            <div class="left corner"
                 use:hoverable={"Repeatable\n\nCan be bought multiple times"}
            >
                ⟳
            </div>
        {/if}
        {#if autoAvailable}
            <div class="right corner"
                 use:hoverable={`Automatable\n\nClick header or right-click\nto toggle automation:\n${data.autoText}`}
                 use:interactive
                 on:basicaction={toggleAuto}
            >
                {#if autoActive}
                    ON
                {:else}
                    OFF
                {/if}
            </div>
        {/if}
        <div class="cost line"
             use:interactive
             on:basicaction={autoAvailable ? toggleAuto : buy}
             on:specialaction={toggleAuto}
        >
            {@html costText}
        </div>
        <div class="description line"
             use:interactive
             on:basicaction={buy}
             on:specialaction={toggleAuto}
        >
            <div class="text">
                {@html descriptionText}
            </div>
        </div>
    </div>
{/if}

<style>
    div.upgrade {
        position: relative;
        width: 12em;
        height: 9em;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;

        background-color: #444444;
        transition: opacity 0.2s, background-color 0.2s;
    }

    div.upgrade.available:hover {
        cursor: pointer;
        background-color: #555555;
    }

    div.upgrade:not(.available) {
        opacity: 50%;
    }

    div.description {
        flex-grow: 1;
        padding : 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.text {
        text-align: center;
        white-space: pre-line;
    }

    div.line {
        text-align: center;
    }

    div.cost {
        background-color: #00000044;
        padding : 1rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0.2em;
    }

    div.corner.left {
        padding: 0.5rem;
        position: absolute;
        left: 0;
        top : 0;
    }

    div.corner.right {
        padding: 0.5rem;
        position: absolute;
        right: 0;
        top : 0;
    }

</style>
