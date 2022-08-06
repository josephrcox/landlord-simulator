import { changeCash, changeRating } from "./modifiers.js"
import { sync, paused, residentsPerBuilding } from "./script.js"
const game_center = document.querySelector('.game-center')
export const resleave_rating = -0.2
const resjoin_rating = 0.2
export let buyNewBuilding

export let AllBuildings = []

export const bldg = {
    rent:0,
    residents:0, 
    index:-1,

    display() {
        const a = document.createElement('div')
        a.classList.add('building')
        a.dataset.index = this.index
        if (this.color.length > 1) {
            a.style.backgroundImage = 'url(./buildings/'+this.color+'.svg)'
        } else {
            a.style.backgroundImage = 'url(./buildings/gray.svg)'
        }
    
        const head = document.createElement('div')
        head.classList.add('building_head')
        head.id = 'buildingHead_'+this.index
        const rent = document.createElement('button')
        rent.classList.add('button')
        rent.innerHTML = "Rent out"
        rent.dataset.index = this.index
        
        rent.classList.add('building_rentout')
        rent.id = "buildingRentOut_"+this.index

        holdDownAction(rent, rentOut, this, 50, 0);

        if (this.residents >= residentsPerBuilding) {
            rent.style.backgroundColor = 'gray'
        } else {
            rent.style.backgroundColor = ''
        }
        head.append(rent)
        a.append(head)

        const resCount = document.createElement('span')
        resCount.style.marginTop = '2px'
        resCount.innerHTML = this.residents +" / "+residentsPerBuilding
        resCount.id = "resCount_"+a.dataset.index
        a.append(resCount)

        const bottom = document.createElement('div')
        bottom.classList.add('building_bottom')

        const rentSpan = document.createElement('span')
        rentSpan.innerHTML = "$"+this.rent.toLocaleString()
        rentSpan.classList.add('building_rent')
        rentSpan.id = "rentSpan_"+a.dataset.index

        const dec = document.createElement('button')
        dec.classList.add('button')
        dec.innerHTML = "-"
        bottom.append(dec)

        bottom.append(rentSpan)

        const inc = document.createElement('button')
        inc.classList.add('button')
        inc.innerHTML = "+"

        holdDownAction(inc, incRent, this, 10, 15);
        holdDownAction(dec, decRent, this, 10, 15);

        bottom.append(inc)
        a.append(bottom)
    
        game_center.append(a)
    }, 
    update() {
        document.getElementById('resCount_'+this.index).innerHTML = this.residents +" / "+residentsPerBuilding
        document.getElementById('rentSpan_'+this.index).innerHTML = "$" + this.rent
        if (this.residents >= residentsPerBuilding) {
            document.getElementById("buildingRentOut_"+this.index).style.backgroundColor = 'gray'
        } else {
            document.getElementById("buildingRentOut_"+this.index).style.backgroundColor = ''
        }
    }
}

export function drawBuildings() {
    game_center.innerHTML = ""
    AllBuildings = []
    for (let i=0;i<JSON.parse(localStorage.game).buildings.length + 1;i++) {
        if (i < JSON.parse(localStorage.game).buildings.length) {
            let b = Object.create(bldg)
            AllBuildings.push(b)
            b.rent = JSON.parse(localStorage.game).buildings[i].rent
            b.residents = JSON.parse(localStorage.game).buildings[i].residents
            b.index = i
            b.color = JSON.parse(localStorage.game).buildings[i].color
            b.display()
        } else {
            const a = document.createElement('div')
            a.classList.add('building')
            a.style.filter = 'grayscale()'
            a.style.backgroundImage = 'url(./buildings/gray.svg)'
            const head = document.createElement('div')
            head.classList.add('building_head')
            buyNewBuilding = document.createElement('button')
            buyNewBuilding.classList.add('button')
            buyNewBuilding.innerHTML = "Buy new building"
            buyNewBuilding.onclick = function() {
                newAppt()
            }
            if (parseInt(localStorage.cash) >= 600000) {
                buyNewBuilding.style.backgroundColor = 'yellow'
            } else {
                buyNewBuilding.style.backgroundColor = 'gray'
            }
            buyNewBuilding.style.fontSize = ""
            buyNewBuilding.style.marginBottom = "5px"
            const subtitle = document.createElement('div')
            subtitle.innerHTML = "$600,000"
            head.append(buyNewBuilding, subtitle)
            a.append(head)
        
            game_center.append(a)
        }
    
    }
}

function incRent(building) {
    //building = AllBuildings[building]
    building.rent += 5

    if (Math.random() >= 0.95) {
        residentLeave()
    }
    if (building.rent % 100 == 0) {
        changeRating(-2.5)
    }

    sync()
    syncBuildingData(building)
}

function decRent(building) {
    //building = AllBuildings[building]
    if (building.rent >= 5) {
        building.rent -= 5

        if (building.rent % 100 == 0) {
            changeRating(2.5)
        }
        sync()
        syncBuildingData(building)
    }

}

function holdDownAction(btn, action, param, start, speedup) {
    var t;

    var repeat = function () {
        btn.style.fontWeight = '600'
        action(param);
        t = setTimeout(repeat, start);
        start = start / speedup;

    }

    btn.onpointerdown = function() {
        repeat();
    }

    btn.onpointerup = function () {
        //btn.style.backgroundColor = ''
        btn.style.fontWeight = '400'
        btn.style.color = 'black'
        clearTimeout(t);
    }
    btn.onpointerleave = function () {
        //btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        btn.style.fontWeight = '400'
        clearTimeout(t);
        btn
    }
};


function rentOut(building) {
    if (!paused) {
        if (parseInt(localStorage.cash) >= building.rent) {
            if (building.residents < residentsPerBuilding) {
                let x = (Math.floor(Math.random() * (100 + (building.rent/5))))
                let chance = x <= parseFloat(localStorage.rating)
                if (chance) {
                    changeCash((building.rent / 20) * -1)
                    building.residents += 1
                    changeRating(resjoin_rating)
                } else {
                    changeCash((building.rent / 80) * -1)
                }
        
            }
        }
        sync()
        syncBuildingData(building)
    }

}

export function residentLeave(override) {
    let x
    if (override) {
        x = (Math.floor(Math.random() * (override)))
    } else {
        x = (Math.floor(Math.random() * ((parseInt(localStorage.rating)/6))))
    }

    let chance = (x == 0)

    if (chance) {
        let bldg = Math.floor(Math.random() * AllBuildings.length)
        let leaving = Math.floor(Math.random() * (AllBuildings[bldg].residents * ((100 - (parseFloat(localStorage.rating)+25))/100)))
        if (leaving < 0) {
            leaving = 0
        }
        AllBuildings[bldg].residents -= leaving
        if (localStorage.amenities_quickturnover == "true") {
            localStorage.residentLeaveLoss = parseInt(localStorage.residentLeaveLoss) - ((AllBuildings[bldg].rent / 5) * leaving)
        } else {
            localStorage.residentLeaveLoss = parseInt(localStorage.residentLeaveLoss) - (AllBuildings[bldg].rent * 3 * leaving)
        }
        
        changeCash(-1 * (AllBuildings[bldg].rent * 1 * leaving))
        changeRating(leaving * resleave_rating)
        syncBuildingData(AllBuildings[bldg])
    }

    
}


function newAppt() {
    if (parseInt(localStorage.cash) >= 600000) {
        localStorage.cash = parseInt(localStorage.cash) - 600000 
        let b = JSON.parse(localStorage.game)
        b.buildings.push({
            "rent":0,
            "residents":0,
            "available":residentsPerBuilding,
            "color":getRandomColor()
        })
        changeRating(15)
        localStorage.game = JSON.stringify(b)
        sync()
        drawBuildings()
    }
   
}

function syncBuildingData(building) {
    building.update()
    localStorage.game = JSON.stringify({buildings:AllBuildings})
    if (parseInt(localStorage.cash) >= 600000) {
        buyNewBuilding.style.backgroundColor = 'yellow'
    } else {
        buyNewBuilding.style.backgroundColor = 'gray'
    }
}

export function getRandomColor() {
    let x = Math.floor(Math.random() * 5)
    let colors = ['blue', 'green', 'orange', 'pink', 'red']
    return colors[x]
}