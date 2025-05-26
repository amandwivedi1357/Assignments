2. Group Anagrams

function groupAnagrams(strs) {

 let map ={}

for(let char of strs){
    let sorted = char.split('').sort().join('');
    if(!map[sorted]){
        map[sorted]=[]
    }
    map[sorted].push(char)
}

return Object.values(map)
}
