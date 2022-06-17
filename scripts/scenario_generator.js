import { scenarios_list } from "./scenarios.js";
import { pause } from "./script.js";
import { changeCash, changeRating, changeResidents, changePool, hireRentalAssistant } from "./modifiers.js";

const modal = document.getElementById('scenariomodal')
const overlay = document.getElementById('overlay')
const a = document.getElementById('a')
const b = document.getElementById('b')

export function newScenario(override) {
    let x = Math.floor(Math.random() * scenarios_list.length)
    if (override) {
        x = override;
    }
    localStorage.currentScenario = x
    if (scenarios_list[x].requiresPool == true && localStorage.amenities_pool == "false") {
        console.log("dont have pool")
        newScenario()
        return;
    }
    pause()
    overlay.style.display = 'block'
    modal.style.display = 'block'
    modal.children[0].innerHTML = "<br/><br/>"+scenarios_list[x].title
    modal.children[1].innerHTML = scenarios_list[x].a
    modal.children[2].innerHTML = scenarios_list[x].b

    let elem = document.querySelector('.history_table')
    let clone = elem.cloneNode(true)
    document.getElementById('scenario_history_table').innerHTML = ""
    document.getElementById('scenario_history_table').append(clone)
}

function optionChosen(choice) {
    let x = parseInt(localStorage.currentScenario)
    let chosen = null
    if (choice == "a") {
        chosen = scenarios_list[x].a_outcome.split('&')
    } else if (choice == "b") {
        chosen = scenarios_list[x].b_outcome.split('&')
    }

    console.log(chosen)
    for (let i=0;i<chosen.length;i++) {
        let y = chosen[i].split(',')
        switch(y[0]) {
            case "cash":
                changeCash(parseInt(y[1]))
                break;
            case "rating":
                changeRating(parseFloat(y[1]))
                break;
            case "alert":
                alert(scenarios_list[x].alertMSG)
                break;
            case "residents":
                changeResidents(parseInt(y[1]))
                break;
            case "cashPerResident":
                changeCash(parseInt(y[1]) * parseInt(localStorage.residents))
                break;
            case "amenities_pool":
                changePool(y[1])
                break;
            case "rentalAssistant":
                hireRentalAssistant()
                break;
        }
    }
    localStorage.currentScenario = -1
    overlay.style.display = 'none'
    modal.style.display = 'none'
    pause()
}

a.addEventListener('click', function() {
    optionChosen("a")
})
b.addEventListener('click', function() {
    optionChosen("b")
})