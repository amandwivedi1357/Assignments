//1. FlattenArray
function flatten(arr){
    let stack = [...arr];
    let res = [];
    
    while(stack.length){
        let curr = stack.pop();
        
        if(Array.isArray(curr)){
            stack.push(...curr)
        }
        else{
            res.push(curr)
        }
    }
    return res.reverse()
}

console.log(flatten([1,2,3,[4,5,[6,7]]]))

//2.


function groupBy(fruits) {
    let prod = {};

    for (let i = 0; i < fruits.length; i++) {
        const el = fruits[i];
        const type = el.type;

        if (!prod[type]) {
            prod[type] = [];
        }

        prod[type].push(el);
    }

    return prod;
}


//3.

 function deepClone(obj) {
    if ( typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(el => this.deepClone(el));
    }
    
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    
    return cloned;
  },




//4.

Array.prototype.myMap = function(cb) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }

  return result;
};

//5. 
Array.prototype.myReduce = function(cb, init) {
  let acc = init;
  let sp = 0;

  if (acc === undefined) {
    acc = this[0];
    sp = 1;
  }

  for (let i = sp; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }

  return acc;
};

console.log([1,2,3,4,5].myReduce((acc,el)=>{
    return acc+el
},0))
