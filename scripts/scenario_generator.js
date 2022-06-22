import { scenarios_list } from "./JSON_scenarios.js";
import { pause } from "./script.js";
import { changeCash, changeRating, changeResidents, changePool, hireRentalAssistant, changeBuildings, changeOwnership } from "./modifiers.js";

const modal = document.getElementById('scenariomodal')
const overlay = document.getElementById('overlay')
const a = document.getElementById('a')
const b = document.getElementById('b')

let Z 

export function newScenario(override) {
    let totalResidents = 0
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length;i++) {
        totalResidents +=  JSON.parse(localStorage.game).buildings[i].residents
    }

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
    let elem = document.querySelector('.history_table')
    let clone = elem.cloneNode(true)
    document.getElementById('scenario_history_table').innerHTML = ""
    document.getElementById('scenario_history_table').append(clone)

    if (scenarios_list[x].skipWithSecurity == true && localStorage.amenities_security == "true") {
        modal.children[0].innerHTML = scenarios_list[x].securityAlert
        modal.children[1].innerHTML = "Hooray!"
        modal.children[2].style.display = 'none'
        return
    }

    if (scenarios_list[x].title.includes("~~")) {
        if (localStorage.currentScenarioVariable == "null" || localStorage.currentScenarioVariable == null || localStorage.currentScenarioVariable == "0") {
            let titleSplit = scenarios_list[x].title.split("~~")
            if (localStorage.profiting == "true") {
                Z = Math.floor(Math.random() * (parseInt(localStorage.cash) * 3))
            } else {
                Z = Math.floor(Math.random() * (parseInt(localStorage.cash) / 3))
            }
            
            console.log("random number is "+Z)
            modal.children[0].innerHTML = "<br/><br/>"+titleSplit[0]+"$"+Z
            localStorage.setItem('currentScenarioVariable', Z)
        } else {
            let titleSplit = scenarios_list[x].title.split("~~")
            modal.children[0].innerHTML = "<br/><br/>"+titleSplit[0]+"$"+localStorage.currentScenarioVariable
        }

    } else {
        modal.children[0].innerHTML = "<br/><br/>"+scenarios_list[x].title
        localStorage.setItem('currentScenarioVariable', null)
    }

    
    modal.children[1].innerHTML = scenarios_list[x].a
    if (scenarios_list[x].b.length >= 1) {
        modal.children[2].innerHTML = scenarios_list[x].b
    } else {
        modal.children[2].style.display = 'none'
    }



}

function optionChosen(choice) {
    let x = parseInt(localStorage.currentScenario)

    if (scenarios_list[x].skipWithSecurity != true) {
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
                    if (y[1] == "VAR") {
                        changeCash(parseInt(localStorage.currentScenarioVariable))
                    } else {
                        changeCash(parseInt(y[1]))
                    }
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
                    changeCash(parseInt(y[1]) * totalResidents)
                    break;
                case "amenities_pool":
                    changePool(y[1])
                    break;
                case "rentalAssistant":
                    hireRentalAssistant()
                    break;
                case "building":
                    changeBuildings(y[1])
                    break;
                case "sell":
                    changeOwnership(y[1])
                    break;
            }
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