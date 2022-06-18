let gameTable

export function table_init() {
    gameTable = document.createElement('table')
    gameTable.classList.add('history_table')

    if (localStorage.history == null) {
        document.querySelector('.game-bottom').append(gameTable)
        gameTable.insertRow(0).insertCell(0).innerText = "Month (left is newest)"
        gameTable.insertRow(1).insertCell(0).innerText = "Rent"
        gameTable.insertRow(2).insertCell(0).innerText = "Residents"
        gameTable.insertRow(3).insertCell(0).innerText = "Rating"
        gameTable.insertRow(4).insertCell(0).innerText = "Cash"
        gameTable.insertRow(5).insertCell(0).innerText = "Rent (revenue)"
        gameTable.insertRow(6).insertCell(0).innerText = "Rent (profit)"
        gameTable.insertRow(7).insertCell(0).innerText = "Amenities (profit)"
        gameTable.insertRow(8).insertCell(0).innerText = "Taxes"
        gameTable.insertRow(9).insertCell(0).innerText = "Available appts cost"
        gameTable.insertRow(10).insertCell(0).innerText = "Lost residents cost"
        gameTable.insertRow(11).insertCell(0).innerText = "Staff"
        gameTable.insertRow(12).insertCell(0).innerText = "PROFIT"
            
    } else {
        gameTable.innerHTML = localStorage.history
        document.querySelector('.game-bottom').append(gameTable)
    }
}


export function syncTable(revenueRent, rentProfit, availLoss, amenitiesProfit, propertyTaxes, residentLeaveLoss, staffSalaries) {
    let column = 1 // creates columns from the left
    let badColor = 'red'
    let goodColor = '#0ac80a'
    gameTable.rows[0].insertCell(column).innerText = "Month "+localStorage.month
    gameTable.rows[1].insertCell(column).innerText = "$"+localStorage.rent.toLocaleString()
    gameTable.rows[2].insertCell(column).innerText = localStorage.residents
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
    gameTable.rows[9].insertCell(column).innerText = availLoss.toLocaleString() +" ("+localStorage.available+")"
        if (availLoss <= 0) {
            gameTable.rows[9].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[9].cells[1].style.backgroundColor = goodColor
        }
    gameTable.rows[10].insertCell(column).innerText = "$"+residentLeaveLoss.toLocaleString()
        if (residentLeaveLoss <= 0) {
            gameTable.rows[10].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[10].cells[1].style.backgroundColor = goodColor
        }
    gameTable.rows[11].insertCell(column).innerText = "$"+staffSalaries.toLocaleString()
    
    gameTable.rows[12].insertCell(column).innerText = "$"+(rentProfit + amenitiesProfit + propertyTaxes + availLoss + residentLeaveLoss).toLocaleString()
        if ((rentProfit + amenitiesProfit + propertyTaxes + availLoss + residentLeaveLoss) <= 0) {
            gameTable.rows[12].cells[1].style.backgroundColor = badColor
        } else {
            gameTable.rows[12].cells[1].style.backgroundColor = goodColor
        }
    
    localStorage.history = gameTable.innerHTML
}
