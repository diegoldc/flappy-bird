class Pollito {

  constructor() {

    // .todos los pollitos se crearan con estos valores
    this.x = 70;
    this.y = 60;
    this.h = 40;
    this.w = 45;
    this.gravitySpeed = 2;
    this.jumpSpeed = 35;


    // al crear el pollito:

    // 1. añadir el pollito al DOM
    this.node = document.createElement("img")
    this.node.src = "./images/flappy.png"
    gameBoxNode.append(this.node)

    // 2. ajustamos sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute" // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

  }

  gravity() {
    this.y += this.gravitySpeed
    //! SIEMPRE que modificamos posición o dimension, ajustamos el nodo.
    this.node.style.top = `${this.y}px` 

    // condicional para verificar si el pollito se estrelló contra el suelo

    if ((this.y + this.h) >= gameBoxNode.offsetHeight) {
      gameOver()
    }
  }

  jump() {
    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`

    // forma de salto fluida
    
    // let saltoIntervalId = setInterval(() => {
    //   this.y -= 10
    //   this.node.style.top = `${this.y}px`
    // }, 15)

    // setTimeout(() => {
    //   clearInterval(saltoIntervalId)
    // }, 200)
  }
}