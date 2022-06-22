import { sync } from "./script.js"

export function changeCash(x) {
    localStorage.cash = parseInt(localStorage.cash) + x
    console.log("cash was changed by "+x)
    sync()
}
export function changeRating(x) {
    localStorage.rating = parseFloat(localStorage.rating) + x
    if (parseFloat(localStorage.rating) < 0) {
        localStorage.rating = 0
    }
    console.log("rating was changed by "+x)
    sync()
}

export function changeResidents(x) {
    localStorage.residents = parseInt(localStorage.residents) + x
    localStorage.available = parseInt(localStorage.available) + (-1 * x)
    console.log("residents were changed by "+x)
    sync()
}

export function changePool(x) {
    localStorage.amenities_pool = x
    sync()
}

export function hireRentalAssistant() {
    localStorage.rentalAssistants = parseInt(localStorage.rentalAssistants) + 1
    console.log(localStorage.rentalAssistants)
    sync()
}

export function changeBuildings(x) {
    let b = JSON.parse(localStorage.game).buildings
    b.splice(b.length-1,1)
    sync()
}

export function changeOwnership(x) {
    console.log("ownership change "+x)
    localStorage.ownership = parseFloat(localStorage.ownership) + parseFloat(x)
    localStorage.thisMonthInvestmentTotal = x
    localStorage.currentScenarioVariable = "0"
    sync()
}