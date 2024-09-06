//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO
let pollitoObj = null; // en la pantalla de inicio el pollito no existe
// let tuberiaDePrueba = null
let tuberiasArray = []
let frecuenciaTuberias = 1500

let gameIntervalId = null
let tuberiasIntervalId = null

let score = 0

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  console.log("iniciando juego")

  // 1. cambiar las pantallas.
  splashScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // 2. añadir todos los elementos inicial del juego
  pollitoObj = new Pollito()
  console.log(pollitoObj)
  // tuberiaDePrueba = new Tuberia()

  // 3. iniciar el intervalo de juego
  gameIntervalId = setInterval(() => {
    // console.log("intervalo de juego andando")
    gameLoop()
  }, Math.round(1000 / 60)) // 60fps

  // 4. (opcional) iniciaremos otros intervalos que requiera el juego
  tuberiasIntervalId = setInterval(() => {
    addTuberia()
  }, frecuenciaTuberias)

}

function gameLoop() {
  // se ejecuta 60 veces por segundo en el intervalo principal

  pollitoObj.gravity()
  // tuberiaDePrueba.automaticMovement()
  tuberiasArray.forEach((eachTuberia) => {
    eachTuberia.automaticMovement()
  })

  detectarSiTuberiaSalio()
  detectarColisionPollitoTuberias()

}

function addTuberia() {

  let randomPositionY = Math.floor(Math.random() * (-150)) // entre -150 y 0

  let newTuberiaArriba = new Tuberia(randomPositionY, "arriba")
  tuberiasArray.push(newTuberiaArriba)

  let newTuberiaAbajo = new Tuberia(randomPositionY + 330, "abajo")
  tuberiasArray.push(newTuberiaAbajo)

  console.log(tuberiasArray)
}

function detectarSiTuberiaSalio() {

  if (tuberiasArray.length === 0) {
    return // no ejecutar la funcion si el array está vacio
  }

  if ((tuberiasArray[0].x + tuberiasArray[0].w) <= 0) {
    // tuberiasArray.splice(0, 1)
    tuberiasArray[0].node.remove()// Sacar del DOM
    tuberiasArray.shift() // Sacarlo de JS

    //aumentar el score
    //score++
    score += 0.5 // luego usar esto para acceder al dom y pintarlo
    console.log(score)
  }

}


function detectarColisionPollitoTuberias() {


  // cada una de las tuberias => tuberiasArray => forEach => cadaTuberia

  tuberiasArray.forEach((eachTuberia) => {

    // pollito => pollitoObj
    // tuberia => eachTuberia

    if (
      pollitoObj.x < eachTuberia.x + eachTuberia.w &&
      pollitoObj.x + pollitoObj.w > eachTuberia.x &&
      pollitoObj.y < eachTuberia.y + eachTuberia.h &&
      pollitoObj.y + pollitoObj.h > eachTuberia.y
    ) {
      // Collision detected!
      console.log("El pollito se ha estapao!")
      gameOver()
    }

  })
}

function gameOver() {
  // 1. limpiar los intervalos
  clearInterval(gameIntervalId)
  clearInterval(tuberiasIntervalId)

  //ESTO DEBERIA OCURRIR AL REINICIAR EL JUEGO
  // 2. limpiar la caja de juego
  // gameBoxNode.innerHTML = ""
  // 3. Reiniciar todos los elementos del juego
  // pollitoObj = null
  // tuberiasArray = []

  // 4. cambiar de pantallas
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"

}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)
gameBoxNode.addEventListener("click", () => {
  pollitoObj.jump()
})




//* PLANIFICACION


// pollito (x, y, w, h) ✅
// tuberias (x, y, w, h) ✅

// el pollito aparece una vez al inicio del juego ✅
// las tuberias aparecen continuamente ✅
// las tuberias deberia desaparecer (dejar de existir en JS, dejar de existir en el DOM) ✅

// colisiones pollito contra las tuberias ✅
// colision del pollito con el suelo

// salto del pollito (addEventListener) ✅
// gravedad del pollito ✅

// movimiendo de las tuberias ✅
// game over ✅

// *BONUS
// score => tiempo o por tuberias llegan al final
// movimiento fondo
// movimiento del suelo
// rotación del pollito
