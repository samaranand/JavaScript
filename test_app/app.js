const got = require("got");
const moment = require("moment");
const loopSeconds = 120;
const myLoc = { latitude: 32.715738, longitude: -117.161084 };
const url = `http://api.open-notify.org/iss-pass.json?lat=${myLoc.latitude}&lon=${myLoc.longitude}`;
// const url = `http://api.open-notify.org/iss-pass.json?lat=32.715738&lon=-117.161084`;

function loop() {
    got(url, { json: true })
        .then((iss) => {
            console.log(iss);
            // const nextPasses = iss.body.response;
            // const now = moment();
            // console.log('Next ISS passes near me');
            // for (const pass of nextPasses) {
            //     const passTime = moment.unix(pass.risetime);
            //     const timeFromNow = moment.duration(passTime.diff(now));
            //     const minutesFromNow = Number(timeFromNow.asMinutes()).toFixed(1);
            //     console.log(`${passTime} (in ${minutesFromNow} minutes) for ${pass.duration} seconds`);
            // }
        })
        .catch((error) => {
            console.log(error);
        });
    setTimeout(loop, loopSeconds * 1000);
}
loop();
