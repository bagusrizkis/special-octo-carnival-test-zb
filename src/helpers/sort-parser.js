export default function sortParser(sortQuery) {
    const splitted = sortQuery.split('.')
    return {
        field: splitted[0],
        order: splitted[1] === "dec" ? -1 : 1
    }
}