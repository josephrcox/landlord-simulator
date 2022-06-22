let gameTable

export function table_init() {
    gameTable = document.createElement('table')
    gameTable.classList.add('history_table')

    if (localStorage.history == null) {
        document.querySelector('.game-bottom').append(gameTable)
        gameTable.insertRow(0).insertCell(0).innerText = "Month (left is newest)"
        gameTable.insertRow(1).insertCell(0).innerText = "Ownership"
        gameTable.insertRow(2).insertCell(0).innerText = "Residents"
        gameTable.insertRow(3).insertCell(0).innerText = "Rating"
        gameTable.insertRow(4).insertCell(0).innerText = "Cash"
        gameTable.insertRow(5).insertCell(0).innerText = "Rent (revenue)"
        gameTable.insertRow(6).insertCell(0).innerText = "Rent (profit)"
        gameTable.insertRow(7).insertCell(0).innerText = "Amenities (profit)"
        gameTable.insertRow(8).insertCell(0).innerText = "Taxes"
        gameTable.insertRow(9).insertCell(0).innerText = "Investment"
        gameTable.insertRow(10).insertCell(0).innerText = "Lost residents cost"
        gameTable.insertRow(11).insertCell(0).innerText = "Staff"
        gameTable.insertRow(12).insertCell(0).innerText = "Business Profit"
        gameTable.insertRow(13).insertCell(0).innerText = "Your Profit (by ownership)"
            
    } else {
        gameTable.innerHTML = localStorage.history
        document.querySelector('.game-bottom').append(gameTable)
    }
}


export function syncTable(totalResidents, revenueRent, rentProfit, amenitiesProfit, propertyTaxes, residentLeaveLoss, staffSalaries) {
    let column = 1 // creates columns from the left
    let badColor = 'red'
    let goodColor = '#0ac80a'
    gameTable.rows[0].insertCell(column).innerText = "Month "+localStorage.month
    gameTable.rows[1].insertCell(column).innerText = (parseFloat(localStorage.ownership) * 100) + "%"
    gameTable.rows[2].insertCell(column).innerText = totalResidents
    gameTable.rows[3].insertCell(column).innerText = document.getElementById('stats-rating-value').innerText
    gameTable.rows[4].insertCell(column).innerText = "$"+parseInt(localStorage.cash).toLocaleString()
        if (parseInt(localStorage.cash) <= 0) {
            gameTable.rows[4].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[4].cells[1].style.backgroundColor = goodColor
        }
        if (gameTable.rows[4].cells.length > 2) {
            let x = parseInt(gameTable.rows[4].cells[2].innerText.split('$')[1])
            if (x > parseInt(gameTable.rows[4].cells[1].innerText.split('$')[1])) {
                gameTable.rows[4].cells[1].innerText += '🔽'
            } else {
                gameTable.rows[4].cells[1].innerText += '🔼'
            }
        }
 
    gameTable.rows[5].insertCell(column).innerText = "$"+revenueRent.toLocaleString()
    gameTable.rows[6].insertCell(column).innerText = "$"+rentProfit.toLocaleString()
        if (rentProfit <= 0) {
            gameTable.rows[6].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[6].cells[1].style.backgroundColor = goodColor
        }
    gameTable.rows[7].insertCell(column).innerText = "$"+amenitiesProfit.toLocaleString()
        if (amenitiesProfit <= 0) {
            gameTable.rows[7].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[7].cells[1].style.backgroundColor = goodColor
        }
    gameTable.rows[8].insertCell(column).innerText = "$"+propertyTaxes.toLocaleString()
    gameTable.rows[9].insertCell(column).innerText = "$"+localStorage.thisMonthInvestmentTotal.toLocaleString()

    gameTable.rows[10].insertCell(column).innerText = "$"+residentLeaveLoss.toLocaleString()
        if (residentLeaveLoss <= 0) {
            gameTable.rows[10].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[10].cells[1].style.backgroundColor = goodColor
        }
    gameTable.rows[11].insertCell(column).innerText = "$"+staffSalaries.toLocaleString()
    
    gameTable.rows[12].insertCell(column).innerText = "$"+(rentProfit + amenitiesProfit + propertyTaxes + residentLeaveLoss).toLocaleString()
        if ((rentProfit + amenitiesProfit + propertyTaxes + residentLeaveLoss) <= 0) {
            gameTable.rows[12].cells[1].style.backgroundColor = badColor
            localStorage.setItem('profiting', false)
        } else {
            gameTable.rows[12].cells[1].style.backgroundColor = goodColor
            localStorage.setItem('profiting', true)
        }
    gameTable.rows[13].insertCell(column).innerText = "$"+((rentProfit + amenitiesProfit + propertyTaxes + residentLeaveLoss)*parseFloat(localStorage.ownership)).toLocaleString()
        if ((rentProfit + amenitiesProfit + propertyTaxes + residentLeaveLoss) <= 0) {
            gameTable.rows[13].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[13].cells[1].style.backgroundColor = goodColor
        }
    
    localStorage.history = gameTable.innerHTML
}
