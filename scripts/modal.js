import { pause } from "./script.js"

const help_modal = document.getElementById('helpmodal')
const restart = document.getElementById('restart')

export function gameOver() {
    pause()
    help_modal.style.display = 'block'
    localStorage.gameover = true
    let elem = document.querySelector('.history_table')
    let clone = elem.cloneNode(true)
    document.getElementById('modal_history_table').append(clone)
    document.querySelector('.game').innerHTML = ""
    document.querySelector('.game').style.backgroundColor = "black"
}

restart.addEventListener('click', function() {
    localStorage.clear()
    window.location.reload()
})