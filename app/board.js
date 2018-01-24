class Board {
  constructor({answers, clues, grid, gridnums, size, title}){
    this.puzzles = answers
    this.hints = clues
    this.grid = grid
    this.gridnums = gridnums
    this.width = size["cols"]
    this.height = size["rows"]
    this.title = title
    this.renderBoard()
  }

  renderBoard(){
    App.clearBoard()
    for (let idx in this.grid){
      let cell = this.cellFromIndex(idx)
      if (this.grid[idx] === "."){
        App.board.append(this.createSpan(cell))
      } else {
        App.board.append(this.createInput(cell))
      }
      App.board.style.setProperty("grid-template", `repeat(${this.width},${100/this.width}%) / repeat(${this.height},${100/this.height}%)`)
    }
  }

  createSpan(cell){
    // cell = [x,y,"*"]
    let span = document.createElement("span")
    span.className = "crossword-board__item--blank"
    span.id = `item${cell[0]}-${cell[1]}`
    return span
  }

  createInput(cell){
    // cell = [x,y,"*"]
    let input = document.createElement("input")
    input.type = "text"
    input.minlength = 1
    input.maxlength = 1
    input.class = "crossword-board__item"
    input.id = `item${cell[0]}-${cell[1]}`
    input.value = cell[2]
    return input
  }

  cellFromIndex(idx){
    let letter = this.grid[idx]
    let x = Math.floor(idx / this.width)
    let y = idx % this.width
    return [x, y, letter]
  }


}
