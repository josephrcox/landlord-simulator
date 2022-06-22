import { amenities_list } from "./JSON_amenities.js"
import { changeCash, changeRating } from "./modifiers.js"
import { sync } from "./script.js"


export function showAmenities() {
    let a = amenities_list
    for (let i=0;i<a.length;i++) {
        const button = document.createElement('button')
        button.classList.add('button')
        button.id = "toggle-"+a[i].id
        button.innerHTML = a[i].title
        button.dataset.enabled = localStorage.getItem('amenities_'+a[i].id)

        button.onclick = function() {
            if (button.dataset.enabled == "true") {
                button.dataset.enabled = 'false'
                changeRating(-1 * a[i].happiness )
                localStorage.setItem('amenities_'+a[i].id, false) 

            } else {
                if (a[i].cost_upfront > 0) {
                    if (parseInt(localStorage.cash) >= a[i].cost_upfront) {
                        changeCash(-1 * a[i].cost_upfront)
                    } else {
                        console.error("Not enough cash")
                        return;
                    }
                } 
                if (a[i].cost_upfront_per_building > 0) {
                    if (parseInt(localStorage.cash) >= (a[i].cost_upfront_per_building * JSON.parse(localStorage.game).buildings.length)) {
                        changeCash(-1 * (a[i].cost_upfront_per_building * JSON.parse(localStorage.game).buildings.length))
                    } else {
                        console.error("Not enough cash")
                        return;
                    }
                }
                button.dataset.enabled = 'true'
                localStorage.setItem('amenities_'+a[i].id, true) 
                changeRating(a[i].happiness )
            }
            sync()
        }

        const div = document.createElement('div')
        div.innerHTML = a[i].notes


        button.append(div)

        document.getElementById('amenities_container').append(button)
    }
}