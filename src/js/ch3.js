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
