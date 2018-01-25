class App {
  static init(){
    App.navBar = document.getElementById("nav-bar")
    App.mainContent = document.getElementById("main-content")
    App.board = document.querySelector(".board")
    App.hints = document.getElementById("hints")
    App.chooseBoard = document.getElementById("choose-board")
    App.renderBoardOptions()
    App.chooseBoard.addEventListener("change", App.handleBoardChoice)
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

  static clearBoard(){
    App.board.innerHTML = ''
    App.board.addEventListener('mouseover', App.boardHoverHandler)
    App.board.addEventListener('mouseout', App.boardHoverHandler)
    App.hints.innerHTML = "<dl id='across'> <dt>Across</dt> </dl> <dl id='down'> <dt>Down</dt> </dl>"
    App.hints.addEventListener('mouseover', App.hintHoverHandler)
    App.hints.addEventListener('mouseout', App.hintHoverHandler)
  }

  static hintHoverHandler(event) {
  	if ((event.target.tagName.toLowerCase() === 'dd') && (event.type === 'mouseover')){
  		event.target.style.background = 'aliceblue'
      document.getElementById(`label-${event.target.id.split('-')[1]}`).style.background = 'aliceblue'

    }
    if ((event.target.tagName.toLowerCase() === 'dd') && (event.type === 'mouseout')){
      event.target.style.background = 'white'
      document.getElementById(`label-${event.target.id.split('-')[1]}`).style.background = 'white'
    }
  }
  static boardHoverHandler(event) {
    console.log(event)
    // if ((event.target.tagName.toLowerCase() === 'span') && (event.type === 'mouseover')){
    //   event.target.style.background = 'aliceblue'
    // }
    // if ((event.target.tagName.toLowerCase() === 'span') && (event.type === 'mouseout')){
    //   event.target.style.background = 'white'
    // }
  }



}
