<script>
    import UIHover from "components/ui/UIHover.svelte"
    import UIResources from "components/ui/elements/UIResources.svelte"
    import UIUpgrades from "components/ui/elements/UIUpgrades.svelte"
    import UIVictory from "components/ui/elements/UIVictory.svelte"
    import UIDialogs from "components/ui/UIDialogs.svelte"
    import UIMenu from "components/ui/dialogs/UIMenu.svelte"

    const UI_DIALOGS = {
        menu : UIMenu,
    }


    export let game
</script>

{#if game?.state}

    <div class="content"
         class:no-icon-text={!game?.state?.settings?.colorBlind}
    >
        <UIResources {game} />
        <UIUpgrades {game} />
    </div>

    <UIDialogs {game} dialogs={UI_DIALOGS}/>
    <UIHover {game} />
    <UIVictory {game} />
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
