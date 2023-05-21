<script>
    import SaveStateManager from "./SaveStateManager.svelte"
    import GameSettings from "components/engine/GameSettings.svelte"
    import GameResources from "components/engine/elements/GameResources.svelte"
    import Trigger from "utility/trigger-svelte.js"
    import GameUpgrades from "components/engine/elements/GameUpgrades.svelte"
    import GameUpgradeFilters from "components/engine/elements/GameUpgradeFilters.svelte"

    const DEFAULT_GAME_STATE = Object.freeze({
        time : 0,
        targetTime : 0,
    })

    const MAX_TICK_TIME = 10000
    const MAX_STEP_TIME = MAX_TICK_TIME

    export let game = {}

    let state, gameId

    $: game.state = state
    $: game.id = gameId

    Trigger.on("command-tick", tick)

    function getMilestones() {
        const resourceCaps = Object.values(state.resources)
            .map(x => x.time ?? Infinity)

        return resourceCaps
//        return [...resourceCaps, ]
    }
    function tick(time) {
        //TODO: break tick into steps?
        state.targetTime += time
        let timeToProcess = Math.min(state.targetTime - state.time, MAX_TICK_TIME)

        while (timeToProcess > 0) {
            const milestones = getMilestones()
            const step = Math.min(timeToProcess, MAX_STEP_TIME, ...milestones)
            Trigger("command-advance", step)
            state.time += step
            timeToProcess -= step
        }
    }

    function metaFunction() {
        // form a metadata to access via saveInfo
    }

    function offlineFunction(state, time) {
        //modify freshly loaded state according to offline time
        //executed before state is actually assigned to game.state
        state.targetTime += time

        return state
    }
</script>

<SaveStateManager bind:state
                  bind:id={gameId}
                  defaultState={DEFAULT_GAME_STATE}
                  {metaFunction}
                  {offlineFunction}
                  actionsaveEvents={["command-buy-upgrade"]}
                  backupEvents={[]}
                  autosaveInterval={15000}
                  actionsaveInterval={2000}
                  prefix="Boolean_Game"
/>

{#key gameId}
    {#if state}
        <GameResources bind:resources={state.resources} />
        <GameUpgrades bind:upgrades={state.upgrades} />
        <GameUpgradeFilters bind:filters={state.upgradeFilters} />

        <GameSettings bind:settings={state.settings} />
    {/if}
{/key}
