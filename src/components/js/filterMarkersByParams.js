export function filterMarkersByParams(markers, params) {
    let dateFrom = (() => {
        if(params.dateRange.from.getTime() === new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) {
            return new Date()
        } else {
            return params.dateRange.from
        }
    })()

    let dateTo = params.dateRange.to

    let filteredMarkers = []

    filteredMarkers = markers.filter(function (marker) {
        return (dateFrom <= new Date(marker.datetime) && dateTo >= new Date(marker.datetime))
    })

    if(Object.keys(params.checkboxes['event types']).length > 1) {
        filteredMarkers = filteredMarkers.filter((marker) => {
            let go = false
            Object.entries(params.checkboxes['event types']).forEach(([key, value]) => {
                if (value && marker.type === key)
                    go = true
            })
            return go
        })
    }

    if(Object.keys(params.checkboxes['music genres']).length > 1) {
        filteredMarkers = filteredMarkers.filter((marker) => {
            let go = false
            Object.entries(params.checkboxes['music genres']).forEach(([key, value]) => {
                if (value && marker.music === key)
                    go = true
            })
            return go
        })
    }

    if (params.checkboxes['other']['only available events']) {
        filteredMarkers = filteredMarkers.filter(function (marker) {
            return marker.participants_joined != marker.participants
        })
    }

    if(params.timeOfDay === 'only night') {
        filteredMarkers = filteredMarkers.filter(function (marker) {
            return marker.isNightEvent
        })
    }
    if(params.timeOfDay === 'only day') {
        filteredMarkers = filteredMarkers.filter(function (marker) {
            return !marker.isNightEvent
        })
    }

    if(params.onlyMyEvents) {
        filteredMarkers = filteredMarkers.filter(function (marker) {
            // if i'm not participant, but event was created by me - add too
            return marker.ImAParticipant || marker.created_by === params.myID
        })
    }

    // filter by exact promoter
    if(params.byPromoterId) {
        filteredMarkers = filteredMarkers.filter((marker) => {
            return marker.created_by === params.byPromoterId
        });
    }

    // SEARCH
    let searchQuery = params.search.toLowerCase()
    if(searchQuery.length > 0) {
        filteredMarkers = filteredMarkers.filter(function (marker) {
            let go = false
            searchQuery.trim().split(' ').forEach((value) => {
                if(value !== '') {
                    if(marker.name.toLowerCase().indexOf(value) !== -1)
                        go = true
                    if(marker.description.toLowerCase().indexOf(value) !== -1)
                        go = true
                    if(marker.type.toLowerCase().indexOf(value) !== -1)
                        go = true
                }
            })

            return go
        })
    }


    return filteredMarkers
}