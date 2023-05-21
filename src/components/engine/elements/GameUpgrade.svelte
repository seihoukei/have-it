<script>
    import Trigger from "utility/trigger-svelte.js"
    import UPGRADES from "data/data-upgrades.js"

    export let id

    Trigger.on("command-buy-upgrade", buy)

    $: data = UPGRADES[id]

    export let upgrade = {
        id,
        owned : false,
    }

    function buy(target) {
        if (target !== id)
            return

        Trigger("command-spend-resources", data.cost)

        upgrade.owned = true

        if (data.effect)
            Trigger(...data.effect)

        if (data.effects) {
            for (const effect of data.effects) {
                Trigger(...effect)
            }
        }
    }

</script>
