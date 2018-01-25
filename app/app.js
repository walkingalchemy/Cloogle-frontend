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
    App.renderLoginInfo()
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
      event.target.style.background = App.colors[2]
      document.getElementById(`label-${event.target.id.split('-')[1]}`).style.background = App.colors[2]

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

  static renderLoginForm(event){
    event.preventDefault();
    let loginForm = document.createElement("form");
    loginForm.id = "login-form"

    let usernameLabel = document.createElement("label")
    usernameLabel.htmlFor = "username"
    usernameLabel.innerText = "Username:"

    App.username = document.createElement("input");
    App.username.type = "text";
    App.username.id = "username";

    let submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Login"
    loginForm.append(usernameLabel)
    loginForm.append(App.username)
    loginForm.append(submit)

    App.navBar.removeChild(App.initiateUser)
    App.navBar.append(loginForm)

    // App.userInfo.append(loginForm)
    loginForm.addEventListener("submit", App.fetchUser)
  }

  static renderCreateAccountForm(event){
    event.preventDefault();
    let createAccountForm = document.createElement("form");
    createAccountForm.id = "create-account-form"

    let usernameLabel = document.createElement("label")
    usernameLabel.htmlFor = "username"
    usernameLabel.innerText = "Username:"

    App.username = document.createElement("input");
    App.username.type = "text";
    App.username.id = "username";

    let submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Create Account"
    createAccountForm.append(usernameLabel)
    createAccountForm.append(App.username)
    createAccountForm.append(submit)

    App.navBar.removeChild(App.initiateUser)
    App.navBar.append(createAccountForm)

    createAccountForm.addEventListener("submit", App.createUser)
  }

  static async createUser(event){
    event.preventDefault()
    if (App.username.value.match(/\W/)){
      alert("Username cannot contain non-letter characters.")
    } else {
      let userJSON = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({name: App.username.value})
      }).then(r => r.json())
      if (userJSON["errors"]){
        alert(userJSON["errors"][0])
      } else {
        debugger
        App.user = new User(userJSON)
        App.renderUserInfo()
      }
    }
  }

  static async fetchUser(event){
    event.preventDefault()
    if (App.username.value.match(/\W/)){
      alert("Username cannot contain non-letter characters.")
    } else {
      let userJSON = await fetch(`http://localhost:3000/api/v1/users/${App.username.value}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      }).then(r => r.json())
      if (userJSON["errors"]){
        alert(userJSON["errors"][0])
      } else {
        App.user = new User(userJSON)
        App.renderUserInfo()
      }
    }
  }

  static renderUserInfo(){
    App.navBar.removeChild(App.navBar.lastChild)
    App.welcomeMessage = document.createElement("p")
    App.welcomeMessage.innerText = `Welcome, ${App.user.name}!  `

    let logout = document.createElement("button")
    logout.id = "logout"
    logout.innerText= "Logout"
    logout.addEventListener("click", App.logoutUser)
    App.welcomeMessage.append(logout)
    App.navBar.append(App.welcomeMessage)
  }

  static logoutUser(event){
    App.user = undefined;
    App.navBar.removeChild(App.navBar.lastChild)
    App.renderLoginInfo()
  }

  static renderLoginInfo(){
    App.initiateUser = document.createElement("p")
    App.initiateUser.id = "initiate-user"
    App.innerText = 'Track your progress: '

    App.loginButton = document.createElement("button")
    App.loginButton.id = "login"
    App.loginButton.innerText = "Login"

    App.createAccountButton = document.createElement("button")
    App.createAccountButton.id = "create-account"
    App.createAccountButton.innerText = "Create Account"

    App.initiateUser.append(App.loginButton)
    App.initiateUser.append(App.createAccountButton)

    App.navBar.append(App.initiateUser)


    App.loginButton.addEventListener("click", App.renderLoginForm)
    App.createAccountButton.addEventListener("click", App.renderCreateAccountForm)

    App.userInfo = document.getElementById("user-info")

  }



}
