import RESOURCES from "data/data-resources.js"

const UPGRADES = {}

const RESOURCES_LIST = Object.keys(RESOURCES)

RESOURCES_LIST.forEach((id, index) => {
    UPGRADES[`boost${id}_self`] = {
        cost : [id],
        effect : ["command-boost-resource", id, 1.2],
        description : `Increase ~${id}~ speed by 20%`,
        repeatable : true,
    }
    if (index > 0) {
        UPGRADES[`unlock${id}`] = {
            cost : RESOURCES_LIST.slice(0, index),
            effect : ["command-unlock-resource", id],
            description : `Unlock ~${id}~`,
        }
        UPGRADES[`double${id}_self`] = {
            cost : RESOURCES_LIST.slice(0, index),
            effect : ["command-boost-resource", id, 2],
            description : `Double ~${id}~ speed`,
        }
        
        const last = RESOURCES_LIST[index - 1]
        
        UPGRADES[`donate${last}_${id}`] = {
            cost: [last],
            effects: [
                ["command-boost-resource", last, 0.5],
                ["command-boost-resource", id, 1.5],
            ],
            description : `Halve ~${last}~ speed to increase ~${id}~ speed by 50%`,
            repeatable : true,
        }
    }
    for (let i = 0; i < index; i++) {
        const that = RESOURCES_LIST[i]
        UPGRADES[`double${that}_${id}`] = {
            cost : [that, id],
            effect : ["command-boost-resource", that, 2],
            description : `Double ~${that}~ speed`,
        }
    }
})

const TARGETTING_EFFECTS = [
    "command-boost-resource",
]

for (const data of Object.values(UPGRADES)) {
    const targets = new Set()
    const effects = [...(data.effects ?? []), data.effect ?? []]
    for (const effect of effects) {
        if (TARGETTING_EFFECTS.includes(effect[0])) {
            targets.add(effect[1])
        }
    }
    data.targets = [...targets]
}

export default UPGRADES
