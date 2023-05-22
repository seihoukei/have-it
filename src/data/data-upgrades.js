import RESOURCES from "data/data-resources.js"

const RESOURCES_LIST = Object.keys(RESOURCES)

const UPGRADES = {
    win: {
        cost: RESOURCES_LIST,
        effect: ["command-win"],
        description: `Win the game`,
        repeatable: true,
    },
}

RESOURCES_LIST.forEach((id, index) => {
    if (index > 0) {
        UPGRADES[`unlock${id}`] = {
            cost: RESOURCES_LIST.slice(0, index).slice(-7),
            effect: ["command-unlock-resource", id],
            description: `Unlock ~${id}~`,
        }
    }
})

UPGRADES.boostCA = {
    cost : ["CA"],
    effect : ["command-boost-resource", "CA", 1.5],
    description : `Increase ~CA~ speed by 50%`,
    repeatable : true,
    autoUpgrade : "autoBoostCA",
    autoAction : ["command-toggle-autoboost", "CA"],
    autoText : "Activate if own time > %rate%",
    isAuto : ["CA", "autoBoost"],
}


RESOURCES_LIST.slice(5).forEach((id, index) => {
    UPGRADES[`share${id}`] = {
        cost : RESOURCES_LIST.slice(0, index + 5).slice(-4),
        targets : [id],
        description : `Boost ~${id}~ by 50% for each full resource before it`,
    }
})


RESOURCES_LIST.slice(1).forEach((id, index) => {
    UPGRADES[`boost${id}`] = {
        cost: RESOURCES_LIST.slice(0, index + 1).slice(-7),
        effect: ["command-boost-resource", id, Math.floor(index / 2) + 2],
        description: `Make ~${id}~ ${Math.floor(index / 2) + 2} times faster`,
    }
})

UPGRADES.autoBoostCA = {
    cost : ["CC","CD","CE"],
    targets : ["CA"],
    description : "Unlock ~CA~ boost automation",
}
RESOURCES_LIST.slice(5,15).forEach((id, index) => {
    const past = RESOURCES_LIST[index]
    
    UPGRADES[`autoDonate${past}`] = {
        cost : [...RESOURCES_LIST.slice(0, index + 6).slice(-3), RESOURCES_LIST[10 + Math.floor(index / 5) * 5]],
        targets : [past],
        description: `Unlock ~${past}~ donation automation`,
    }
})
RESOURCES_LIST.slice(15, 25).forEach((id, index) => {
    const past = RESOURCES_LIST[index + 15]
    
    UPGRADES[`autoDonate${past}`] = {
        cost : RESOURCES_LIST.slice(0, index + 16).slice(-3),
        targets : [past],
        description: `Unlock ~${past}~ donation automation`,
    }
})

RESOURCES_LIST.slice(15).forEach((id, index) => {
    UPGRADES[`rate${id}`] = {
        cost: RESOURCES_LIST.slice(0, index + 15).slice(-5),
        effect: ["command-boost-automation", 2],
        description : `Double automation rate`,
    }
})

RESOURCES_LIST.forEach((id, index) => {
    if (index > 0) {
        const last = RESOURCES_LIST[index - 1]
        const cost = 0.5 - Math.floor(index / 5) * 0.02
        const boost = 0.5 + Math.floor(index / 5) * 0.02
        
        UPGRADES[`donate${last}`] = {
            cost: [last],
            effects: [
                ["command-boost-resource", last, 1 - cost],
                ["command-boost-resource", id, 1 + boost],
            ],
            description : `Reduce ~${last}~ speed by ${(cost*100).toFixed(0)}% to increase ~${id}~ speed by ${(boost*100).toFixed(0)}%`,
            autoUpgrade : `autoDonate${last}`,
            autoAction : ["command-toggle-autodonate", last],
            autoText : "Activate if own time < %rate%",
            isAuto : [last, "autoDonate"],
            repeatable : true,
        }
    
    }
    
    for (let i = 0; i < index; i++) {
        const that = RESOURCES_LIST[i]
        const boost = index - i + 1
        UPGRADES[`boost${that}_${id}`] = {
            cost : [that, id],
            effect : ["command-boost-resource", that, boost],
            description : `Make ~${that}~ ${boost} times faster`,
        }
    }
})

const TARGETTING_EFFECTS = [
    "command-boost-resource",
]

for (const data of Object.values(UPGRADES)) {
    const targets = new Set(data.targets)
    const effects = [...(data.effects ?? []), data.effect ?? []]
    for (const effect of effects) {
        if (TARGETTING_EFFECTS.includes(effect[0])) {
            targets.add(effect[1])
        }
    }
    data.targets = [...targets]
}

export default UPGRADES
