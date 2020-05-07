var budgetController = (function(){
    var expense = function(id,des,val){
        this.id = id;
        this.description = des;
        this.value = val;
    }
    var income = function(id,des,val){
        this.id = id;
        this.description = des;
        this.value = val;
    }
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
        budgetExpensesPercentage: '.budget__expenses--percentage'
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

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type==='exp'){
                element = DOMstring.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace the new things
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert it back to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        // displaying budget
        displayBudget: function(obj){
            document.querySelector(DOMstring.budgetValue).textContent = obj.budget;
            document.querySelector(DOMstring.budgetIncomeValue).textContent = obj.income;
            document.querySelector(DOMstring.budgetExpensesValue).textContent = obj.expenses;
            if(obj.percentage>0){
                document.querySelector(DOMstring.budgetExpensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.budgetExpensesPercentage).textContent = '---';
            }
            
        }
    };

})();

var controller = (function(budgetCtrl, UICtrl){

    var setUpEvent = function(){
        var inpDOM = UICtrl.getDomStrings();
        // if button is pressed
        document.querySelector(inpDOM.inpBtn).addEventListener('click',ctrlAddItem);

        // if enter key is pressed
        document.addEventListener('keypress', function(e){
            if(e.keyCode===13 || e.which===13){
                ctrlAddItem();
            }
        });
    };


    var updateBudget = function(){
        var tmp;

        // 1. calculate budget
        budgetCtrl.calculateBudget();

        // update in data str
        //already updated

        // 2. return budget
        var tmp = budgetCtrl.getBudget();

        // 3. update in UI
        UICtrl.displayBudget(tmp);
        console.log(tmp);


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
        }
        

    };

    return {
        //initialisation function
        //public object
        init: function(){
            setUpEvent();
            console.log('app start');
        }
    };
})(budgetController, UIController);

// starting app
controller.init();