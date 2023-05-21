import RESOURCES from "data/data-resources.js"


function insertResource(match, id) {
    const resource = RESOURCES[id] ?? ""
    const cssVariables = `
        --icon-color : ${resource.color ?? "#777777"};
    `
    return `<span class="${resource.class} icon" style="${cssVariables}">${resource.text}</span>`
}

export default function displayString(string) {
    return string
        .replace(/~(.*?)~/g, insertResource)
}
