var contacts = [{
        "user": "Igor V",
        "brand": ["VW Golf", "Renault Symbol"],
        "phones": ["380684567934"]
    },
    {
        "user": "Igor S",
        "brand": ["Mazda CX-5", "VV bora"],
        "phones": ["380685438903"]
    },
    {
        "user": "Ruslan",
        "brand": ["Mazda 3", "VV bora", "VAZ 2111"],
        "phones": ["380986784345"]
    },
    {
        "user": "Roman",
        "brand": ["Mercedes GL", "Skoda Roomster"],
        "phones": ["380989909876"]
    },
    {
        "user": "Andriy",
        "brand": ["Peugeot Expert", "Skoda Roomster"],
        "phones": ["380681687096"]
    },
    {
        "user": "Bohdan",
        "brand": ["Volkswagen Polo", "Dacia Logan"],
        "phones": ["380979399997", "380959388887"]
    },
    {
        "user": "Vasya",
        "brand": ["Renault Kadjar", "Dacia Logan"],
        "phones": ["380970999997"]
    },
    {
        "user": "Dmytro",
        "brand": ["KIA Sorento", "Dacia Logan", "Mitsubishi Outlander"],
        "phones": ["380979889977"]
    },
    {
        "user": "Oleksiy",
        "brand": ["Nissan Qashqai", "Mitsubishi Outlander"],
        "phones": ["380998899990"]
    },
    {
        "user": "Yuriy",
        "brand": ["Toyota Camry"],
        "phones": ["380957899632"]
    }
];
/*return user info version with Array.reduce()*/
function getUsersInfo(parsedJSON) {
    let result = parsedJSON.reduce((previous, current) => {
        return previous.set(Object.values(current).shift(), Object.values(current).slice(1))
    }, new Map())
    return result;
}

/*return user info version 1 */
function getUsersInfoV2(parsedJSON) {
    let result = new Map();
    parsedJSON.forEach(element => {
        let info = {
            "brand": element.brand,
            "phones": element.phones
        }
        result.set(element.user, info);
    });
    return result;
}

/* return uniq value version1*/
function getUniqValueV2(parsedJSON, property, sliceN) {
    let result = new Set();
    parsedJSON.forEach(element => {
        element[property].forEach(el => {
            let code = el.slice(0, sliceN);
            result.add(code);
        });
    });
    return result;
}


/*return uniq value version with Array.reduce()*/
function getUniqValue(parsedJSON, property, sliceN) {
    let result = parsedJSON.reduce((previous, current) => {
        current[property].forEach(el =>
            previous.add(el.slice(0, sliceN)));
        return previous;
    }, new Set());
    return result;
}


/* return object with code operator: {<user><user><user>}*/
function getCodeOperator(parsedJSON, sliceN) {
    let result = new Object();
    let uniq = getUniqValue(parsedJSON, "phones", sliceN);
    uniq.forEach(uNum => {
        let temp = parsedJSON.filter(el => {
            let bool = el.phones.some(num => {
                let code = num.slice(0, sliceN);
                return code == uNum;
            });
            if (bool) return el
        });
        result[uNum] = temp;
    });

    return result
}


/*first version */
function getUserByPhoneNumber(numStr, parsedJSON) {
    return parsedJSON.reduce((previous, current)=>{
        return (current.phones.some(i => i.includes(numStr))) ? {...previous, [current.user]: current} : {...previous}
    }, {});
}

/*uniq cars with spread */
function getUniqCars(parsedJSON){
    let result =  parsedJSON.reduce((previous, current) => [...previous, ...current.brand], [])
    return new Set(result);
}

console.log(getUsersInfo(contacts));
console.log(getUniqValue(contacts, "brand"));
console.log(getCodeOperator(contacts, 5));
console.log(getUserByPhoneNumber("099", contacts));
console.log(getUniqCars(contacts));