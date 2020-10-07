console.log("Loading SleepyPotato. . .");

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: async function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: async function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        console.log('Received Event: ' + id);
    }
};

app.initialize();

var waky=localStorage.getItem("waketime");
var sleepy=localStorage.getItem("sleeptime");
if(!sleepy){sleepy=21;}
if(!waky){waky=9;}
document.getElementById("waketime").value = waky;
document.getElementById("sleeptime").value = sleepy;
console.log("Setting values for sleeptime and waketime from local storage");
console.log("Returning values for sleeptime and waketime to local storage.  Nuke it from orbit.  It's the only way to be sure.");
localStorage.setItem("waketime", waky);
localStorage.setItem("sleeptime", sleepy);

window.CordovaReady = new Promise(function(resolve) {
    document.addEventListener('deviceready', resolve);
});

window.CordovaReady.then(function() {
    
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.on('activate', function() {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
        var optOff=localStorage.getItem("optOff");
        if(!optOff){
            cordova.plugins.backgroundMode.openBatteryOptimizationsSettings();
            console.log('Prompting disable battery optimization');
            localStorage.setItem("optOff", true);
        }
        console.log("Backgrounding...");
    });
    
    
    function playAudio(url) {
        var play_alarm = new Media(url,
            function () {
                console.log("playAudio():Audio Success");
            },
            function (err) {
                console.log("playAudio():Audio Error: " + JSON.stringify(err));
            }
        );
        play_alarm.play();
    }

    setInterval(function() {
        console.log("tick. . .");
        var d = new Date();
        var hrs=d.getHours();
        var mns=d.getMinutes();
        var scs=d.getSeconds();
        document.getElementById("clock").innerHTML=hrs+":"+mns+":"+scs;
        var waketime=localStorage.getItem("waketime");
        if(!waketime){waketime=9;}
        var sleeptime=localStorage.getItem("sleeptime");
        if(!sleeptime){sleeptime=21;}
        if(scs===0){
            console.log("Start dinging at "+waketime+":00");
            console.log("Stop dinging at "+sleeptime+":00");
        }
        if(scs===0 && mns===0 && hrs<sleeptime && hrs>waketime){
            playAudio("/android_asset/www/media/01.wav");
            console.log("Ding!");
        }
    }, 1000);
});
