class Board {
  constructor(id, {answers, clues, grid, gridnums, size, author, editor, dow, date, publisher, title}){
    this.id = id
    this.answers = answers
    this.hints = clues
    this.grid = grid
    this.gridnums = gridnums
    this.width = size["cols"]
    this.height = size["rows"]
    this.author = author
    this.editor = editor
    this.day = dow
    this.date = date
    this.publisher = publisher
    this.title = title
    this.renderBoard()
    this.renderBoardLabels()
    this.renderHints()
    this.renderInfo()
    this.renderAnswerLocations()
  }

  renderBoard() {
    App.resetBoard()
    for (let idx in this.grid){
      let cell = this.cellFromIndex(idx)
      if (this.grid[idx] === "."){
        App.board.append(this.createSpan(cell))
      } else {
        App.board.append(this.createInput(cell))
      }
      App.board.style.setProperty("grid-template", `repeat(${this.height},${100/this.height}%) / repeat(${this.width},${100/this.width}%)`)
    }
  }

  renderAnswerLocations() {
    for (let index in this.gridnums) {
      if (this.gridnums[index] != 0) {
        for (let idx in this.hints['across']) {
          if (this.hints['across'][idx].split('.')[0] == this.gridnums[index]) {
            for (let char in this.answers['across'][idx]) {
              App.board.children[parseInt(index) + parseInt(char)].dataset.across = this.gridnums[index]
            }
          }
        }
        for (let idx in this.hints['down']) {
          if (this.hints['down'][idx].split('.')[0] == this.gridnums[index]) {
            for (let char in this.answers['down'][idx]) {
              if ((parseInt(index) + parseInt(char) * this.width) < App.board.children.length){
                App.board.children[parseInt(index) + parseInt(char) * this.width].dataset.down = this.gridnums[index]
              }
            }
          }
        }
      }
    }
  }

  renderBoardLabels() {
    let boardLabels = document.createElement('div')
    boardLabels.className = "board crossword-board--labels"
    boardLabels.style.setProperty("grid-template", `repeat(${this.height},${100/this.height}%) / repeat(${this.width},${100/this.width}%)`)
    for(let idx in this.gridnums){
      if (this.gridnums[idx] !== 0 ){
        let label = this.labelFromIndex(idx)
        boardLabels.append(this.createLabel(label))

      }
    }
    App.board.append(boardLabels)
  }

  renderHints() {
    for(let idx in this.hints['across']){
      let acrossDd = document.createElement('dd')
      acrossDd.id = `across-${this.hints['across'][idx].split('.')[0]}`
      acrossDd.innerText = `${this.hints['across'][idx]}`
      document.getElementById('across').append(acrossDd)
    }
    for(let idx in this.hints['down']){
      let downDd = document.createElement('dd')
      downDd.id = `down-${this.hints['down'][idx].split('.')[0]}`
      downDd.innerText = `${this.hints['down'][idx]}`
      document.getElementById('down').append(downDd)
    }
  }

  renderInfo() {
    let infoDiv = document.createElement('div')
    infoDiv.innerHTML = `
    <p>Title: ${this.title}</p>
    <p>Day of the Week: ${this.day}</p>
    <p>Date: ${this.date}</p>
    <p>Author: ${this.author}</p>
    <p>Editor: ${this.editor}</p>
    <p>Publisher: ${this.publisher}</p>
    `
    App.info.append(infoDiv)
  }


  createLabel(label) {
    let outerSpan = document.createElement("span")
    outerSpan.className = `crossword-board__item-label crossword-board__item-label--${label[2]}`
    outerSpan.id = `label-${label[2]}`
    let innerSpan = document.createElement("span")
    innerSpan.className = "crossword-board__item-label-text"
    innerSpan.innerText = `${label[2]}`
    outerSpan.append(innerSpan)
    outerSpan.style.setProperty('grid-area', `${label[0]+1}/${label[1]+1}/${label[0]+1}/${label[1]+1}`)
    return outerSpan
  }

  createSpan(cell) {
    let span = document.createElement("span")
    span.className = "crossword-board__item--blank"
    span.id = `item${cell[0]}-${cell[1]}`
    return span
  }

  createInput(cell) {
    let input = document.createElement("input")
    input.type = "text"
    input.setAttribute("maxlength", 1)
    input.className = "crossword-board__item"
    input.id = `item${cell[0]}-${cell[1]}`
    input.dataset.index = cell[3]
    // input.value = cell[2]
    return input
  }

  cellFromIndex(idx) {
    let letter = this.grid[idx]
    let x = Math.floor(idx / this.width)
    let y = idx % this.width
    return [x, y, letter, idx]
  }

  labelFromIndex(idx) {
    let label = this.gridnums[idx]
    let x = Math.floor(idx / this.width)
    let y = idx % this.width
    return [x, y, label]
  }


}
