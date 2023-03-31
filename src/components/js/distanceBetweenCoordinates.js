export default function distanceBetweenCoordinates(pos1, pos2) {
    let lat1 = pos1.lat,
        lng1 = pos1.lng,
        lat2 = pos2.lat,
        lng2 = pos2.lng;


    let R = 6371 // km
    let dLat = toRad(lat2 - lat1)
    let dLon = toRad(lng2 - lng1)
        lat1 = toRad(lat1)
        lat2 = toRad(lat2)

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d * 1000
}

function toRad(Value) {
    return Value * Math.PI / 180;
}