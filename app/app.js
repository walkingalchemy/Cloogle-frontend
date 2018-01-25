class App {
  static init(){
    App.navBar = document.getElementById("nav-bar")
    App.mainContent = document.getElementById("main-content")
    App.board = document.querySelector(".board")
    App.hints = document.getElementById("hints")
    App.info = document.getElementById("info")
    App.chooseBoard = document.getElementById("choose-board")
    App.renderBoardOptions()
    App.chooseBoard.addEventListener("change", App.handleBoardChoice)
    App.colors = ["#FBBC05","EA4335","#34A853","#4285F4"]
  }

  static async handleBoardChoice(event){
    let boardUrl = event.target.selectedOptions[0].value
    let boardJSON = await fetch(boardUrl).then(r => r.json())
    new Board(boardJSON)
  }

  static async renderBoardOptions(){
    let boards = await fetch("http://localhost:3000/api/v1/boards").then(r => r.json())
    for (let board of boards) {
      let option = document.createElement("option")
      option.value = board.board_url
      option.innerText = board.board_url
      App.chooseBoard.append(option)
    }
  }

  static resetBoard(){
    App.board.innerHTML = ''
    App.board.addEventListener('mouseover', App.boardHoverHandler)
    App.board.addEventListener('mouseout', App.boardHoverHandler)
    App.hints.innerHTML = "<dl id='across'> <dt>Across</dt> </dl> <dl id='down'> <dt>Down</dt> </dl>"
    App.hints.addEventListener('mouseover', App.hintHoverHandler)
    App.hints.addEventListener('mouseout', App.hintHoverHandler)
    App.info.innerHTML = ''
  }

  static hintHoverHandler(event) {
  	if ((event.target.tagName.toLowerCase() === 'dd') && (event.type === 'mouseover')){
      if (event.target.parentNode.id === 'down'){
        event.target.style.background = App.colors[2]
        document.querySelectorAll(`[data-down='${event.target.id.split('-')[1]}']`).forEach(function(cell){ cell.style.background = App.colors[2] })
      }
      if (event.target.parentNode.id === 'across'){
        event.target.style.background = App.colors[0]
        document.querySelectorAll(`[data-across='${event.target.id.split('-')[1]}']`).forEach(function(cell){ cell.style.background = App.colors[0] })
      }
    }
    if ((event.target.tagName.toLowerCase() === 'dd') && (event.type === 'mouseout')){
      event.target.style.background = ''
      if (event.target.parentNode.id === 'down'){
        document.querySelectorAll(`[data-down='${event.target.id.split('-')[1]}']`).forEach(function(cell){ cell.style.background = '' })
      }
      if (event.target.parentNode.id === 'across'){
        document.querySelectorAll(`[data-across='${event.target.id.split('-')[1]}']`).forEach(function(cell){ cell.style.background = '' })
      }
    }
  }


  static boardHoverHandler(event) {
    console.log(event.target.dataset.across)
    if ((event.target.tagName.toLowerCase() === 'input') && (event.type === 'mouseover')){

      if (event.target.dataset.across){
        document.querySelectorAll(`[data-across='${event.target.dataset.across}']`).forEach(function(cell){ cell.style.background = App.colors[0] })
        document.querySelectorAll(`[data-down='${event.target.dataset.down}']`).forEach(function(cell){ cell.style.background = App.colors[2] })
        document.querySelectorAll(`#across-${event.target.dataset.across}`).forEach(function(dd){dd.style.background = App.colors[0]})
      }
      if (event.target.dataset.down) {
        document.querySelectorAll(`[data-across='${event.target.dataset.across}']`).forEach(function(cell){ cell.style.background = App.colors[0] })
        document.querySelectorAll(`[data-down='${event.target.dataset.down}']`).forEach(function(cell){ cell.style.background = App.colors[2] })
        document.querySelectorAll(`#down-${event.target.dataset.down}`).forEach(function(dd){dd.style.background = App.colors[2]})
      }
      event.target.style.background = App.colors[3]

    }
    if ((event.target.tagName.toLowerCase() === 'input') && (event.type === 'mouseout')){
      event.target.style.background = ''
      if (event.target.dataset.across){
        document.querySelectorAll(`[data-across='${event.target.dataset.across}']`).forEach(function(cell){ cell.style.background = '' })
        document.querySelectorAll(`[data-down='${event.target.dataset.down}']`).forEach(function(cell){ cell.style.background = '' })
        document.querySelectorAll(`#across-${event.target.dataset.across}`).forEach(function(dd){dd.style.background = ''})
      }
      if (event.target.dataset.down) {
        document.querySelectorAll(`[data-across='${event.target.dataset.across}']`).forEach(function(cell){ cell.style.background = '' })
        document.querySelectorAll(`[data-down='${event.target.dataset.down}']`).forEach(function(cell){ cell.style.background = '' })
        document.querySelectorAll(`#down-${event.target.dataset.down}`).forEach(function(dd){dd.style.background = ''})
      }
    }
  }



}
