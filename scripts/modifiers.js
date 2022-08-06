import { sync } from "./script.js"
import { drawBuildings } from "./buildingManager.js"

export function changeCash(x) {
    localStorage.cash = parseInt(localStorage.cash) + x
    //console.log("cash was changed by "+x)
    sync()
}
export function changeRating(x) {
    localStorage.rating = parseFloat(localStorage.rating) + x
    if (parseFloat(localStorage.rating) < 0) {
        localStorage.rating = 0
    }
    //console.log("rating was changed by "+x)
    sync()
}

export function changeResidents(x) {
    localStorage.residents = parseInt(localStorage.residents) + x
    localStorage.available = parseInt(localStorage.available) + (-1 * x)
    //console.log("residents were changed by "+x)
    sync()
}

export function changePool(x) {
    localStorage.amenities_pool = x
    sync()
}

export function hireRentalAssistant() {
    localStorage.rentalAssistants = parseInt(localStorage.rentalAssistants) + 1
    //console.log(localStorage.rentalAssistants)
    sync()
}

export function changeSalary(x) {
    localStorage.salaries = parseINt(localStorage.salaries) + x
    //console.log(localStorage.salaries)
}

export function changeBuildings(x) {
    let b = JSON.parse(localStorage.game)
    b.buildings.splice(-1)
    localStorage.game = JSON.stringify(b)
    drawBuildings()
    sync()
}

export function changeOwnership(x) {
    //console.log("ownership change "+x)
    localStorage.ownership = (parseFloat(localStorage.ownership) + parseFloat(x)).toFixed(2);
    localStorage.thisMonthInvestmentTotal = x
    localStorage.currentScenarioVariable = "0"
    sync()
}