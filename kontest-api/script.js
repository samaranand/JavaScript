let result, currentTime;

let running = document.getElementById("running");
let upcoming = document.getElementById("upcoming");
let in24hr = document.getElementById("in-24-hr");

function convertToHour(seconds) {
  let hr, mi, sc;
  hr = Math.floor(seconds / (60 * 60));
  seconds = seconds % (60 * 60);
  mi = Math.floor(seconds / 60);
  seconds = seconds % 60;
  sc = seconds;
  return `${hr} Hrs ${mi} Mins ${sc} Seconds`;
}

function returnConverted(r) {
  const utcDate = r["start_time"];
  const utcDate2 = r["end_time"];
  const localDate = new Date(utcDate);
  const localDate2 = new Date(utcDate2);
  
  const v = `<div class="value" id="value">
          <div class="name" id="name">${r["name"]}</div>
          <div class="link" id="link"><a href=" ${r["url"]}">link</a></div>
          <div class="duration" id="duration">${convertToHour(
            r["duration"]
          )}</div>
        </div><br/>`;
    return v;
}

let updateUI = function () {
  fetch("http://worldclockapi.com/api/json/utc/now")
    .then((res) => res.json())
    .then((d) => {
      currentTime = d["currentDateTime"];
    })
    .then(() => {
      result.forEach((r) => {
        // console.log(r['name']);
        if (r["start_time"] <= currentTime) {
          
          let v = returnConverted(r);
          running.insertAdjacentHTML("beforeend", v);
        } else {
            let v = returnConverted(r);
            upcoming.insertAdjacentHTML("beforeend", v);
        }
        if(r['in_24_hours']==='Yes'){
            let v = returnConverted(r);
            in24hr.insertAdjacentHTML("beforeend", v);
        }
      });
    });
};

let initFun = function () {
  fetch("https://kontests.net/api/v1/all")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result = data;
      updateUI();
    });
};

initFun();
