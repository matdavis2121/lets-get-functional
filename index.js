#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lowdown-matdavis2121")


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
/* FACTS--------------------------------------------------
    1. There are 8 elements in the Customers array >> customers.length
    2. 22 properties for each >> customerData.length

*/ 
// var customerDetails = []
//     _.each(customers, function(v, i, a){
//         if(i === 1){ _.each(v, function(pVal, k, o){ customerDetails.push(k) })
//         }
//     })
    //----------QUESTION # 1 - find total # of Males-------------"
var maleCustomers = []
_.each(customers, function(v, i, a){
    _.each(v, function(pVal, k, o){
        if(k === "gender" && pVal === "male"){maleCustomers.push(pVal)}
    })
})
console.log("1. The number of males = " + maleCustomers.length)    


//-----------QUESTION # 2 - find total # of Females---------
var femaleCustomers = []
_.each(customers, function(v, i, a){
    _.each(v, function(pVal, k, o){
        if(k === "gender" && pVal === "female"){femaleCustomers.push(pVal)}
    })
})
console.log("2. The number of females = " + femaleCustomers.length)    


//----QUESTION # 3&4 - find the name and age of Oldest + Youngest Customer-----

var allAges = _.pluck(customers, "age")

var youngest = []
var oldest = []

_.each(customers, function(v, i, a){
    _.each(v, function(pVal, k, o){
        if(k === "age" && pVal === allAges.sort()[0]){
            //console.log("YOUNGEST = " +o.age + " - " + o.name)
            youngest.push(o.name)
        } else if (k === "age" && pVal === allAges.sort()[allAges.length -1]){
            //console.log("OLDEST = " + o.age + " - " + o.name)
            oldest.push(o.name)            
        }
    })
})

console.log("3. This is the oldest customer - " + oldest)
console.log("4. These are the youngest customers - " + youngest)


//----QUESTION # 5 - AVERAGE BALANCE OF ALL CUSTOMERS-----
//COMMAS AND DOLLAR SIGNS AND NUMBERS TO STRINGS - SNEAKY SNEAKY!!

var allBalancesNoSymbol = []
var allBalances = _.pluck(customers, "balance");
_.each(allBalances, function(v, i, a){
    if(v[0] === "$"){
        allBalancesNoSymbol.push(v.slice(1).replace(",",""))
    }
})

allBalances = _.reduce(allBalancesNoSymbol, function(p, e, i){
    return Number(p) + Number(e)
});

var avgBalance = allBalances/(customers.length);
console.log("5. The average balance = $" + Math.floor(avgBalance))    


//----QUESTION # 6 - ARBITRARY LETTER STARTER PART 1-----
function beginWithRandomLetter(randomLetter){
var allCustomerNames = _.pluck(customers, "name")

var count = 0;    
    _.filter(allCustomerNames, function(v, i, a){
        if(v[0].toLowerCase() === randomLetter.toLocaleLowerCase()){
            count++; return true}
    })
    return count;
}

console.log("6. Total # of customers names starting with random letter = " 
            + beginWithRandomLetter("o"))


//----QUESTION # 7 - ARBITRARY LETTER STARTER PART 2-----
function friendsWithRandomLetter(randomLetter){
var allCustomerFriends = _.pluck(customers, "friends")
var allFriendArrays = [];
var allFriendsNames = [];
//Makes ONE ARRAY of only names as elements - NO ARRAY OF ARRAYS
    _.each(allCustomerFriends, function(v, i, a){
        allFriendArrays = _.pluck(v, "name")
        _.each(allFriendArrays, function(va, ind, ar){
            allFriendsNames.push(va)        
        })
    })
//Takes that array and compares with random letter
var count = 0;    
    _.filter(allFriendsNames, function(v, i, a){
        if(v[0].toLowerCase() === randomLetter.toLowerCase()){
            count++; return true}
    })
    return count;
}

console.log("7. Total # of customer's friend's names starting with random letter = " 
            + friendsWithRandomLetter("c"))



//----QUESTION # 8 - MY FRIENDS NAMES + WHO HAS MY NAME IN THEIR FRIENDS LIST---
//GLOBAL for use with 8B.
var customerIndexinArr 

function myFriendsList(customerName){
var allCustomerNames = _.pluck(customers, "name")
var customerMatch;
var friendsOfCustomer;

    _.each(allCustomerNames, function(v, i, a){
        //Testing full names and 1st names
        if(v.toLowerCase() === customerName.toLowerCase() ){ 
            customerIndexinArr = i
        } else if ( customerName.indexOf(" ") === -1){
            v.toLowerCase().slice(0, v.indexOf(" ") === customerName.toLowerCase())
                customerIndexinArr = i
        }
    })
    
    //GOTO that customer and get their friends names (array of objects)
    customerMatch = customers[customerIndexinArr]
    friendsOfCustomer = _.pluck(customerMatch.friends, "name")
    return friendsOfCustomer
    
// Will need to check for full name and just 1st name    
} // ENDOF: FUNCTION

function findWhosListImOn(){
var customerName = customers[customerIndexinArr].name
var eachFriendList = [];
var myFriends = []
    _.each(customers, function(v, i, a){
        _.each(v, function(pVal, k, o){
            if(k === "friends"){
                eachFriendList = _.pluck(pVal, "name")
                //Pluck the names of all friends and compare against customer name
                _.each(eachFriendList, function(friendName, i, friendList){
                  if(customerName === friendName){
                    myFriends.push(o.name)                  
                  }  
                })
            }
        })
    })
    return myFriends
}//ENDOF: Function

console.log("8a. The friends of customer Shelly Walton are: " + myFriendsList("Shelly Walton"))
console.log("8b. She is on the friends list of: " + findWhosListImOn("Shelly Walton") )


//----------------QUESTION # 9 - TOP 3 MOST COMMON TAGS---------------------------
/* 06/27/2017 02:00:48 -- COULD'VE JUST USED .toString() then .split(",") */ 
/* will rework and redesign LATER - COMPLETED! 06/27/2017 03:30:11 */
function top3Tags(){
var allTags = [];
var allTagsConcat
var uniqueTags
var TagCounter1 = [];
var numberedTags = []
    _.each(customers, function(v, i, a){
        allTags.push(v.tags)    
    })
    
allTagsConcat = allTags[0].concat(allTags[1],allTags[2], allTags[3], allTags[4], allTags[5], allTags[6], allTags[7], allTags[8])

uniqueTags = _.unique(allTagsConcat)
    //console.log(uniqueTags.sort())
    //console.log(allTagsConcat)
    _.each(uniqueTags, function(v, i, a){
        _.each(allTagsConcat, function(e, ind, arr){
            if(v === e){
                numberedTags.push(v)
                numberedTags.sort()
            }
        })
    })
    
    /*STARTING LOOPING SESSION TO USE MY CUSTOM VERSION OF INDEX OF*/
    
    _.each(uniqueTags, function(uTag, i, a){
        TagCounter1.push(findTotal(numberedTags, uTag))    
    })
    
    //Organizes by lowest to highest count
    TagCounter1.sort()
    
    //find the highest count = HOW MANY TIMES DOES THIS TAG OCCUR IN ARRAY?
    var highestCount = TagCounter1[TagCounter1.length - 1][0]
    
    //using MAP to only give me highest
    
    var mapResults = _.map(TagCounter1, function(v, i, a){
            
        if(v[0] === highestCount){
            return v
        }
    });
    
    //map returns for EVERY ELEMENT so if the function return value for the run
    //of that function is UNDEFINED, UNDEFINED is returned
    var Top3 = mapResults.slice(mapResults.lastIndexOf(undefined) + 1)
    
    //SPLICE ARGS = arg0-where to start, arg1-how many to remove, arg2-what to add in
    /*TIPS: a. if the 2nd, remove argument is higher than the length of array,
                all elements after the start point but before the out of reach value
                will be removed and the splice effect will still take place*/
        /*  b. SPLICE changes the original array
            c. SLICE returns a new array with the original unchanged*/
    
    //Sort the list of tags occuring 3x THEN remove all except TOP 3
    //Lorem is one bc of the hexavalue
    Top3.sort()
    var Top3_NoCount = []
    _.each(Top3, function(v,i,a){
        Top3_NoCount.push(v.slice(2))
    })
    
    //REMOVE ALL EXCEPT TOP 3 - CONSOLE.LOG CONCATTED STATEMENT
    Top3_NoCount.splice(3, Top3.length)
    console.log
    
    //FUNCTION MADE TO RUN ON EACH UNIQUE TAG AGAINST FULL LIST OF TAGS
    //USED ON LINE 212
    function findTotal(array, value){
        var counter = 0
        var result
        _.each(array, function(e, i, a){
            if(e === value){
                result = ((counter += 1) + " " + e)
            }
        })
        return result
    } //ENDOF: findTotal
     return ("9. The Top 3 tags are: " + "1. " + Top3_NoCount[0] + 
                ", 2. " + Top3_NoCount[1]+ ", 3. " + Top3_NoCount[2])
} //ENDOF: ENTIRE-MAIN FUNCTION
console.log(top3Tags())


//----------------QUESTION # 10 - CREATE A SUMMARY OF GENDERS---------------------------
function CustomersByGender(){
var genderSummary = {};
    
    //CONFIRMING: the gender property exist
    //Only confirming for 1st object which can be FAULTY but works here
    //In the future, set a condition like this in a EACH LOOP not as the GATE KEEPER
    if(customers[0].gender){
    var allGenders = _.pluck(customers, "gender")
    } else {console.log("NO GENDER")}
    
    var onlyEachGender = _.unique(allGenders) 
    _.each(onlyEachGender, function(v, i, a){
        genderSummary[v] = findGenderTotal(allGenders, v) 
    })
    
    /////////////////////////////////////////////
        var maleReport
        var femaleReport
        var transgenderReport
    function findGenderTotal(array, value){
        //Designed as an outside function to run on each element
        //This way, I can run as many times on each element without a double each loop
        var counter = 0
        var result
        
        _.each(array, function(e, i, a){
            if(e === value){
                result = (counter += 1)
            }
        })
        
        //CREATE custom string for each gender
        if(value === "female"){femaleReport = value + ": " + result + ","}
        else if(value === "male"){maleReport = value + ": " + result + ","}
        else if(value === "transgender"){transgenderReport = value + ": " + result + " "}
        
        return result
    } //ENDOF: findTotal////////////////////////
    
    var finalReport = maleReport + " " + femaleReport + " " + transgenderReport + " "
    return finalReport            
}

console.log("10. The Customers by Gender Report: " + CustomersByGender())


