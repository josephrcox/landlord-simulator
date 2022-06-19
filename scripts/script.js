import { gameOver } from "./modal.js"
import { changeCash, changeRating } from "./modifiers.js"
import { newScenario } from "./scenario_generator.js"
import { syncTable, table_init } from "./table.js"
import { drawBuildings, residentLeave, buyNewBuilding, getRandomColor } from "./buildingManager.js"

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

const salary_RA = 7000
 
let renters = []

const defaultGameSchema = {
        "buildings":[
            {
                "rent":0,
                "residents":0,
                "color":getRandomColor()
            }
        ]
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
    if (localStorage.game == null || localStorage.month == null || isNaN(localStorage.month) || localStorage.residentLeaveLoss == null || localStorage.cash == null || localStorage.currentScenario == null || isNaN(localStorage.cash)) {
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
        localStorage.residentLeaveLoss = 0
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
    drawBuildings()
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
    let totalResidents = 0
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++) {
        totalAvailable += (40 - JSON.parse(localStorage.game).buildings[i].residents)
        totalResidents +=  JSON.parse(localStorage.game).buildings[i].residents
    }
    stats_available_value.innerText = totalAvailable
    stats_residents_value.innerTexFt = totalResidents
    stats_month_value.innerText = localStorage.month

    if (parseInt(localStorage.cash) >= 600000) {
        buyNewBuilding.style.backgroundColor = 'yellow'
    } else {
        buyNewBuilding.style.backgroundColor = 'gray'
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
    let rentProfit = 0
    let revenueRent = 0
    let totalResidents = 0 

    
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++){
        let b = JSON.parse(localStorage.game).buildings[i]
        rentProfit += b.residents * b.rent * percentOfRentAsProfit
        revenueRent += b.residents * b.rent
        totalResidents += b.residents
    }
    console.log(revenueRent, rentProfit)
    
    residentLeave()
    // extras
    let costOfExtras = 0
    if (amenities_pool == "true" || amenities_pool == true) {
        costOfExtras -= (2000) + (totalResidents * 10)
    }
    if (amenities_freeutilities == "true" || amenities_freeutilities == true) {
        let z = (Math.floor(Math.random() * 200) + 100) * totalResidents
        costOfExtras += (-1 * z)
    }
    



    let petrentprofit = (Math.floor(Math.random() * 40) + 20) * (totalResidents/8)
    costOfExtras += petrentprofit
    if (amenities_dogs == "true" || amenities_dogs == true) {
        let z = (JSON.parse(localStorage.game).buildings.length * 100)
        costOfExtras += (-1 * z)
    }
    if (amenities_cats == "true" || amenities_cats == true) {
        let z = (JSON.parse(localStorage.game).buildings.length * 50)
        costOfExtras += (-1 * z)
    }
    changeCash(costOfExtras)
    changeCash(rentProfit)

    let amenitiesProfit = costOfExtras
    let propertyTaxes = (Math.round((1200 * JSON.parse(localStorage.game).buildings.length * (JSON.parse(localStorage.game).buildings.length * 2.3) + 1))*-1)
    changeCash(propertyTaxes)
    let staffSalaries = (parseInt(localStorage.rentalAssistants) * (salary_RA + (totalResidents * 12)))
    syncTable(totalResidents, revenueRent, rentProfit, amenitiesProfit, propertyTaxes, parseInt(localStorage.residentLeaveLoss), staffSalaries)

    sync()
    localStorage.residentLeaveLoss = 0
    let z = Math.random() * 1000

    if (z > 995 && (JSON.parse(localStorage.game).buildings.length > 1)) {
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