const COLORS = [
    "#CC0000",
    "#00CC00",
    "#CC7700",
    "#7700CC",
]

const RESOURCES = {
    CA: {
        class: "circle",
        color: COLORS[0],
        baseMax: 5,
        text : "A",
        seenAtStart : true,
    },
    CB: {
        class: "circle",
        color: COLORS[1],
        baseMax: 10,
        text : "B",
    },
    CC: {
        class: "circle",
        color: COLORS[2],
        baseMax: 20,
        text : "C",
    },
    CD: {
        class: "circle",
        color: COLORS[3],
        baseMax: 40,
        text: "D",
    },
    CE: {
        class: "square",
        color: COLORS[0],
        baseMax: 80,
        text: "E",
    },
    CF: {
        class: "square",
        color: COLORS[1],
        baseMax: 160,
        text: "F",
    },
    CG: {
        class: "square",
        color: COLORS[2],
        baseMax: 320,
        text: "G",
    },
    CH: {
        class: "square",
        color: COLORS[3],
        baseMax: 640,
        text: "H",
    },
    CI: {
        class: "hexagon",
        color: COLORS[0],
        baseMax: 1280,
        text: "I",
    },
    CJ: {
        class: "hexagon",
        color: COLORS[1],
        baseMax: 2560,
        text: "J",
    },
    CK: {
        class: "hexagon",
        color: COLORS[2],
        baseMax: 5120,
        text: "K",
    },
    CL: {
        class: "hexagon",
        color: COLORS[3],
        baseMax: 10240,
        text: "L",
    },
    CM: {
        class: "triangle",
        color: COLORS[0],
        baseMax: 20480,
        text: "M",
    },
    CN: {
        class: "triangle",
        color: COLORS[1],
        baseMax: 40960,
        text: "N",
    },
    CO: {
        class: "triangle",
        color: COLORS[2],
        baseMax: 81920,
        text: "O",
    },
    CP: {
        class: "triangle",
        color: COLORS[3],
        baseMax: 163840,
        text: "P",
    },
}

export default RESOURCES
