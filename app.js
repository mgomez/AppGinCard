var connectionStatus;
var networkState;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", online, false);
    networkState = navigator.connection.type;

    if (navigator.notification) {
        window.alert = function(message) {
            navigator.notification.alert(
                message,
                null,
                "GINCARD",
                'OK'
            );
        };
    }
    if (networkState != 'none') {
        var win = window.open("http://test.ocsi.mx/Extranet/AppGinCard/", '_self', 'location=yes');
    } else {
        navigator.notification.alert(
            'No esta conectado a una red Wifi',
            function() {
                navigator.app.exitApp();
            },
            'GINCARD',
            'Ok'
        );
    }
}

function online() {
    connectionStatus = true;
}

function onOffline() {
    connectionStatus = false;
    alert("Se perdio la conexion a internet.");
}
