var connectionStatus;
var pushNotification;
var networkState;
var push;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", online, false);
    networkState = navigator.connection.type;

    push = PushNotification.init({
        android: {
            senderID: "1070674347053"
        },
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
        alert("registration " + data);
    });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        alert("notification " + data.title, );
    });

    push.on('error', function(e) {
        alert("error " + e.message);
    });

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
        var win = window.open("http://192.168.31.103/Extranet/AppGinCard/", '_self', 'location=yes');
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
    if (device.platform != "Android") {
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    }

}

function online() {
    connectionStatus = true;
}

function onOffline() {
    connectionStatus = false;
    alert("Se perdio la conexion a internet.");
}
