import { sync } from "./script.js"
import { drawBuildings } from "./buildingManager.js"

export function changeCash(x) {
    localStorage.cash = parseInt(localStorage.cash) + x
    sync()
}
export function changeRating(x) {
    localStorage.rating = parseFloat(localStorage.rating) + x
    if (parseFloat(localStorage.rating) < 0) {
        localStorage.rating = 0
    }
    sync()
}

export function changeResidents(x) {
    localStorage.residents = parseInt(localStorage.residents) + x
    localStorage.available = parseInt(localStorage.available) + (-1 * x)
    sync()
}

export function changePool(x) {
    localStorage.amenities_pool = x
    sync()
}

export function hireRentalAssistant() {
    localStorage.rentalAssistants = parseInt(localStorage.rentalAssistants) + 1
    sync()
}

export function changeSalary(x) {
    localStorage.salaries = parseINt(localStorage.salaries) + x
}

export function changeBuildings(x) {
    let b = JSON.parse(localStorage.game)
    b.buildings.splice(-1)
    localStorage.game = JSON.stringify(b)
    drawBuildings()
    sync()
}

export function changeOwnership(x) {
    localStorage.ownership = (parseFloat(localStorage.ownership) + parseFloat(x)).toFixed(2);
    localStorage.thisMonthInvestmentTotal = x
    localStorage.currentScenarioVariable = "0"
    sync()
}