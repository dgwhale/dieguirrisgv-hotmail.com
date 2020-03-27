// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]


const noCompany = [0, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]
const noCompany2 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]
const noCompany3 = [1, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, noCompany, noCompany2, noCompany3]


// Add your functions below:

function validateCred(credNum) {
    let validator = [];
    let creditCard = [];
    //I did this because working with the variable kept mutating the original array.
    //This is the solution I came up with. 
    for (let i = 0; i<credNum.length; i++) {
        creditCard.push(credNum[i]);
    }
    //reverse card to make it easier to navigate through. 
    creditCard.reverse();
    for(let i = 0; i < creditCard.length; i++) {
        //Check to see if it is an even number.
        if (i % 2 === 0) {
            validator.push(creditCard[i]);
            //Check to see if the doubled integer is bigger than 9
        } else if(creditCard[i] * 2 >= 9) {
            creditCard[i] = (creditCard[i] *2) - 9;
            validator.push(creditCard[i]);
            //Add integer smaller than 9
        } else {
            validator.push(creditCard[i] * 2);
        }
    }

    //sum all values.
    let sum = validator.reduce((a, b) => a+b, 0);
    //check if valid.
    if(sum % 10 === 0) {
        return true;
    } else {
        return false;
    }

}

function findInvalidCards(creditCards) { 
    const invalidCards = [];
    for (let i = 0; i < creditCards.length; i++) {
        let valid = validateCred(creditCards[i]);
        if (valid === false) {
            invalidCards.push(creditCards[i]);
        }
    }
    return invalidCards;
}

function idInvalidCardCompanies(invalidCards) {
    let companies = [];
    let invalidCompanyCntr = 0;
    for (let i = 0; i < invalidCards.length; i++) {
        switch (invalidCards[i][0]) {
            case 3:
                if (companies.includes('Amex') != true) {
                    companies.push('Amex');
                }
                break;
            case 4:
                if (companies.includes('Visa') != true) {
                    companies.push('Visa');
                }
                break;
            case 5:
                if (companies.includes('Mastercard') != true) {
                    companies.push('Mastercard');
                }
                break;
            case 6:
                if (companies.includes('Discover') != true) {
                    companies.push('Discover');
                }
                break;
            default:
                if (contains(companies, invalidCompanyCntr) != true) {
                    invalidCompanyCntr++;
                    companies.push('Company not found ' + invalidCompanyCntr + ' times.');
                } else{

                    var filteredAry = companies.filter(function(e) { return e !== `Company not found ${invalidCompanyCntr} times.`});

                    companies = filteredAry;

                    invalidCompanyCntr++;

                    companies.push('Company not found ' + invalidCompanyCntr + ' times.');
                }
                break;
        }
    }
    return companies;
}

//let test = findInvalidCards(batch);

//console.log(idInvalidCardCompanies(test))


function contains(a, statement) {
    for (let i = 0; i < a.length; i++) {
       if (a[i] === 'Company not found ' + statement + ' times.') {
           return true;
       }
    }
    return false;
}

function stringToNum(cardString) {
    const arr = [];
    for(let i = 0; i < cardString.length; i++) {
        arr.push(parseInt(cardString[i]));
    }
    return arr;
}


function makeValid(arr) {
    //start it as the beggining of validate to get the addition values. 
    let validator = [];
    let creditCard = [];
    for (let i = 0; i<arr.length; i++) {
        creditCard.push(arr[i]);
    }
    creditCard.reverse();
    for(let i = 0; i < creditCard.length; i++) {
        if (i % 2 === 0) {
            validator.push(creditCard[i]);

        } else if(creditCard[i] * 2 >= 9) {
            //creditCard[i] = (creditCard[i] *2) - 9;
            validator.push((creditCard[i] * 2) - 9);

        } else {
            validator.push(creditCard[i] * 2);
        }
    }

    //sum all values.
    let sum = validator.reduce((a, b) => a+b, 0);

    const remainder = sum % 10;
    console.log(remainder);
    switch (remainder) {
        case 1:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 1)) {
                    creditCard[i] -= 1;
                    break;
                }
            }
            break;
        case 2:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 2)) {
                    creditCard[i] -= 2;
                    break;
                }
            }
            break;
        case 3:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 3)) {
                    creditCard[i] -= 3;
                    break;
                }
            }
            break;
        case 4:
            for(let i = 1; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 4)) {
                    creditCard[i] -= 4;
                    break;
                }
            }
            break;
        case 5:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 5)) {
                    creditCard[i] -= 5;
                    break;
                }
            }
            break;
        case 6:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >=6)) {
                    creditCard[i] -= 6;
                    break;
                }
            }
            break;
        case 7:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i] >= 7)) {
                    creditCard[i] -= 7;
                    break;
                }
            }
            break;
        case 8:
            for(let i = 0; i < creditCard.length; i++) {
                if((i % 2 === 0 || i === 0) && (creditCard[i]>= 8)) {
                    creditCard[i] -= 8;
                    break;
                }
            }
            case 9:
                for(let i = 0; i < creditCard.length; i++) {
                    if((i % 2 === 0 || i === 0) && (creditCard[i] >= 9)) {
                        creditCard[i] -= 9;
                        break;
                    }
                }
            break;
    }

    return creditCard.reverse();
}
/*
const InvStr1 ='4532778771091795'
const InvArr1 = stringToNum(InvStr1);
let testCard1 = makeValid(InvArr1)
console.log(testCard1);
console.log(validateCred(testCard1));

const InvStr2 ='6011377020962656203'
const InvArr2 = stringToNum(InvStr2);
let testCard2 = makeValid(InvArr2)
console.log(testCard2);
console.log(validateCred(testCard2));
*/