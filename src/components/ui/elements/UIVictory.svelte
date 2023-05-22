<script>
    import interactive from "utility/interactive.js"
    import timeString from "utility/time-string.js"
    import Trigger from "utility/trigger-svelte.js"

    export let game

    $: won = game?.state?.won
    $: continues = game?.state?.continues
    $: time = game?.state?.lastWinTime

    $: visible = won > continues

    function resetGame() {
        Trigger("command-reset-game")
    }

    function continueGame() {
        Trigger("command-continue-game")
    }

</script>

{#if visible}
    <div class="holder">
        <div class="dialog">
            <div class="title">
                You won {won} times!
            </div>
            <div class="time">
                It took you {timeString(time)}
            </div>
            <div class="button"
                 use:interactive
                 on:basicaction={resetGame}
            >Restart game</div>
            <div class="button"
                 use:interactive
                 on:basicaction={continueGame}
            >Keep playing</div>
        </div>
    </div>
{/if}

<style>
    div.holder {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #000000AA;
        z-index: 2;
    }

    div.dialog {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #555555;
        padding : 1em;
        row-gap: 1rem;
    }

    div.title {
        font-size: 2em;
    }

    div.button {
        background-color: #444444;
        padding: 0.5em 1.5em;
        transition: background-color 0.5s;
    }

    div.button:hover {
        cursor: pointer;
        background-color: #666666;
    }
</style>
