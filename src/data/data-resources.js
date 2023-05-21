const COLORS = [
    "#CC0000",
    "#00CC00",
    "#CC7700",
    "#7700CC",
    "#0077CC",
    "#000000",
]

const CLASSES = [
    "circle",
    "square",
    "hexagon",
    "triangle",
    "skew",
    "diamond",
]

const RESOURCES = {}

const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]

letters.forEach((letter, index) => {
    RESOURCES[`C${letter}`] = {
        class: CLASSES[Math.floor(index / 5)],
        color: index === 25 ? COLORS[5] : COLORS[index % 5],
        baseMax: 5 * 2 ** index,
        text: letter,
    }
})

RESOURCES.CA.seenAtStart = true

export default RESOURCES
