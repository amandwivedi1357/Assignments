1.Roman to integer
var romanToInt = function(s) {
    const romanChars = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let result = 0;

    for (let i = 0; i < s.length; i++) {
        let curr = romanChars[s[i]];
        let next = romanChars[s[i + 1]];

        if (curr < next) {
            result -= curr;
        } else {
            result += curr;
        }
    }

    return result; 
};


2.Excel Sheet

var convertToTitle = function(col) {
    let str = '';
    while(col > 0) {
        col--;
        str += String.fromCharCode((col % 26) + 65);
        col = Math.floor(col / 26);
    }
    str = str.split('').reverse().join('');
    return str;
};

4. 

var titleToNumber = function(col) {
    let ans = 0
        let len = col.length	
    for(let i =0; i< len; i++) {
         ans = ans*26 + col.charCodeAt(i) - 64
    }
    return ans
};







