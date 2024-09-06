class Tuberia {
  constructor(positionY, type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = positionY; // Valor dinámico, se asigna al crear
    this.w = 55; // Valor estático (siempre es igual)
    this.h = 220;
    this.speed = 2;

    // al crear cada tuberia:

    // 1. añadir la tuberia al DOM
    this.node = document.createElement("img");

    if (type === "arriba") {
      this.node.src = "./images/obstacle_top.png";
    } else if (type === "abajo") {
      this.node.src = "./images/obstacle_bottom.png";
    }

    gameBoxNode.append(this.node);

    // 2. ajustamos sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute"; // nos permite ajuste el top y el left y posicionarlo en relación a la caja de juego.
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`;
  }

}
