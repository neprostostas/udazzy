function handleOpenURL(url) {
    setTimeout(function () {
        let strValue = url;
        strValue = strValue.replace('udazzyapp://', '');
        const originalSetItem = sessionStorage.setItem;

        sessionStorage.setItem = function (key, value) {
            const event = new Event('handleOpen');

            event.value = value; // Optional..
            event.key = key; // Optional..

            document.dispatchEvent(event);

            originalSetItem.apply(this, arguments);
        };

        sessionStorage.setItem('handleOpen', strValue); // vue router wathing "onstorage" event
    }, 200);
}


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // if (!SMS ) { alert('SMS plugin not ready'); return; }
    //
    // document.addEventListener('onSMSArrive', function(e){
    //     var data = e.data;
    //     alert( JSON.stringify(data) );
    // });

    // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');




    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#000000");
        localStorage.setItem('ops', '9MPPR)F(rk%bZKJq');
        window.SoftInputMode.set('adjustPan');




        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        var myapp = document.getElementById('app');

        function keyboardShowHandler(e){
            myapp.style.setProperty('--data-android-keyboard-height', (e.keyboardHeight + 60 + 'px'));
            myapp.classList.add('android-keyboard-active');
        }

        function keyboardHideHandler(){
            myapp.classList.remove('android-keyboard-active');
        }



    }

    if (cordova.platformId == 'browser') {


    }


    if (cordova.platformId == 'ios') {
        StatusBar.backgroundColorByHexString("#000000");
        localStorage.setItem('ops', 'B^s)uqCy7GDIaBcn');
        Keyboard.shrinkView(true);
    }

    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        const element = document.querySelector(".no-internet");
        element.classList.add("active");
    }

    document.addEventListener("online", onOnline, false);

    function onOnline() {
        const element = document.querySelector(".no-internet");
        element.classList.remove("active");
    }

    // function copyProfileLink(url) {

    //     if (url.length < 99) {

    //         cordova.plugins.clipboard.copy({
    //             type: "text",
    //             data: url
    //         }, (res) => {
    //             console.log(res);
    //             window.alert(res);
    //         });

    //         alert.value.showAlert('Link has been copied', 'success')
    //     }

    // }



}