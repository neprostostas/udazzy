export function filterBySearch(arr, searchQuery, fields) {
    if(searchQuery.length > 0) {
        arr = arr.filter((item) => {
            let go = false
            let search = searchQuery.toLowerCase().trim().split(' ')

            if(search !== '') {

                if(fields) {
                    fields.forEach((field) => {
                        let item_in_deep;

                        if(item[field] === undefined) {
                            // second level of depth

                            Object.keys(item).forEach((key) => {
                                if(item[key][field] === undefined) {
                                    // thirst level of depth

                                    Object.keys(item[key]).forEach((key1) => {
                                        if(item[key][key1][field] === undefined) {
                                            return false
                                        } else {
                                            item_in_deep = item[key][key1][field]
                                        }
                                    })
                                } else {
                                    item_in_deep = item[key][field]
                                }
                            })
                        } else {
                            item_in_deep = item[field]
                        }

                        if(item_in_deep) {
                            if(item_in_deep.toString().toLowerCase().indexOf(search) !== -1)
                                go = true
                        }
                    })
                } else {
                    for (const [key] of Object.entries(item)) {
                        if(item[key].toString().toLowerCase().indexOf(search) !== -1)
                            go = true
                    }
                }

            }

            return go
        })
    }
    return arr
}