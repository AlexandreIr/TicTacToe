//filtra, em um determinado array, todos os não-array
function filter_list(l) {
    let filtered=[]
    l.forEach(function (value){
        if(typeof value != 'string')filtered.push(value);
    });
    return filtered;
}

//quantas vezes alguém vê uma bola pulando
function bouncingBall(h,  bounce,  window) {
    if(window<h && h>0 && bounce>0 && bounce<1){
        let counter=1;
        let bounceHeigth=h*bounce;    
        while(bounceHeigth>window){
            counter+=2;
            bounceHeigth*=bounce;
        }
        return counter;
    }
    return -1;
}

//retorna uma fração com os erros de uma impressora
function printerError(s) {
    const patern=/[n-z]/gm;
    let errors=0;
    let denominator=0;

    for(let i=0;i<s.length;i++){
        denominator++;
        if(s[i].match(patern)){
            errors++;
        }
    }
    return `${errors}/${denominator}`;
}

//retira numeros seguidos repetidos 
var uniqueInOrder=function(iterable){
    return [...iterable].filter((a, i) => a !== iterable[i-1])
}

//dizer se um membro é senio ou open
function openOrSenior(data){
    const categories=[]
    for(i=0;i<data.length;i++){
        if(data[i][0]>=55 && data[i][1]>7){
            categories.push('Senior');
        }else{
            categories.push('Open');
        }
    }
    return categories;
}
//ordenar substrings de um outro array de strings
function inArray(array1,array2){
    const substrings=[];
    for(let i=0;i<array2.length;i++){
        for(let j=0; j<array1.length;j++){
            if(array2[i].includes(array1[j]) && !substrings.includes(array1[j])){
                substrings.push(array1[j]);
            }
        }
    }
    return substrings.sort();
}

//encontrar indíce no array de soma nos 2 lados
function findEvenIndex(arr){
    let rigth=arr.reduce(function(tot, cur){return tot+cur}, 0);
    let left=0;
    for(let i=0; i<arr.length; i++){
        if(i>0)rigth-=arr[i-1];
        left+=arr[i];
        if(left==rigth) return i;
    }
    return -1;
}
//camel case 
function toCamelCase(str){
    const pattern= /\W|_/gm;
    let CamelCaseStr=''
    for(let i=0; i<str.length; i++){
        if(!str[i].match(pattern) && str[i]){ 
            CamelCaseStr+=str[i];
        }else{
            str[i].replace(pattern, '');
            CamelCaseStr+=str[i+1].toUpperCase();
            i++;
        }
    }
    return CamelCaseStr;
}

function narcissistic(value) {
    const valueAsArray=[...value.toString()]
    return valueAsArray.map(function (value)
    {return parseInt(value**valueAsArray.length)})
    .reduce(function(cum, curr){return cum+curr},0)==value?true:false
}

console.log(narcissistic(153))

function filter_list2(l) {
    const filtered=[];
    l.forEach(item=>{
        if(typeof item != 'string') filtered.push(item);
    })
    return filtered;
}

function cakes(recipe, available) {
    return Object.keys(recipe).reduce(function(val, ingredient) {
        return Math.min(Math.floor(available[ingredient] / recipe[ingredient] || 0), val)
    }, Infinity)  
}
