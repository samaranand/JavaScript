const infinity = 999999;


let data = {
  safarAirways: {
    time: {
      patna: {
        kolkata: 2,
        newDelhi: 6,
        mumbai: 7,
        jaipur: 8,
        amritsar: 10,
      },
      kolkata: {
        newDelhi: 8,
        jaipur: 14,
        bengaluru: 12,
      },
      newDelhi: {
        mumbai: 4,
        bengaluru: 10,
        hyderabad: 9,
        sriNagar: 7,
      },
      mumbai: {
        bengaluru: 3,
        hyderabad: 6,
        sriNagar: 9,
        chennai: 12,
      },
      bengaluru: {
        jaipur: 5,
        newDelhi: 7,
        mumbai: 6,
      },
      hyderabad: {
        chennai: 4,
        kolkata: 6,
        amritsar: 8,
      },
      chennai: {
        newDelhi: 12,
        sriNagar: 9,
        patna: 8,
      },
      amritsar: {
        newDelhi: 12,
        kolkata: 7,
        mumbai: 9,
      },
      jaipur: {
        chennai: 7,
        newDelhi: 9,
        mumbai: 10,
      },
      sriNagar: {
        hyderabad: 10,
        chennai: 12,
        mumbai: 9,
        newDelhi: 4,
      },
    },
    money: {
      patna: {
        kolkata: 560, // 3297
        jaipur: 1109,
        newDelhi: 1090,
        mumbai: 1915,
      },
      kolkata: {
        newDelhi: 1517,
        mumbai: 2216,
        bengaluru: 1887,
        chennai: 1674,
      },
      newDelhi: {
        patna: 1085,
        kolkata: 1515,
        mumbai: 1480,
        bengaluru: 1695,
        hyderabad: 1253,
        sriNagar: 655,
      },
      mumbai: {
        newDelhi: 1422,
        bengaluru: 860,
        hyderabad: 615,
      },
      bengaluru: {
        mumbai: 842,
        newDelhi: 1700,
        kolkata: 1885,
        amritsar: 2098,
      },
      hyderabad: {
        patna: 1140,
        kolkata: 1182,
        newDelhi: 1253,
        mumbai: 620,
        jaipur: 1096,
      },
      chennai: {
        mumbai: 1028,
        newDelhi: 1760,
        bengaluru: 284,
      },
      amritsar: {
        patna: 1208,
        mumbai: 1409,
        bengaluru: 2098,
        chennai: 2135,
      },
      jaipur: {
        kolkata: 1360,
        chennai: 1606,
        newDelhi: 241,
        hyderabad: 1096,
      },
      sriNagar: {
        mumbai: 1673,
        amritsar: 460,
        newDelhi: 650,
      },
    },
  },
  zindagiAirways: {
    time: {
      kolkata: {
        newDelhi: 6,
        mumbai: 7,
        jaipur: 8,
        amritsar: 10,
      },

      bengaluru: {
        newDelhi: 8,
        jaipur: 14,
      },

      mumbai: {
        bengaluru: 10,
        hyderabad: 9,
        sriNagar: 7,
      },

      chennai: {
        bengaluru: 3,
        hyderabad: 6,
        sriNagar: 9,
      },

      amritsar: {
        jaipur: 5,
        newDelhi: 7,
        mumbai: 6,
      },
      hyderabad: {
        chennai: 4,
        kolkata: 6,
        amritsar: 8,
      },

      jaipur: {
        newDelhi: 12,
        sriNagar: 9,
        patna: 8,
      },

      sriNagar: {
        newDelhi: 12,
        kolkata: 7,
        mumbai: 9,
      },
      newDelhi: {
        chennai: 7,
        mumbai: 10,
        kolkata: 12,
      },
      patna: {
        hyderabad: 10,
        chennai: 12,
        mumbai: 9,
        newDelhi: 4,
      },
    },
    money: {
      bengaluru: {
        kolkata: 560, // 3297
        jaipur: 1109,
        newDelhi: 1090,
        mumbai: 1915,
      },

      newDelhi: {
        mumbai: 2216,
        bengaluru: 1887,
        chennai: 1674,
      },

      mumbai: {
        patna: 1085,
        kolkata: 1515,
        bengaluru: 1695,
        hyderabad: 1253,
        sriNagar: 655,
        newDelhi: 1517,
      },
      sriNagar: {
        newDelhi: 1422,
        bengaluru: 860,
        hyderabad: 615,
        mumbai: 1480,
      },

      kolkata: {
        mumbai: 842,
        newDelhi: 1700,
        amritsar: 2098,
        patna: 1140,
      },

      patna: {
        kolkata: 1182,
        newDelhi: 1253,
        mumbai: 620,
        jaipur: 1096,
      },

      hyderabad: {
        mumbai: 1028,
        newDelhi: 1760,
        bengaluru: 284,
        kolkata: 1885,
        chennai: 2135,
      },

      chennai: {
        patna: 1208,
        mumbai: 1409,
        bengaluru: 2098,
        hyderabad: 1096,
      },

      amritsar: {
        kolkata: 1360,
        chennai: 1606,
        newDelhi: 241,
      },
      jaipur: {
        mumbai: 1673,
        amritsar: 460,
        newDelhi: 650,
      },
    },
  },
  suhanaAiways: {
    time: {
      mumbai: {
        kolkata: 2,
        newDelhi: 6,
        jaipur: 8,
        amritsar: 10,
      },
      newDelhi: {
        jaipur: 14,
        bengaluru: 12,
        mumbai: 7,
      },

      amritsar: {
        mumbai: 4,
        bengaluru: 10,
        hyderabad: 9,
        sriNagar: 7,
        newDelhi: 8,
      },

      bengaluru: {
        hyderabad: 6,
        sriNagar: 9,
        chennai: 12,
      },

      patna: {
        jaipur: 5,
        newDelhi: 7,
        mumbai: 6,
        bengaluru: 3,
      },
      hyderabad: {
        chennai: 4,
        kolkata: 6,
        amritsar: 8,
      },
      chennai: {
        newDelhi: 12,
        sriNagar: 9,
        patna: 8,
      },

      jaipur: {
        newDelhi: 12,
        kolkata: 7,
        mumbai: 9,
      },

      sriNagar: {
        chennai: 7,
        newDelhi: 9,
        mumbai: 10,
      },

      kolkata: {
        hyderabad: 10,
        chennai: 12,
        mumbai: 9,
        newDelhi: 4,
      },
    },
    money: {
      patna: {
        newDelhi: 1422,
        bengaluru: 860,
        hyderabad: 615,
        mumbai: 1915,
      },
      kolkata: {
        newDelhi: 1517,
        mumbai: 2216,
        bengaluru: 1887,
        chennai: 1674,
      },
      newDelhi: {
        mumbai: 842,
        kolkata: 1885,
        amritsar: 2098,
      },
      mumbai: {
        bengaluru: 1695,
        kolkata: 560,
        jaipur: 1109,
        newDelhi: 1090,
      },
      bengaluru: {
        patna: 1085,
        kolkata: 1515,
        mumbai: 1480,
        hyderabad: 1253,
        sriNagar: 655,
      },
      hyderabad: {
        patna: 1208,
        mumbai: 1409,
        bengaluru: 2098,
        chennai: 2135,
      },
      chennai: {
        mumbai: 1028,
        newDelhi: 1760,
        bengaluru: 284,
      },
      amritsar: {
        patna: 1140,
        kolkata: 1182,
        newDelhi: 1253,
        mumbai: 620,
        jaipur: 1096,
      },
      jaipur: {
        mumbai: 1673,
        amritsar: 460,
        newDelhi: 650,
        newDelhi: 1700,
      },
      sriNagar: {
        kolkata: 1360,
        chennai: 1606,
        newDelhi: 241,
        hyderabad: 1096,
      },
    },
  },
};

var UICtrl = (() => {
  var DOMString = {
    clearBtn: ".clear_bttn",
    search_bttn: ".search_bttn",
    origin: ".value1",
    destination: ".value2",
    preference: ".travel",
    output: ".output",
  };
  var ClearFields = () => {
    document.querySelector(DOMString.origin).value = "";
    document.querySelector(DOMString.destination).value = "";
    document.querySelector(DOMString.preference).value = "";
    document.querySelector(DOMString.output).innerHTML = "";
  };
  var getValue = () => {
    return {
      origin: document.querySelector(DOMString.origin).value,
      destination: document.querySelector(DOMString.destination).value,
      preferences: document.querySelector(DOMString.preference).value,
    };
  };
  var updateOutput = (
    origin,
    destination,
    answer,
    path,
    preference,
    airway,
    ind
  ) => {
    let ans;
    let outputName = {
      patna: "Patna",
      kolkata: "Kolkata",
      newDelhi: "New Delhi",
      mumbai: "Mumbai",
      bengaluru: "Bengaluru",
      hyderabad: "Hyderabad",
      chennai: "Chennai",
      amritsar: "Amritsar",
      jaipur: "Jaipur",
      sriNagar: "Sri Nagar",
      suhanaAiways: "Suhana Airways",
      zindagiAirways: "Zindagi Airways",
      safarAirways: "Safar Airways",
    };
    origin = outputName[origin];
    destination = outputName[destination];
    let tmp;
    if (preference === "time") {
      tmp = answer * 2347;
    } else {
      tmp = Math.round(answer * 6.3892);
      answer = Math.round(tmp / 1000);
    }
    if (path.length === 0) {
      ans = `<hr> <div class="output-value-1"><p>  ${ind}. &emsp; ${outputName[airway]} <br>&emsp;&emsp; ${origin} to ${destination} &emsp; Price: <i class="fas 
            fa-rupee-sign fa-xs"  ></i>${tmp}.00 &emsp; Time: ${answer}.00 hr</p></div>`;
    } else {
      ans = `<hr> <div class="output-value-2"><p>  ${ind}. &emsp; ${outputName[airway]} <br>&emsp;&emsp; ${origin} to ${destination} &emsp; Price: <i class="fas 
            fa-rupee-sign fa-xs"  ></i>${tmp}.00 &emsp; Time: ${answer}.00 hr <br> &emsp;&emsp; `;
      path.forEach((cur) => {
        ans = ans + `via ` + outputName[cur] + ` `;
      });
      ans = ans + `</p> </div>`;
    }
    document.querySelector(".output").insertAdjacentHTML("beforeend", ans);
  };
  return {
    DOMString,
    clearFiels: ClearFields,
    getValue: getValue,
    updateOutput: updateOutput,
  };
})();

var controller = (function (UICtrl) {
  const DOMString = UICtrl.DOMString;
  document.querySelector(DOMString.clearBtn).addEventListener("click", () => {
    UICtrl.clearFiels();
  });
  let value;
  document
    .querySelector(DOMString.search_bttn)
    .addEventListener("click", () => {
      document.querySelector(DOMString.output).innerHTML = "";
      value = UICtrl.getValue();
      if (!value.destination || !value.origin || !value.preferences) {
        alert("Please Enter Correct Value");
      } else {
        calcPath(value);
      }
    });
  var select = (result, visited) => {
    let min = infinity;
    let t = -1;
    for (var v in result) {
      if (!visited[v] && min > result[v]) {
        t = v;
        min = result[v];
      }
    }
    return t;
  };
  var calcPath = (value) => {
    const origin = value.origin;
    const destination = value.destination;
    const preference = value.preferences;

    var ans,
      ind = 1;
    for (var cur in data) {
      let tempValue = {
        ...value,
      };
      var arr = new Array();
      if (origin === destination) {
        UICtrl.updateOutput(origin, destination, 0, arr, preference, cur, ind);
      } else {
        while (1) {
          var result = calcResult(tempValue, data[cur]);
          if (tempValue.destination === destination) {
            ans = result.result;
          }
          if (result.path === origin) {
            break;
          }
          arr.push(result.path);
          tempValue.destination = result.path;
        }
        if (arr.lenth > 0) arr.reverse();

        UICtrl.updateOutput(
          origin,
          destination,
          ans,
          arr,
          preference,
          cur,
          ind
        );
      }
      ind++;
    }
  };

  var calcResult = (value, data) => {
    const origin = value.origin;
    const destination = value.destination;
    const preference = value.preferences; // time or money
    var arr = new Array();
    var result = {
      patna: infinity,
      kolkata: infinity,
      newDelhi: infinity,
      mumbai: infinity,
      bengaluru: infinity,
      hyderabad: infinity,
      chennai: infinity,
      amritsar: infinity,
      jaipur: infinity,
      sriNagar: infinity,
    };
    var visited = {
      patna: 0,
      kolkata: 0,
      newDelhi: 0,
      mumbai: 0,
      bengaluru: 0,
      hyderabad: 0,
      chennai: 0,
      amritsar: 0,
      jaipur: 0,
      sriNagar: 0,
    };
    result[origin] = 0;
    var path;

    for (var i = 1; i <= 9; i++) {
      var tmp = select(result, visited);
      if (tmp != -1) {
        visited[tmp] = 1;
        for (var cur in result) {
          var tx = data[preference][tmp][cur];
          if (!visited[cur] && tx && result[cur] > result[tmp] + tx) {
            result[cur] = result[tmp] + tx;
            if (cur == destination) {
              path = tmp;
            }
          }
        }
      }
    }
    return {
      result: result[destination],
      path: path,
    };
  };

  return {
    init: function () {
      UICtrl.clearFiels();
    },
  };
})(UICtrl);
controller.init();
