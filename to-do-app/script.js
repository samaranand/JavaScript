// selector

const todoInp = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoBtn = document.querySelector(".todo-button");
const binBtn = document.querySelector(".list-bin-button");
var id = -1;

// functions

var UIController = (function () {
  var getValueFun = function () {
    var data;
    data = todoInp.value;
    todoInp.value = "";
    return data;
  };

  return {
    getInp: function () {
      return getValueFun();
    },
    addItem: function (data) {
      id += 1;
      var v =
        '<li id="list-%id%"><div id="list-%id%-value">%data%<button class="list-bin-button" type="button"><i class="fas fa-trash-alt"></i></button></div></li>';
      //type="button"
      v = v.replace("%id%", id);
      v = v.replace("%id%", id);
      v = v.replace("%data%", data);
      todoList.insertAdjacentHTML("beforeend", v);
    },
    deleteItem: function (node) {
      var ele = document.getElementById(node);
      var parent = ele.parentNode;
      parent.removeChild(ele);
    },
  };
})();

//container-box

var controller = (function (UICtrl) {
  var startFun = function () {
    todoBtn.addEventListener("click", getInput);
    document
      .querySelector(".container-box")
      .addEventListener("keypress", function (e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          getInput();
        }
      });

    todoList.addEventListener("click", dltItem);
  };

  var getInput = function () {
    var d = UICtrl.getInp();

    if (d) {
      UICtrl.addItem(d);
    }
  };

  var dltItem = function (e) {
    var node = e.target.parentNode.parentNode.parentNode.id;
    if (node) {
      UICtrl.deleteItem(node);
    }
  };

  return {
    init: function () {
      console.log("app started");
      startFun();
    },
  };
})(UIController);

controller.init();

//OPOPOPOPOOPOPOP
