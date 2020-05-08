var budgetController = (function(){
    var expense = function(id,des,val){
        this.id = id;
        this.description = des;
        this.value = val;
        this.percentage = -1;
    };

    expense.prototype.calcPercentage = function(){
        if(data.total.inc>0){
            this.percentage = Math.round((this.value/data.total.inc)*100);
        } else {
            this.percentage = -1;
        }
        
    }
    var income = function(id,des,val){
        this.id = id;
        this.description = des;
        this.value = val;
    };

    //data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0,
            budget: 0,
            percentage: 0
        }
    };
    return {
        //public object
        //ading new item in data structure
        addItem: function(type, des, val){
            var newItem,ID;
            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            }
            // type is exp or inc
            if(type==='exp'){
                newItem = new expense(ID,des,val);
            } else if(type==='inc'){
                newItem = new income(ID,des,val);
            }
            data.allItems[type].push(newItem);
            data.total[type] += val;
            return newItem;
        },

        //deleting item from Data str

        deleteItem: function(type, ID){

            // deleting item by getting index with the help Id n using splice method
            var index = -1;
        
            for(var i=0; i<data.allItems[type].length; i++){
                if(data.allItems[type][i].id === ID){
                    index = i;
                    break;
                }
            };
            if(index>=0){
                data.total[type] -= data.allItems[type][index].value;
                data.allItems[type].splice(index,1);
            }

        },

        calculateBudget: function(){
            var tmp = data.total;
            // total inc and exp
            // i know it

            // total budget
            tmp.budget = tmp.inc - tmp.exp;

            // percentage
            if(tmp.inc > 0){
                tmp.percentage = Math.round((tmp.exp / tmp.inc)*100);
            } else {
                tmp.percentage = -1;
            }
        },

        // calculating percentage

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage();
            });
        },

        // funnct for getting budget
        getBudget: function(){
            var tmp = data.total;
            return {
                budget: tmp.budget,
                income: tmp.inc,
                expenses: tmp.exp,
                percentage: tmp.percentage
            }
        },

        // getting back percentages
        getExpPercentages: function(){
            var allPercentages;
            allPercentages = data.allItems.exp.map(function(curr){
                return curr.percentage;
            });
            return allPercentages;
        },

        // function for testing
        test: function(){
            console.log(data);
        }
    };
})();

var UIController = (function(){
    //all UI methods

    var DOMstring = {
        inpType: '.add__type',
        inpDes: '.add__description',
        inpValue: '.add__value',
        inpBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetValue: '.budget__value',
        budgetIncomeValue: '.budget__income--value',
        budgetExpensesValue: '.budget__expenses--value',
        budgetExpensesPercentage: '.budget__expenses--percentage',
        container: '.container',
        expPercentage: '.item__percentage',
        monthNyear: '.budget__title--month'
    };


    var formatNum = function(num, type){
        var newNum, intPart, decPart, res, len;
        num = Math.abs(num);
        num = num.toFixed(2);
        newNum = num.split('.');
        intPart = newNum[0];
        decPart = newNum[1];
        res = '';
        len = intPart.length;
        while(len>0){
            if(len>3){
                res = intPart.substr(len-3,3) + ',' + res;
            } else{
                res = intPart.substr(0,len) + ',' + res;
            }
            len -= 3;
        };
        res = res.substr(0,res.length-1);
        if(type==='inc'){
            num = '+ ' + res + '.' + decPart;
        } else if (type==='exp'){
            num = '- ' + res + '.' + decPart;
        }
        return num;
    };

    return {
        //public object
        getInput: function(){
            return {
                //getting input from UI
                type : document.querySelector(DOMstring.inpType).value,
                description : document.querySelector(DOMstring.inpDes).value,
                value : parseFloat(document.querySelector(DOMstring.inpValue).value)
            };
        },
        clearFields: function(){
            document.querySelector(DOMstring.inpType).value = 'inc';
            var f = document.querySelectorAll(DOMstring.inpValue + ', ' + DOMstring.inpDes);
            f = Array.prototype.slice.call(f);
            f.forEach(function(curr){
                curr.value="";
            });
            document.querySelector(DOMstring.inpType).focus();
        },
        getDomStrings: function(){
            return DOMstring;
        },

        // adding item in list in UI
        addListItem: function(obj, type){
            var html, newHtml, element;
            //get elements from HTMl
            if(type==='inc'){
                element = DOMstring.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type==='exp'){
                element = DOMstring.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace the new things
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNum(obj.value,type));

            //insert it back to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        // deleting items from UI
        deleteListItem: function(itemID){
            // will remove through itemID
            // we cant delet element directly.. onli child can b dltd.. so we will first find parent and so..
            var docItem = document.getElementById(itemID);
            var itemParent = docItem.parentNode; // found parent of itemID
            itemParent.removeChild(docItem);
        },

        // displaying budget
        displayBudget: function(obj){
            var type = obj.budget >= 0 ? 'inc': 'exp';
            document.querySelector(DOMstring.budgetValue).textContent = formatNum(obj.budget,type);
            document.querySelector(DOMstring.budgetIncomeValue).textContent = formatNum(obj.income,'inc');
            document.querySelector(DOMstring.budgetExpensesValue).textContent = formatNum(obj.expenses,'exp');
            if(obj.percentage>0){
                document.querySelector(DOMstring.budgetExpensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.budgetExpensesPercentage).textContent = '---';
            }
        },

        // updating percentages
        updatePercentage: function(arr){
            var ind=0;
            var tmp = document.querySelectorAll(DOMstring.expPercentage);
            tmp = Array.prototype.slice.call(tmp);
            tmp.forEach(function(curr){
                if(arr[ind]>0){
                    curr.textContent = arr[ind] + '%';
                } else {
                    curr.textContent = '---';
                }
                ind++;
            })
        },

        // display month n year
        displayMonthYear: function(){
            var m,y,now,months;
            months = ['January','February','March','April','May','June','July','August','September','October','November','December']
            now = new Date();
            m = now.getMonth();
            m = months[m];
            y = now.getFullYear();
            document.querySelector(DOMstring.monthNyear).textContent =  m + ' ' + y;
        }
    };

})();

var controller = (function(budgetCtrl, UICtrl){

    var setUpEvent = function(){
        var inpDOM = UICtrl.getDomStrings();

        // done click is pressed
        document.querySelector(inpDOM.inpBtn).addEventListener('click',ctrlAddItem);

        // if enter key is pressed
        document.addEventListener('keypress', function(e){
            if(e.keyCode===13 || e.which===13){
                ctrlAddItem();
            }
        });

        // delete button clock
        document.querySelector(inpDOM.container).addEventListener('click',ctrlDltItem);

    };

    // calculate and update budgets
    var updateBudget = function(){

        // 1. calculate budget
        budgetCtrl.calculateBudget();

        // update in data str
        //already updated

        // 2. return budget
        var budgetObj = budgetCtrl.getBudget();

        // 3. update in UI
        UICtrl.displayBudget(budgetObj);
    };

    // calculate n update percentages

    var updatePercentages = function(){
        var res;

        // 1. calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. read back pecnatages
        res = budgetCtrl.getExpPercentages();
        //console.log(res);

        // 3. update in UI
        UICtrl.updatePercentage(res);

    };


    var ctrlAddItem = function(){
        var inp,newItem;

        // 1. get input item
        inp = UICtrl.getInput();
        
        if(inp.description && inp.value){
            
            // 2. add it to data str... budgetContrl
            newItem = budgetCtrl.addItem(inp.type, inp.description, inp.value);

            // 3. add it back to UI interface through UICtrl
            UICtrl.addListItem(newItem, inp.type);     
            
            // 4. clear fields
            UICtrl.clearFields();

            // 5. calculate n update budgets
            updateBudget();

            // 6. calculate n update percentages
            updatePercentages();
        }
    };

    var ctrlDltItem = function(event){
        var itemID,splitItem, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemID);
        if(itemID){
            splitItem = itemID.split('-');
            type = splitItem[0];
            ID = splitItem[1];
    
            // 1. delete item from Data str
            budgetCtrl.deleteItem(type, parseInt(ID));
    
            // 2. update UI 
            UICtrl.deleteListItem(itemID);
    
            // 3. update budget
            updateBudget();

            // 4. calculate n update percentages
            updatePercentages();
        }
    };

    return {
        //initialisation function
        //public object
        init: function(){
            setUpEvent();
            updateBudget();
            UICtrl.displayMonthYear();
            console.log('app start');
        }
    };
})(budgetController, UIController);

// starting app
controller.init();