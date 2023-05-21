<script>
    import UIMeta from "./UIMeta.svelte"
    import UIHover from "components/ui/UIHover.svelte"
    import UIResources from "components/ui/elements/UIResources.svelte"
    import UIUpgrades from "components/ui/elements/UIUpgrades.svelte"
    export let game
</script>

{#if game?.state}

    {#if import.meta.env.MODE === "development"}
        <UIMeta {game}/>
    {/if}

    <div class="content"
         class:no-icon-text={!game?.state?.settings?.colorBlind}
    >
        <UIResources {game} />
        <UIUpgrades {game} />
    </div>

    <UIHover {game} />
{/if}

<style>
    div.content {
        position: absolute;
        left: 1rem;
        top: 1rem;
        bottom : 1rem;
        right : 1rem;

        background-color: #777777;

        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
    }
</style>
