import RESOURCES from "data/data-resources.js"

const RESOURCES_LIST = Object.keys(RESOURCES)

const UPGRADES = {
    win : {
        cost: RESOURCES_LIST,
        effect: ["command-win"],
        description: `Win the game`,
        repeatable: true,
    },
    boostCA : {
        cost : ["CA"],
        effect : ["command-boost-resource", "CA", 1.5],
        description : `Increase ~CA~ speed by 50%`,
        repeatable : true,
        autoUpgrade : "autoBoostCA",
        autoAction : ["command-toggle-autoboost", "CA"],
        autoText : "Activate if own time > 1s",
        isAuto : ["CA", "autoBoost"],
    },
    autoBoostCA: {
        cost : ["CC","CD","CE"],
        targets : ["CA"],
        description : "Unlock ~CA~ boost automation",
    }
}

RESOURCES_LIST.slice(5).forEach((id, index) => {
    const past = RESOURCES_LIST[index]
    
    UPGRADES[`autoDonate${past}`] = {
        cost : RESOURCES_LIST.slice(0, index + 6).slice(-3),
        targets : [past],
        effects : [],
        description: `Unlock ~${past}~ donation automation`,
    }
})

RESOURCES_LIST.forEach((id, index) => {
    if (index > 0) {
        UPGRADES[`unlock${id}`] = {
            cost : RESOURCES_LIST.slice(0, index).slice(-7),
            effect : ["command-unlock-resource", id],
            description : `Unlock ~${id}~`,
        }
        UPGRADES[`double${id}`] = {
            cost : RESOURCES_LIST.slice(0, index).slice(-7),
            effect : ["command-boost-resource", id, 2],
            description : `Double ~${id}~ speed`,
        }
        
        const last = RESOURCES_LIST[index - 1]
        
        UPGRADES[`donate${last}`] = {
            cost: [last],
            effects: [
                ["command-boost-resource", last, 0.5],
                ["command-boost-resource", id, 1.5],
            ],
            description : `Halve ~${last}~ speed to increase ~${id}~ speed by 50%`,
            autoUpgrade : `autoDonate${last}`,
            autoAction : ["command-toggle-autodonate", last],
            autoText : "Activate if own time < 1s",
            isAuto : [last, "autoDonate"],
            repeatable : true,
        }
    }
    for (let i = 0; i < index; i++) {
        const that = RESOURCES_LIST[i]
        const boost = index - i + 1
        UPGRADES[`double${that}_${id}`] = {
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
