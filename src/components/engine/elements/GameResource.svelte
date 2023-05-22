<script>
    import RESOURCES from "data/data-resources.js"
    import Trigger from "utility/trigger-svelte.js"

    const RESOURCE_LIST = Object.keys(RESOURCES)

    export let id
    export let index = 0
    export let resource = getDefaultValue(id)
    export let game

    $: autoRate = game?.state?.autoRate ?? 1
    $: share = game?.state?.upgrades?.[`share${id}`]?.owned
    $: sharingResources = RESOURCE_LIST.slice(0, index)

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

        resource.boost = 1

        if (share) {
            resource.boost *= 1.5 ** sharingResources
                .filter(x => game?.state?.resources?.[x].available)
                .length
        }

        if (resource.value >= resource.max) {
            if (id === "CA" && resource.max > autoRate) {
                if (resource.autoBoost)
                    Trigger("command-buy-upgrade", `boost${id}`)
            } else if (resource.max < autoRate) {
                if (resource.autoDonate)
                    Trigger("command-buy-upgrade", `donate${id}`)
            }

            return
        }

        resource.value += time * resource.boost

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
