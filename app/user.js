class User {
  constructor({user, boards}){
    this.id = user["id"];
    this.name = user["name"];
    this.boards = boards;
  }

}
