const appt_buy = document.getElementById('appts-buy')
const appt_rent = document.getElementById('appts-rent')
const rent_inc = document.getElementById('rent-inc')
const rent_dec = document.getElementById('rent-dec')

const stats_day_value = document.getElementById('stats-day-value')
const stats_cash_value = document.getElementById('stats-cash-value')
const stats_rent_value = document.getElementById('stats-rent-value')
const stats_appts_value = document.getElementById('stats-appts-value')
const stats_available_value = document.getElementById('stats-available-value')
const stats_residents_value = document.getElementById('stats-residents-value')
const stats_rating_value = document.getElementById('stats-rating-value')
let rating = 0

const logs = document.getElementById('logs')

const startingCash = 100000
const apptCost = 600000
const residentsPerBuilding = 40
const percentOfRentAsProfit = 0.2

let renters = []

if (localStorage.history != undefined) {
    logs.innerHTML = localStorage.history 
}

if (localStorage.companyname != null) {
    document.getElementById('name').value = localStorage.companyname
}

document.getElementById('name').addEventListener('change', function() {
    localStorage.companyname = document.getElementById('name').value
})

// amenities
const togglePool = document.getElementById('toggle-pool')
let amenities_pool = localStorage.amenities_pool

const toggleFreeUtilities = document.getElementById('toggle-freeutilities')
let amenities_freeutilities = localStorage.amenities_freeutilities

const toggleDogs = document.getElementById('toggle-dogs')
let amenities_dogs = localStorage.amenities_dogs

const toggleCats = document.getElementById('toggle-cats')
let amenities_cats = localStorage.amenities_cats

togglePool.addEventListener('click', function() {
    if (togglePool.dataset.enabled == "true") {
        togglePool.dataset.enabled = 'false'
        localStorage.setItem('amenities_pool', false) 
        amenities_pool = false
        changeRating(-25)
    } else {
        if (parseInt(localStorage.cash) >= 50000) {
            togglePool.dataset.enabled = 'true'
            localStorage.setItem('amenities_pool', true) 
            amenities_pool = true
            changeCash(-50000)
            changeRating(25)
            log("You bought a pool. Your residents will love this!")
        }

    }
})
toggleFreeUtilities.addEventListener('click', function() {
    if (toggleFreeUtilities.dataset.enabled == "true") {
        toggleFreeUtilities.dataset.enabled = 'false'
        localStorage.setItem('amenities_freeutilities', false) 
        amenities_freeutilities = false
        changeRating(-35)
    } else {
        toggleFreeUtilities.dataset.enabled = 'true'
        localStorage.setItem('amenities_freeutilities', true) 
        amenities_freeutilities = true
        changeRating(35)
        log("Your residents no longer pay for utilities, imagine the savings! (for them)")

    }
})
toggleDogs.addEventListener('click', function() {
    if (toggleDogs.dataset.enabled == "true") {
        toggleDogs.dataset.enabled = 'false'
        localStorage.setItem('amenities_dogs', false) 
        amenities_dogs = false
        changeRating(-25)
    } else {
        toggleDogs.dataset.enabled = 'true'
        localStorage.setItem('amenities_dogs', true) 
        amenities_dogs = true
        changeRating(25)
        log("Woof woof")

    }
})
toggleCats.addEventListener('click', function() {
    if (toggleCats.dataset.enabled == "true") {
        toggleCats.dataset.enabled = 'false'
        localStorage.setItem('amenities_cats', false) 
        amenities_cats = false
        changeRating(-15)
    } else {
        toggleCats.dataset.enabled = 'true'
        localStorage.setItem('amenities_cats', true) 
        amenities_cats = true
        changeRating(15)
        log("Meow meow")

    }
})

///////////////////////////////

function holdDownAction(btn, action, start, speedup) {
    var t;

    var repeat = function () {
        btn.style.backgroundColor = 'blue'
        btn.style.color = 'white'
        action();
        t = setTimeout(repeat, start);
        start = start / speedup;

    }

    btn.onmousedown = function() {
        repeat();
    }

    btn.onmouseup = function () {
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        clearTimeout(t);
    }
    btn.onmouseleave = function () {
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        clearTimeout(t);
    }
};
holdDownAction(appt_buy, newAppt, 50, 500);
holdDownAction(appt_rent, rentOut, 50, 0);
holdDownAction(rent_inc, incRent, 50, 1);
holdDownAction(rent_dec, decRent, 50, 1);

////////////////////////////////
window.onload = function() {
    if (localStorage.day == null || isNaN(localStorage.day) ) {
        localStorage.setItem('day', 1)
    } 
    stats_day_value.innerText = localStorage.getItem('day')
    if (localStorage.rent == null) {
        localStorage.setItem('rent', 0)
    } 
    stats_rent_value.innerText = localStorage.getItem('rent')
    if (localStorage.cash == null) {
        localStorage.setItem('cash', startingCash)
    } 
    stats_cash_value.innerText = localStorage.getItem('cash')
    if (localStorage.appts == null) {
        localStorage.setItem('appts', 1)
    } 
    stats_appts_value.innerText = localStorage.getItem('appts')
    if (localStorage.available == null) {
        localStorage.setItem('available', residentsPerBuilding)
    } 
    stats_available_value.innerText = localStorage.getItem('available')
    if (localStorage.residents == null) {
        localStorage.setItem('residents', 0)
    } 
    stats_residents_value.innerText = localStorage.getItem('residents')

    if (localStorage.rating == null) {
        localStorage.setItem('rating', 50)
    } 
    if (localStorage.amenities_pool == null) {
        localStorage.setItem('amenities_pool', false) 
    }
    if (localStorage.amenities_freeutilities == null) {
        localStorage.setItem('amenities_freeutilities', false) 
    }
    if (localStorage.amenities_dogs == null) {
        localStorage.setItem('amenities_dogs', false) 
    }
    if (localStorage.amenities_cats == null) {
        localStorage.setItem('amenities_cats', false) 
    }

}

function sync() {
    stats_cash_value.innerText = localStorage.cash
    stats_appts_value.innerText = localStorage.appts
    stats_rent_value.innerText = localStorage.rent
    stats_available_value.innerText = localStorage.available
    stats_residents_value.innerText = localStorage.residents
    stats_day_value.innerText = localStorage.day
    if (parseInt(localStorage.rating) >= 100) {
        stats_rating_value.innerHTML = '😍 <span style="font-size:10px">'+parseInt(localStorage.rating)+'</span>'
        rating = 3
    } else if (parseInt(localStorage.rating) >= 75) {
        stats_rating_value.innerHTML = '🙂 <span style="font-size:10px">'+parseInt(localStorage.rating)+'</span>'
        rating = 2
    } else if (parseInt(localStorage.rating) >= 25) {
        stats_rating_value.innerHTML = '😐 <span style="font-size:10px">'+parseInt(localStorage.rating)+'</span>'
        rating = 1
    } else if (parseInt(localStorage.rating) >= 0) {
        stats_rating_value.innerHTML = '☹️ <span style="font-size:10px">'+parseInt(localStorage.rating)+'</span>'
        rating = 0
    }
    togglePool.dataset.enabled = localStorage.amenities_pool
    toggleFreeUtilities.dataset.enabled = localStorage.amenities_freeutilities
    toggleDogs.dataset.enabled = localStorage.amenities_dogs
    toggleCats.dataset.enabled = localStorage.amenities_cats
}

function newAppt() {
    if (parseInt(localStorage.cash) >= apptCost) {
        localStorage.cash = parseInt(localStorage.cash) - apptCost 
        localStorage.appts = parseInt(localStorage.appts) + 1
        localStorage.available = parseInt(localStorage.available) + residentsPerBuilding
        sync()
    }
   
}

function incRent() {
    localStorage.rent = parseInt(localStorage.rent) + 40
    if (Math.random() >= 0.8) {
        residentLeave()
    }
    changeRating(-1)
    log("Rent was increased to "+localStorage.rent)
    sync()
}

function decRent() {
    localStorage.rent = parseInt(localStorage.rent) - 40
    log("Rent was decreased to "+localStorage.rent)
    changeRating(1)
    sync()
}

function rentOut() {
    if (parseInt(localStorage.available) > 0) {
        let x = (Math.floor(Math.random() * (100 + (parseInt(localStorage.rent)/5))))
        console.log(x)
        let chance = x <= parseInt(localStorage.rating)
        if (chance) {
            changeCash((parseInt(localStorage.rent) / 20) * -1)
            log("Unit was rented out. Total costs to rent out were $"+(parseInt(localStorage.rent) / 20))
            localStorage.residents = parseInt(localStorage.residents) + 1
            localStorage.available = parseInt(localStorage.available) - 1
            renters.push(parseInt(localStorage.rent))
        } else {
            log("Couldn't find a good candidate, spent $"+(parseInt(localStorage.rent) / 80))
            changeCash((parseInt(localStorage.rent) / 80) * -1)
        }

    }
    

}

function residentLeave(override) {
    let x
    if (override) {
        x = (Math.floor(Math.random() * (override)))
    } else {
        x = (Math.floor(Math.random() * (2)))
    }

    let chance = (x == 0)
    console.log(x, chance)
    console.log("rating: "+rating)

    if (chance) {
        let leaving = Math.floor(Math.random() * parseInt(localStorage.residents)/5)
        if (rating === 3) {
            leaving = 0
        } else if (rating === 0) {
            if ((leaving * 3) <= parseInt(localStorage.residents)) {
                leaving = leaving * 3
            }
        }
        localStorage.residents = parseInt(localStorage.residents) - leaving
        localStorage.available = parseInt(localStorage.available) + leaving
        let costForLeaving = (leaving * (parseInt(localStorage.rent) * 2))
        if (leaving > 0) {
            log(leaving + " residents left, costing you $"+costForLeaving)
            changeCash(costForLeaving * -1)
    
        }
    }
    
}

function changeCash(x) {
    localStorage.cash = parseInt(localStorage.cash) + x
}
function changeRating(x) {
    localStorage.rating = parseInt(localStorage.rating) + x
    if (parseInt(localStorage.rating) > 100) {
        localStorage.rating = 100
    } else if (parseInt(localStorage.rating) < 0) {
        localStorage.rating = 0
    }
}

////////////////////////////////
let gameLoop = setInterval(function() {
    localStorage.day = parseInt(localStorage.day) + 1
    if (parseInt(localStorage.day) % 30 === 0) {
        let rentProfit = parseInt(localStorage.residents) * (parseInt(localStorage.rent)*percentOfRentAsProfit)
        let availLoss = (parseInt(localStorage.available) * parseInt(localStorage.rent) / 5) * -1
        if (availLoss == -0) {
            availLoss = 0
        }
        changeCash(rentProfit)
        changeCash(availLoss)
        let residentleavechancebasedonrating = (parseInt(localStorage.rating)/12)
        residentLeave(residentleavechancebasedonrating)
        // extras
        let costOfExtras = 0
        console.log(amenities_pool, amenities_freeutilities)
        if (amenities_pool == "true") {
            changeCash((-2000) - (parseInt(localStorage.residents) * 10))
            costOfExtras += (2000) + (parseInt(localStorage.residents) * 10)
        }
        if (amenities_freeutilities == "true") {
            let z = (Math.floor(Math.random() * 200) + 100) * parseInt(localStorage.residents)
            changeCash(-1 * z)
            costOfExtras += z
        }
        if (amenities_dogs == "true") {
            let z = parseInt(localStorage.appts) * 100
            changeCash(-1 * z)
            costOfExtras += z
        }
        if (amenities_cats == "true") {
            let z = parseInt(localStorage.appts) * 50
            changeCash(-1 * z)
            costOfExtras += z
        }

        log("🎉Rent collection! You made $"+rentProfit+" in rent, and lost $"+(availLoss*-1)+" due to your available units. Other expenses and amenities costed you $"+costOfExtras+". Profit of $"+(rentProfit-(availLoss*-1)-costOfExtras))

    }

    sync()
}, 300)

function log(str) {
    let x = logs.innerHTML
    logs.innerHTML = str + "<br/>" + x
    localStorage.history = logs.innerHTML
}



////////////////////////////////

// function testLoop(x) {
//     for (let i=0;i<x;i++) {
//         console.log(Math.floor(Math.random() * parseInt(localStorage.rent)/10) + 1)
//     }
    
// }