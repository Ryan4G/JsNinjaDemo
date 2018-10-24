chapter("3.1 函数式的不同点到底是什么")
chapter("3.1.2 回调函数")

var text = "Demo arigato";
report("Before defining functions");

function useless(ninjaCallback){
    report("In unless fucntion!");
    return ninjaCallback();
}

function getText(){
    report("In getText function!");
    return text;
}

report("Before making all calls");

assert(useless(getText) === text, "The unless function works!" +　text);

report("After the calls have been made");

/* sort callback */

var values = [0,3,4,123,3,2,1];
report("Array: " + values);
values.sort(function(value1, value2){
    return value1 - value2;
});
report("Sorted Array: " + values);

chapter("3.2 函数作为对象的乐趣")
chapter("3.2.1 存储函数")

/* function storage */

var store = {
    nextId: 1,
    cache: {},
    add: function(fn){
        if(!fn.id){
            fn.id = this.nextId++;
            this.cache[fn.id] = fn;
            return true;
        }
    }
}

function ninjia() {}
    
assert(store.add(ninjia), "function was safely added.");
assert(store.add(ninjia), "but it was only added once.");

chapter("3.2.2 自记忆函数")

function isPrime(value){
    if (!isPrime.answers){
        isPrime.answers = {};
    }

    if (isPrime.answers[value] !== undefined){
        return isPrime.answers[value];
    }

    var prime = value !== 0 && value != 1;

    for (var i = 2; i < value; i++){
        if (value % i === 0){
            prime = false;
            break;
        }
    }

    return isPrime.answers[value] = prime;
}

assert(isPrime(5), "5 is prime!");
assert(isPrime.answers[5], "the answer was cached!");

chapter("3.3 函数定义")
chapter("3.3.2 箭头函数")

var greet = name => "Greeting " + name;
assert(greet("Oishi") === "Greeting Oishi", "Oishi is properly greeted");

var anotherGreet = function(name){
    return "Greeting " + name;
};
assert(anotherGreet("Oishi") === "Greeting Oishi", "Again, Oishi is properly greeted");

chapter("3.4 函数实参和形参")
chapter("3.4.1 剩余参数")

function multiMax(first, ...remainingNumbers){
    var sorted = remainingNumbers.sort((a, b) => {
        return b - a;
    });
    return first * sorted[0];
}
assert(multiMax(3, 1, 2, 3, 4) == 12, "3 * 4 = 12 (First arg, by largest.)");

chapter("3.4.2 默认参数")

function performAction(ninjia, action = "skulking"){
    return ninjia + " " + action;
}
assert(performAction("Fuma") === "Fuma skulking", "The default value is used for Fuma");
assert(performAction("Yoshi") === "Yoshi skulking", "The default value is used for Yoshi");
assert(performAction("Hottori") === "Hottori skulking", "The default value is used for Hottori");
assert(performAction("Yagyu", "sneaking") === "Yagyu sneaking", "Yagyu can do whatever he pleases, can sneak!");