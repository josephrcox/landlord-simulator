import { gameOver } from "./modal.js"
import { changeCash, changeRating } from "./modifiers.js"
import { newScenario } from "./scenario_generator.js"
import { syncTable, table_init } from "./table.js"
import { drawBuildings, residentLeave, buyNewBuilding, getRandomColor } from "./buildingManager.js"
import { showAmenities } from "./amenities.js"
import { amenities_list } from "./JSON_amenities.js"

const stats_cash_value = document.getElementById('stats-cash-value')
const stats_rating_value = document.getElementById('stats-rating-value')

let rating = 0

// const logs = document.getElementById('logs')

const startingCash = 100000
const residentsPerBuilding = 40
const percentOfRentAsProfit = 0.2

let gameSpeed = 5000
let normalGameSpeed = 5000
let fastGameSpeed = 1000
 
let renters = []

let scenarioFrequency = 900 // out of 1000, how many ticks will trigger a new scenario (when >1 buildings)

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

showAmenities()

// amenities
const togglePool = document.getElementById('toggle-pool')
const toggleFreeUtilities = document.getElementById('toggle-freeutilities')
const toggleDogs = document.getElementById('toggle-dogs')
const toggleCats = document.getElementById('toggle-cats')

window.onload = function() {
    table_init()
    // showAmenities()
    if (localStorage.game == null || localStorage.salaries == null || localStorage.thisMonthInvestmentTotal == null || localStorage.ownership == null || localStorage.month == null || isNaN(localStorage.month) || localStorage.residentLeaveLoss == null || localStorage.cash == null || localStorage.currentScenario == null || isNaN(localStorage.cash)) {
        localStorage.setItem('month', 1)
        localStorage.setItem('rent', 0)

        localStorage.setItem('game', JSON.stringify(defaultGameSchema))
        localStorage.setItem('cash', startingCash)
        localStorage.setItem('appts', 1)
        localStorage.setItem('gameover', false)
        localStorage.setItem('available', residentsPerBuilding)
        localStorage.setItem('residents', 0)
        localStorage.setItem('rating', 50)
        for (let i=0;i<amenities_list.length;i++) {
            localStorage.setItem('amenities_'+amenities_list[i].id, false)
        }
        localStorage.currentScenario = -1
        localStorage.rentalAssistants = 0
        localStorage.salaries = 0
        localStorage.residentLeaveLoss = 0
        localStorage.ownership = 1.0
        localStorage.thisMonthInvestmentTotal = "0"
        localStorage.history = ""
        localStorage.oneoffArray = ""
    } 
    stats_cash_value.innerText = "$"+parseInt(localStorage.cash).toLocaleString()

    if (localStorage.gameover == "true") {
        gameOver()
    }
    if (localStorage.currentScenario != null) {
        if (parseInt(localStorage.currentScenario) >= 0) {
            newScenario(parseInt(localStorage.currentScenario))
        }
    }
    if (localStorage.darkmode == null) {
        localStorage.darkmode == "false"
    }
    drawBuildings()
    sync()
}

let cripplingForCash = false
let cripplingFor = 0

export function sync() {
    if (!paused) {
        localStorage.rating = round(parseFloat(localStorage.rating), 3)
        if (parseFloat(localStorage.rating) >= 100) {
            stats_rating_value.innerHTML = '😍 ' + parseFloat(localStorage.rating)
            rating = 3
        } else if (parseFloat(localStorage.rating) >= 75) {
            stats_rating_value.innerHTML = '🙂 ' + parseFloat(localStorage.rating)
            rating = 2
        } else if (parseFloat(localStorage.rating) >= 25) {
            stats_rating_value.innerHTML = '😐 ' + parseFloat(localStorage.rating)
            rating = 1
        } else if (parseFloat(localStorage.rating) >= 0) {
            stats_rating_value.innerHTML = '☹️ ' + parseFloat(localStorage.rating)
            rating = 0
        }
    
        for (let i=0;i<amenities_list.length;i++) {
            document.getElementById('toggle-'+amenities_list[i].id).dataset.enabled = localStorage.getItem('amenities_'+amenities_list[i].id)
        }
        if (stats_cash_value.innerHTML.includes('<')) {
            console.log("includes")
            let newcashtext = "$"+parseInt(localStorage.cash).toLocaleString() + stats_cash_value.innerHTML.split('<')[1] 
            stats_cash_value.innerHTML = newcashtext
        } else {
            stats_cash_value.innerText = "$"+parseInt(localStorage.cash).toLocaleString()
        }
    
    
        let totalAvailable = 0
        let totalResidents = 0
        for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++) {
            totalAvailable += (40 - JSON.parse(localStorage.game).buildings[i].residents)
            totalResidents +=  JSON.parse(localStorage.game).buildings[i].residents
        }
    
        if (parseInt(localStorage.cash) >= 600000) {
            buyNewBuilding.style.backgroundColor = 'yellow'
        } else {
            buyNewBuilding.style.backgroundColor = 'gray'
        }
    }
    
}

////////////////////////////////
export let paused = false

let gameLoop = setInterval(function() {
    if (paused == false) {
        gameLoopAction()
    }

}, gameSpeed)

export function pause() {
    if (paused) {
        paused = false
        document.getElementById('pause').innerText = '⏸️'
        if (localStorage.darkmode == "true") {
            document.getElementById('toggle-pause').style.backgroundColor = 'black'
        } else {
            document.getElementById('toggle-pause').style.backgroundColor = 'white'
        }
        
    } else if (!paused) {
        paused = true
        document.getElementById('pause').innerText = '▶️'
        if (localStorage.darkmode == "true") {
            document.getElementById('toggle-pause').style.backgroundColor = 'white'
        } else {
            document.getElementById('toggle-pause').style.backgroundColor = 'black'
        }
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
        document.getElementById('speed').innerText = '🏃'
        document.getElementById('toggle-speed').style.fontWeight = '500'
    } else {
        gameSpeed = normalGameSpeed
        clearInterval(gameLoop)
        gameLoop = setInterval(function() {
            if (paused == false) {
                gameLoopAction()
            }
        }, gameSpeed)
        document.getElementById('speed').innerText = '🚶'
        document.getElementById('toggle-speed').style.fontWeight = '300'
    }
})



function gameLoopAction() {
    localStorage.month = parseInt(localStorage.month) + 1
    let totalMonthlyProfit = 0
    let rentProfit = 0
    let revenueRent = 0
    let totalResidents = 0 

    
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++){
        let b = JSON.parse(localStorage.game).buildings[i]
        rentProfit += b.residents * b.rent * percentOfRentAsProfit
        revenueRent += b.residents * b.rent

        totalResidents += b.residents
    }
    
    residentLeave()
    // extras
    let costOfExtras = 0

    for (let i=0;i<amenities_list.length;i++) {
        let a = amenities_list[i]
        if (localStorage.getItem('amenities_'+a.id) == "true") {
            costOfExtras += a.cost_monthly
            costOfExtras += a.cost_monthly_per_building * parseInt(JSON.parse(localStorage.game).buildings.length)
            if (a.cost_monthly_per_resident_random == true || a.cost_monthly_per_resident_random == "true") {
                costOfExtras += Math.floor(Math.random() * a.cost_monthly_per_resident) + a.cost_monthly_per_resident_min
            } else {
                costOfExtras += a.cost_monthly_per_resident * totalResidents
            }
            if (a.revenue_monthly_random == true || a.revenue_monthly_random == "true") {
                costOfExtras -= (Math.floor(Math.random() * a.revenue_monthly) + a.revenue_monthly_min) * totalResidents
            } else {
                costOfExtras -= a.revenue_monthly
            }
        }
    }

    let amenitiesProfit = -1 * costOfExtras
    let propertyTaxes = (Math.round((1200 * JSON.parse(localStorage.game).buildings.length * (JSON.parse(localStorage.game).buildings.length * 1.8) + 1))*-1)
    
    let staffSalaries = (parseInt(localStorage.rentalAssistants) * ((totalResidents * 12))) + parseInt(localStorage.salaries)
    localStorage.residentLeaveLoss = 0
    let z = Math.random() * 1000

    if (z > scenarioFrequency && (JSON.parse(localStorage.game).buildings.length > 1)) {
        newScenario()
    }

    totalMonthlyProfit += amenitiesProfit + rentProfit + propertyTaxes + staffSalaries
    console.log(totalMonthlyProfit)
    if (totalMonthlyProfit > 0) {
        changeCash(totalMonthlyProfit * parseFloat(localStorage.ownership))
    } else {
        changeCash(totalMonthlyProfit)
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

    if (parseFloat(localStorage.ownership) <= 0) {
        gameOver()
    }
    localStorage.thisMonthInvestmentTotal = "0"

    let randomRatingChange = ((Math.round(Math.random()) * 2 - 1) * Math.ceil(Math.random() * (0.5 * parseInt(JSON.parse(localStorage.game).buildings.length))))
    console.log(localStorage.rating, randomRatingChange)
    localStorage.rating = round(parseFloat(localStorage.rating) + randomRatingChange, 2)
    sync()
    syncTable(totalResidents, revenueRent, rentProfit, amenitiesProfit, propertyTaxes, parseInt(localStorage.residentLeaveLoss), staffSalaries)

}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}