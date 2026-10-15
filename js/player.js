class Player {

  constructor() {
    //* all player properties will go here
    this.node = document.createElement("div")
    gameBoxNode.append(this.node) // as soon as the obj from this class is created, the node will be inserted into the game box

    this.node.className = "player"

    // position and dimensions
    this.x = 70;
    this.y = 150;
    this.width = 50;
    this.height = 50;

    // adding the initial styles
    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.backgroundColor = "white"
    this.node.style.border = "solid black 2px"
    this.node.style.borderRadius = "5px"

    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.speed = 20

  }

  //* all player methods will go here
  moveUp() {

    if (this.y < 0) {
      return // don't move up if already out of bounds
    }

    this.y -= this.speed;
    // if (this.y < 0) {
    //   this.y = 0
    // }
    this.node.style.top = `${this.y}px`
  }

  moveDown() {

    if (this.y > 350) {
      return // don't move up if already out of bounds
    }

    this.y += this.speed;
    this.node.style.top = `${this.y}px`
  }

}