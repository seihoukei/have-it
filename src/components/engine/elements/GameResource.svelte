<script>
    import RESOURCES from "data/data-resources.js"
    import Trigger from "utility/trigger-svelte.js"

    export let id
    export let resource = getDefaultValue(id)

    Trigger.on("command-advance", advance)
    Trigger.on("command-spend-resources", spend)
    Trigger.on("command-unlock-resource", unlock)
    Trigger.on("command-boost-resource", boost)
    Trigger.on("command-toggle-autodonate", toggleDonate)
    Trigger.on("command-toggle-autoboost", toggleBoost)

    function getDefaultValue(id) {
        const data = RESOURCES[id]
        const resource = {
            id,
            max : data.baseMax,
            value : 0,
            seen : data.seenAtStart,
            time : null,
            available : false,
            autoDonate : false,
            autoBoost : false,
        }
        return resource
    }

    function advance(time) {
        if (!resource.seen)
            return

        if (resource.value >= resource.max) {
            if (id === "CA" && resource.max > 1) {
                if (resource.autoBoost)
                    Trigger("command-buy-upgrade", `boost${id}`)
            } else if (resource.max < 1) {
                if (resource.autoDonate)
                    Trigger("command-buy-upgrade", `donate${id}`)
            }

            return
        }

        resource.value += time

        if (resource.value >= resource.max) {
            resource.value = resource.max

        }

        updateState()
    }

    function spend(resources) {
        if (!resources.includes(id))
            return

        resource.value = 0
        updateState()
    }

    function unlock(target) {
        if (target !== id)
            return

        resource.seen = true
        updateState()
    }

    function updateState() {
        resource.available = resource.value >= resource.max
        resource.time = resource.available
            ? null
            : resource.max - resource.value
    }

    function boost(target, ratio) {
        if (target !== id)
            return

        resource.max /= ratio
        resource.value /= ratio
    }

    function toggleDonate(target) {
        if (target !== id)
            return

        resource.autoDonate = !resource.autoDonate
    }

    function toggleBoost(target) {
        if (target !== id)
            return

        resource.autoBoost = !resource.autoBoost
    }

</script>
