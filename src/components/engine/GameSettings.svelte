<script>

    import Trigger from "utility/trigger-svelte.js"

    Trigger.on("command-set-setting", setSetting)

    export let settings = {
        colorBlind : false
    }

    function setSetting(id, value = settings[id]) {
        settings[id] = value
    }
</script>
