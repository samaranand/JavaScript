const infinity = 999999;

let data = {
    'time': {
        'patna' : {
            'kolkata': 2,
            'newDelhi': 6,
            'mumbai' : 7,
            'jaipur':8,
            'amritsar': 10
        },
        'kolkata' : {
            'newDelhi': 8,
            'jaipur': 14,
            'bengaluru':12

        },
        'newDelhi' : {
            'mumbai':4,
            'bengaluru': 10,
            'hyderabad': 9,
            'sriNagar': 7

        },
        'mumbai' : {
            'bengaluru': 3,
            'hyderabad': 6,
            'sriNagar': 9,
            'chennai':12

        },
        'bengaluru' : {
            'jaipur': 5,
            'newDelhi': 7,
            'mumbai':6

        },
        'hyderabad' : {
            'chennai':4,
            'kolkata':6,
            'amritsar':8

        },
        'chennai' : {
            'newDelhi':12,
            'sriNagar':9,
            'patna':8

        },
        'amritsar' : {
            'newDelhi': 12,
            'kolkata': 7,
            'mumbai':9

        },
        'jaipur' : {
            'chennai':7,
            'newDelhi':9,
            'mumbai':10

        },
        'sriNagar' : {
            'hyderabad':10,
            'chennai':12,
            'mumbai':9,
            'newDelhi':4
        }
    },
    'money' : {
        'patna' : {

        },
        'kolkata' : {

        },
        'newDelhi' : {

        },
        'mumbai' : {

        },
        'bengaluru' : {

        },
        'hyderabad' : {

        },
        'chennai' : {

        },
        'amritsar' : {

        },
        'jaipur' : {

        },
        'sriNagar' : {

        }

    }
}


var t = []




var UICtrl = (()=>{
    var DOMString = {
        clearBtn : '.clear_bttn',
        search_bttn : '.search_bttn',
        origin : '.value1',
        destination : '.value2',
        preference : '.travel',
        output: '.output'
    };
    var ClearFields = ()=>{
        document.querySelector(DOMString.origin).value = "";
        document.querySelector(DOMString.destination).value = "";
        document.querySelector(DOMString.preference).value = "";
        document.querySelector(DOMString.output).innerHTML = "";
    };
    var getValue = ()=>{
        return {
            origin: document.querySelector(DOMString.origin).value,
            destination: document.querySelector(DOMString.destination).value,
            preferences: document.querySelector(DOMString.preference).value
        }
    };
    var updateOutput = (origin, destination, answer, path) => {
        let ans;
        console.log(origin);
        console.log(destination);
        console.log(answer);
        console.log(path);
        let outputName = {
            'patna' : 'Patna',
            'kolkata' : 'Kolkata',
            'newDelhi' : 'New Delhi',
            'mumbai' :   'Mumbai',
            'bengaluru' : 'Bengaluru',
            'hyderabad' : 'Hyderabad',
            'chennai' : 'Chennai',
            'amritsar' : 'Amritsar',
            'jaipur' :   'Jaipur',
            'sriNagar' :   'Sri Nagar' 
        }
        origin = outputName[origin];
        destination = outputName[destination];
        let price = answer*150;
        if(path.length === 0){
            ans = `<div class="output-value-0"><p>  1. &emsp;  ${origin} to ${destination} &emsp; Price: <i class="fas fa-rupee-sign fa-xs"  ></i>${price} &emsp; Time: ${answer}.00 hr</p></div>`;
            console.log('samar')
        } else {
            console.log('anand');
            ans = `<div class="output-value-2-0"><p>   1. &emsp;  ${origin} to ${destination} &emsp; Price: <i class="fas fa-rupee-sign fa-xs"  ></i>${price} &emsp; Time: ${answer}.00 hr <br> &emsp;&emsp; `;
            path.forEach(cur => {
                ans = ans + `via ` + outputName[cur] + ` `;
            });
            ans = ans + `</p> </div>`;
        }
        console.log(ans);
        document.querySelector('.output').insertAdjacentHTML('beforeend',ans);
    }
    return {
        DOMString,
        clearFiels: ClearFields,
        getValue: getValue,
        updateOutput: updateOutput
    }
})();



var controller = (function(UICtrl){
    const DOMString = UICtrl.DOMString;
    document.querySelector(DOMString.clearBtn).addEventListener('click',()=>{
        UICtrl.clearFiels();
    });
    let value;
    document.querySelector(DOMString.search_bttn).addEventListener('click',()=>{
        document.querySelector(DOMString.output).innerHTML = "";
        value = UICtrl.getValue();
        if(!value.destination || !value.origin || !value.preferences){
            alert('Please Enter Correct Value');
        } else {
            calcPath(value);
        }
    });
    var select = (result, visited)=>{
        let min = infinity;
        let t=-1;
        for(var v in result){
            if(!visited[v] && min > result[v]){
                t = v;
                min = result[v];
            }
        }
        return t;
    }
    var calcPath = (value)=>{
        const origin = value.origin;
        const destination = value.destination;
        const preference = value.preferences;
        var arr = new Array;
        var ans;
        if(origin===destination){
            UICtrl.updateOutput(origin,destination, 0, arr);    
        }else{
            while(1){
                var result = calcResult(value);
                if(value.destination === destination){
                    ans = result.result;
                }
                if(result.path===origin){
                    break;
                }
                arr.push(result.path);
                value.destination = result.path;
            }
            if(arr.lenth > 0)
                arr.reverse();
            
            UICtrl.updateOutput(origin,destination, ans, arr);
        }

    }

    var calcResult = (value)=>{
        const origin = value.origin;
        const destination = value.destination;
        const preference = value.preferences; // time or money
        var arr = new Array();
        var result =  {
            'patna' : infinity,
            'kolkata' : infinity,
            'newDelhi' : infinity,
            'mumbai' : infinity,
            'bengaluru' : infinity,
            'hyderabad' : infinity,
            'chennai' : infinity,
            'amritsar' : infinity,
            'jaipur' : infinity,
            'sriNagar' : infinity
        };
        var visited =  {
            'patna' : 0,
            'kolkata' : 0,
            'newDelhi' : 0,
            'mumbai' : 0,
            'bengaluru' : 0,
            'hyderabad' : 0,
            'chennai' : 0,
            'amritsar' : 0,
            'jaipur' : 0,
            'sriNagar' : 0
        }
        result[origin] = 0;
        var path;
    
        for(var i=1; i<=9; i++){
            var tmp = select(result, visited);
            if(tmp != -1){
                visited[tmp]=1;
                for(var cur in result){
                    var tx = data[preference][tmp][cur];
                    if(!visited[cur] && tx && result[cur] > result[tmp] + tx){
                        result[cur] = result[tmp] + tx;
                        if(cur== destination){
                            path = tmp;
                        }
                    }
                }
            }
        }
        return {
            result: result[destination],
            path: path
        }
    }

    return {
        init : function(){
            UICtrl.clearFiels();
        }
    }
})(UICtrl);
controller.init();