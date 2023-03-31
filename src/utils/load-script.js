const scripts = Object.create(null)

function load(url) {
    return new Promise((resolve, reject) => {
        const script = window.document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = url
        script.onload = resolve
        script.onerror = reject
        window.document.body.appendChild(script)
    })
}

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export default function loadScript(url, name) {
    if (window[name] !== undefined) {
        return window[name]
    } else if (scripts[name] !== undefined) {
        return scripts[name]
    } else {
        scripts[name] = load(url).then(async () => {
            await delay(0)
            return window[name]
        })

        scripts[name].then(() => {
            delete scripts[name]
        })

        return scripts[name]
    }
}