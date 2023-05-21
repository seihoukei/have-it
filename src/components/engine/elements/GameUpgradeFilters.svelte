<script>
    import Trigger from "utility/trigger-svelte.js"

    Trigger.on("command-toggle-filter", toggleFilter)
    Trigger.on("command-reset-filters", resetFilters)

    export let filters = initFilters()

    function initFilters() {
        const filters = {
            cost : {},
            target : {},
            special : {},
        }

        return filters
    }

    function toggleFilter(type, id, direction = 1) {
        const list = filters[type]
        if (!list)
            return

        list[id] = (list[id] ?? 0) + direction

        if (list[id] > 1)
            list[id] = -1

        if (list[id] < -1)
            list[id] = 1

        list._required = Object.keys(list)
            .filter(id => list[id] === 1)

        Trigger("upgrade-filters-updated")
    }

    function resetFilters(type = null) {
        if (type === null) {
            filters = initFilters()
            return
        }

        filters[type] = {}
    }

</script>
