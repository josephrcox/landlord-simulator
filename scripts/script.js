import { table_init, syncTable } from "./table.js"
import { gameOver } from "./modal.js"
import { newScenario } from "./scenario_generator.js"
import { changeCash, changeRating } from "./modifiers.js"

const appt_buy = document.getElementById('appts-buy')
const appt_rent = document.getElementById('appts-rent')
const rent_inc = document.getElementById('rent-inc') 
const rent_dec = document.getElementById('rent-dec')

const stats_month_value = document.getElementById('stats-month-value')
const stats_cash_value = document.getElementById('stats-cash-value')
const stats_rent_value = document.getElementById('stats-rent-value')
const stats_appts_value = document.getElementById('stats-appts-value')
const stats_available_value = document.getElementById('stats-available-value')
const stats_residents_value = document.getElementById('stats-residents-value')
const stats_rating_value = document.getElementById('stats-rating-value')

const game_center = document.querySelector('.game-center')

let rating = 0

// const logs = document.getElementById('logs')

const startingCash = 100000
const apptCost = 600000
const residentsPerBuilding = 40
const percentOfRentAsProfit = 0.2

let gameSpeed = 5000
let normalGameSpeed = 5000
let fastGameSpeed = 1000

const amenities_pool_rating = 15
const amenities_freeutilities_rating = 20
const amenities_dogs_rating = 10
const amenities_cats_rating = 5
const resleave_rating = -0.1
const resjoin_rating = 0.1
const salary_RA = 7000

let residentLeaveLoss = 0
 
let renters = []

const defaultGameSchema = {
        "buildings":[
            {
                "rent":0,
                "residents":0
            }
        ]
}

// if (localStorage.history != undefined) {
//     logs.innerHTML = localStorage.history 
// }

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
        changeRating(-1 * amenities_pool_rating)
    } else {
        if (parseInt(localStorage.cash) >= 50000) {
            togglePool.dataset.enabled = 'true'
            localStorage.setItem('amenities_pool', true) 
            amenities_pool = true
            changeCash(-50000)
            changeRating(amenities_pool_rating)
        }

    }
})
toggleFreeUtilities.addEventListener('click', function() {
    if (toggleFreeUtilities.dataset.enabled == "true") {
        toggleFreeUtilities.dataset.enabled = 'false'
        localStorage.setItem('amenities_freeutilities', false) 
        amenities_freeutilities = false
        changeRating(-1 * amenities_freeutilities_rating)
    } else {
        toggleFreeUtilities.dataset.enabled = 'true'
        localStorage.setItem('amenities_freeutilities', true) 
        amenities_freeutilities = true
        changeRating(amenities_freeutilities_rating)
    }
})
toggleDogs.addEventListener('click', function() {
    if (toggleDogs.dataset.enabled == "true") {
        toggleDogs.dataset.enabled = 'false'
        localStorage.setItem('amenities_dogs', false) 
        amenities_dogs = false
        changeRating(-1 * amenities_dogs_rating)
    } else {
        toggleDogs.dataset.enabled = 'true'
        localStorage.setItem('amenities_dogs', true) 
        amenities_dogs = true
        changeRating(amenities_dogs_rating)
    }
})
toggleCats.addEventListener('click', function() {
    if (toggleCats.dataset.enabled == "true") {
        toggleCats.dataset.enabled = 'false'
        localStorage.setItem('amenities_cats', false) 
        amenities_cats = false
        changeRating(-1 * amenities_cats_rating)
    } else {
        toggleCats.dataset.enabled = 'true'
        localStorage.setItem('amenities_cats', true) 
        amenities_cats = true
        changeRating(amenities_cats_rating)
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

    btn.onpointerdown = function() {
        repeat();
    }

    btn.onpointerup = function () {
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        clearTimeout(t);
    }
    btn.onpointerleave = function () {
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        clearTimeout(t);
    }
};
// holdDownAction(appt_buy, newAppt, 50, 500);
// holdDownAction(appt_rent, rentOut, 50, 0);
// holdDownAction(rent_inc, incRent, 50, 1);
// holdDownAction(rent_dec, decRent, 50, 1);

////////////////////////////////
window.onload = function() {
    table_init()
    if (localStorage.month == null || isNaN(localStorage.month) || localStorage.cash == null || localStorage.currentScenario == null || isNaN(localStorage.cash)) {
        localStorage.setItem('month', 1)
        localStorage.setItem('rent', 0)

        localStorage.setItem('game', JSON.stringify(defaultGameSchema))
        localStorage.setItem('cash', startingCash)
        localStorage.setItem('appts', 1)
        localStorage.setItem('gameover', false)
        localStorage.setItem('available', residentsPerBuilding)
        localStorage.setItem('residents', 0)
        localStorage.setItem('rating', 50)
        localStorage.setItem('amenities_pool', false) 
        localStorage.setItem('amenities_freeutilities', false) 
        localStorage.setItem('amenities_dogs', false) 
        localStorage.setItem('amenities_cats', false) 
        localStorage.currentScenario = -1
        localStorage.rentalAssistants = 0
    } 
    stats_month_value.innerText = localStorage.getItem('day')
    stats_rent_value.innerText = "$"+parseInt(localStorage.rent).toLocaleString()
    stats_cash_value.innerText = "$"+parseInt(localStorage.cash).toLocaleString()
    stats_appts_value.innerText = localStorage.getItem('appts')
    stats_available_value.innerText = localStorage.getItem('available')
    stats_residents_value.innerText = localStorage.getItem('residents')

    if (localStorage.gameover == "true") {
        gameOver()
    }
    if (localStorage.currentScenario != null) {
        if (parseInt(localStorage.currentScenario) >= 0) {
            newScenario(parseInt(localStorage.currentScenario))
        }
    }

    sync()
}

let cripplingForCash = false
let cripplingFor = 0

export function sync() {
    localStorage.rating = round(parseFloat(localStorage.rating), 3)
    if (parseFloat(localStorage.rating) >= 100) {
        stats_rating_value.innerHTML = '😍 <span style="font-size:10px">'+parseFloat(localStorage.rating)+'</span>'
        rating = 3
    } else if (parseFloat(localStorage.rating) >= 75) {
        stats_rating_value.innerHTML = '🙂 <span style="font-size:10px">'+parseFloat(localStorage.rating)+'</span>'
        rating = 2
    } else if (parseFloat(localStorage.rating) >= 25) {
        stats_rating_value.innerHTML = '😐 <span style="font-size:10px">'+parseFloat(localStorage.rating)+'</span>'
        rating = 1
    } else if (parseFloat(localStorage.rating) >= 0) {
        stats_rating_value.innerHTML = '☹️ <span style="font-size:10px">'+parseFloat(localStorage.rating)+'</span>'
        rating = 0
    }
    togglePool.dataset.enabled = localStorage.amenities_pool
    toggleFreeUtilities.dataset.enabled = localStorage.amenities_freeutilities
    toggleDogs.dataset.enabled = localStorage.amenities_dogs
    toggleCats.dataset.enabled = localStorage.amenities_cats

    stats_cash_value.innerText = "$"+parseInt(localStorage.cash).toLocaleString()
    stats_appts_value.innerText = JSON.parse(localStorage.game).buildings.length
    stats_rent_value.innerText = "$"+parseInt(localStorage.rent).toLocaleString()
    let totalAvailable = 0
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++) {
        totalAvailable += (40 - JSON.parse(localStorage.game).buildings[i].residents)
    }
    stats_available_value.innerText = totalAvailable
    stats_residents_value.innerText = localStorage.residents
    stats_month_value.innerText = localStorage.month

    game_center.innerHTML = ""
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length + 1;i++) {
        if (i < JSON.parse(localStorage.game).buildings.length) {
            const a = document.createElement('div')
            a.classList.add('building')
            a.dataset.index = i
        
            if (JSON.parse(localStorage.game).buildings[i].residents < 40) {
                const head = document.createElement('div')
                head.classList.add('building_head')
                const rent = document.createElement('button')
                rent.classList.add('button')
                rent.innerHTML = "Rent out"

                rent.onclick = function() {
                    console.log(rent)
                    rentOut(a.dataset.index)
                }
                rent.classList.add('building_rentout')
                
                head.append(rent)
                a.append(head)
            }

        
            const bottom = document.createElement('div')
            bottom.classList.add('building_bottom')
            const dec = document.createElement('button')
            dec.classList.add('button')
            dec.innerHTML = "-"
            bottom.append(dec)
            const rentSpan = document.createElement('span')
            rentSpan.innerHTML = "$"+JSON.parse(localStorage.game).buildings[i].rent.toLocaleString()
            rentSpan.classList.add('building_rent')
            bottom.append(rentSpan)
            const inc = document.createElement('button')
            inc.classList.add('button')
            inc.innerHTML = "+"
            inc.onclick = function() {
                incRent(a.dataset.index)
            }
            bottom.append(inc)
            a.append(bottom)
        
            game_center.append(a)
        } else {
            const a = document.createElement('div')
            a.classList.add('building')
            a.style.filter = 'grayscale()'
        
            const head = document.createElement('div')
            head.classList.add('building_head')
            const buy = document.createElement('button')
            buy.classList.add('button')
            buy.innerHTML = "Buy new building"
            buy.onclick = function() {
                newAppt()
            }
            buy.style.fontSize = ""
            buy.style.marginBottom = "5px"
            const subtitle = document.createElement('div')
            subtitle.innerHTML = "$600,000"
            head.append(buy, subtitle)
            a.append(head)
        
            game_center.append(a)
        }
    }
}

function newAppt() {
    if (parseInt(localStorage.cash) >= apptCost) {
        localStorage.cash = parseInt(localStorage.cash) - apptCost 
        let b = JSON.parse(localStorage.game)
        b.buildings.push({
            "rent":0,
            "residents":0,
            "available":40
        })
        localStorage.game = JSON.stringify(b)
        sync()
    }
   
}

function incRent(building) {

    let b = JSON.parse(localStorage.game)
    b.buildings[building].rent += 40
    localStorage.game = JSON.stringify(b)

    if (Math.random() >= 0.8) {
        residentLeave()
    }
    changeRating(-1)
    sync()
}

function decRent() {
    localStorage.rent = parseInt(localStorage.rent) - 40
    changeRating(1)
    sync()
}

function rentOut(building) {
    console.log(building)
    if (parseInt(localStorage.cash) >= JSON.parse(localStorage.game).buildings[building].rent) {
        console.log(JSON.parse(localStorage.game).buildings[building].residents)
        if (JSON.parse(localStorage.game).buildings[building].residents < 40) {
            let x = (Math.floor(Math.random() * (100 + (parseInt(localStorage.rent)/5))))
            let chance = x <= parseFloat(localStorage.rating)
            if (chance) {
                changeCash((parseInt(localStorage.rent) / 20) * -1)
                let b = JSON.parse(localStorage.game)
                b.buildings[building].residents = b.buildings[building].residents + 1
                localStorage.game = JSON.stringify(b)
                renters.push(parseInt(localStorage.rent))
                changeRating(0.1)
            } else {
                changeCash((parseInt(localStorage.rent) / 80) * -1)
            }
    
        }
    }
    sync()

}

function residentLeave(override) {
    let x
    if (override) {
        x = (Math.floor(Math.random() * (override)))
    } else {
        x = (Math.floor(Math.random() * (2)))
    }

    let chance = (x == 0)

    if (chance) {
        let leaving = Math.floor(Math.random() * parseInt(localStorage.residents)/5)
        if (parseInt(localStorage.residents) <= 5) {
            leaving = parseInt(localStorage.residents)
        }

        if (rating === 3) {
            leaving = 0
        } else if (rating === 0) {
            if ((leaving * 3) <= parseInt(localStorage.residents)) {
                leaving = leaving * 3
            }
        }
        if (leaving > 0){
            for (let i=0;i<leaving;i++) {
                changeRating(-0.1)
            }

        }

        localStorage.residents = parseInt(localStorage.residents) - leaving
        localStorage.available = parseInt(localStorage.available) + leaving
        let costForLeaving = (leaving * (parseInt(localStorage.rent) * 2))
        if (leaving > 0) {
            changeCash(costForLeaving * -1)
            residentLeaveLoss -= costForLeaving
        }
    }
    
}

////////////////////////////////
let paused = false

let gameLoop = setInterval(function() {
    if (paused == false) {
        gameLoopAction()
    }

}, gameSpeed)

export function pause() {
    if (paused) {
        paused = false
        document.getElementById('pause').innerText = '⏸️'
        document.getElementById('toggle-pause').style.backgroundColor = 'white'
    } else if (!paused) {
        paused = true
        document.getElementById('pause').innerText = '▶️'
        document.getElementById('toggle-pause').style.backgroundColor = 'black'
    }
}

document.getElementById('toggle-pause').addEventListener('click', pause)

document.getElementById('toggle-speed').addEventListener('click', function() {
    if (gameSpeed == normalGameSpeed) {
        gameSpeed = fastGameSpeed
        clearInterval(gameLoop)
        gameLoop = setInterval(function() {
            if (paused == false) {
                gameLoopAction()
            }
        }, gameSpeed)
        document.getElementById('speed').innerText = 'Fast speed'
        document.getElementById('toggle-speed').style.backgroundColor = 'darkred'
        document.getElementById('toggle-speed').style.fontWeight = '500'
    } else {
        gameSpeed = normalGameSpeed
        clearInterval(gameLoop)
        gameLoop = setInterval(function() {
            if (paused == false) {
                gameLoopAction()
            }
        }, gameSpeed)
        document.getElementById('speed').innerText = 'Normal speed'
        document.getElementById('toggle-speed').style.backgroundColor = '#646161'
        document.getElementById('toggle-speed').style.fontWeight = '300'
    }
})

function gameLoopAction() {
    localStorage.month = parseInt(localStorage.month) + 1
    let rentProfit = parseInt(localStorage.residents) * (parseInt(localStorage.rent)*percentOfRentAsProfit)
    let availLoss = 0
    if (parseInt(localStorage.available) > 0) {
        availLoss = (((parseInt(localStorage.available) * 150))+(parseInt(localStorage.rent)/5)) * -1
        if (availLoss == -0) {
            availLoss = 0
        }
    }

    let residentleavechancebasedonrating = Math.floor(parseFloat(localStorage.rating)/12)
    residentLeave(residentleavechancebasedonrating)
    // extras
    let costOfExtras = 0
    if (amenities_pool == "true" || amenities_pool == true) {
        costOfExtras -= (2000) + (parseInt(localStorage.residents) * 10)
    }
    if (amenities_freeutilities == "true" || amenities_freeutilities == true) {
        let z = (Math.floor(Math.random() * 200) + 100) * parseInt(localStorage.residents)
        costOfExtras += (-1 * z)
    }
    let petrentprofit = (Math.floor(Math.random() * 40) + 20) * (parseInt(localStorage.residents)/8)
    costOfExtras += petrentprofit
    if (amenities_dogs == "true" || amenities_dogs == true) {
        let z = (parseInt(localStorage.appts) * 100)
        costOfExtras += (-1 * z)
    }
    if (amenities_cats == "true" || amenities_cats == true) {
        let z = (parseInt(localStorage.appts) * 50)
        costOfExtras += (-1 * z)
    }
    changeCash(costOfExtras)
    changeCash(rentProfit)
    changeCash(availLoss)

    let amenitiesProfit = costOfExtras
    let propertyTaxes = (Math.round((600 * parseInt(localStorage.appts)) * ((parseFloat(localStorage.appts) * 1.3) + 1))*-1)
    changeCash(propertyTaxes)
    let revenueRent = parseInt(localStorage.residents) * (parseInt(localStorage.rent))
    let staffSalaries = (parseInt(localStorage.rentalAssistants) * (salary_RA + (parseInt(localStorage.residents) * 12)))
    syncTable(revenueRent, rentProfit, availLoss, amenitiesProfit, propertyTaxes, residentLeaveLoss, staffSalaries)

    sync()
    residentLeaveLoss = 0
    let z = Math.random() * 1000

    if (z > 995 && (parseInt(localStorage.appts) > 1)) {
        newScenario()
    }

    if (parseInt(localStorage.cash) < 1) {
        cripplingForCash = true
        cripplingFor += 1
        if (cripplingFor >= 6) {
            gameOver()
        } else {
        }
    }
    if (parseInt(localStorage.cash) >= 1 && cripplingFor > 0) {
        cripplingForCash = false
        cripplingFor = 0
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}