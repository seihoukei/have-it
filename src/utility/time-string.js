export default function timeString(value) {
    if (value < 60) {
        return value.toFixed(1) + "s"
    } else {
        const seconds = value % 60 | 0
        const minutes = value / 60 % 60 | 0
        const hours = value / 3600 | 0
        return (hours > 100
                ? `${hours}:${minutes}`
                : `${hours}:${minutes}:${seconds}`
        )
            .replace(/:(\d)(?=:|$)/g, ":0$1") // add leading zeroes for parts
            .replace(/^(00?:)*0?/g, "") // remove leading zeroes overall
    }
}
