// recoleccion estimada por segundo de recursos (DATO)
const foodCollectionRate = 0.3383;
const woodCollectionRate = 0.41;
const goldCollectionRate = 0.38;
const stoneCollectionRate = 0.36;

// variables para almacenar requisitos de aldeanos
let totalFoodPerSecond = 0
let totalWoodPerSecond = 0
let totalGoldPerSecond = 0
let totalStonePerSecond = 0

// declaro variables que voy a utilizar en la funcion
let foodVills
let woodVills
let goldVills
let stoneVills

// declaro la cartera de produccion donde se van a agregar las opcciones elegidas de unidades
let carteraDeProduccion = []

//calculo de aldeanos necesarios para mantener la produccion constante de unidades elegidas
function calular(){
    foodVills = Math.ceil(totalFoodPerSecond / foodCollectionRate)
    woodVills = Math.ceil(totalWoodPerSecond  / woodCollectionRate)
    goldVills = Math.ceil(totalGoldPerSecond  / goldCollectionRate)
    stoneVills = Math.ceil(totalStonePerSecond  / stoneCollectionRate)
}

// constructor de unidades (DATO)
class Unidad {
    constructor(name, timeCost, foodCost, woodCost, goldCost, stoneCost){
        this.name = name;
        this.timeCost = timeCost;
        this.foodCost = foodCost;
        this.woodCost = woodCost;
        this.goldCost = goldCost;
        this.stoneCost = stoneCost;
    }
}
const archer= new Unidad (`archer`,35,0,25,45,0);
const knight= new Unidad (`knight`,30,60,0,75,0);
const scoutCavalry= new Unidad (`scoutCavalry`,30,80,0,0,0);
const villager= new Unidad (`villager`,25,50,0,0,0);

// input de unidades deseadas a calcular
let input
do{
    input = parseInt(prompt(`Agregue las unidades a producir (una por vez): 1:Knight, 2:Archer, 3:Scout Cavalry, 4:Aldeano, 5: terminar`))
    if (input === 1){
        carteraDeProduccion.push(knight)
    } else if (input === 2){
        carteraDeProduccion.push(archer)
    } else if (input === 3){
        carteraDeProduccion.push(scoutCavalry)
    } else if (input === 4){
        carteraDeProduccion.push(villager)
    } else {
        continue
    }
} while (input != 5)

// se escribe una lista de unidades a producir y se suma su costo por recurso por segundo en las variables declaradas anteriormente
document.write(`<b>Calculadora de recursos AoE2</b> <br><br>Las unidades a producir son: <br>`)
for(unidades of carteraDeProduccion){
    document.write(`${unidades.name}, `)
    totalFoodPerSecond += (unidades.foodCost / unidades.timeCost)
    totalWoodPerSecond += (unidades.woodCost / unidades.timeCost)
    totalGoldPerSecond += (unidades.goldCost / unidades.timeCost)
    totalStonePerSecond += (unidades.stoneCost / unidades.timeCost)
}

// document.write(`<br><br>Recursos requeridos por segundo: <br>food: ${totalFoodPerSecond} <br>wood: ${totalWoodPerSecond} <br>gold: ${totalGoldPerSecond} <br>stone: ${totalStonePerSecond}`)

// se corre la formula calcular y se escriben los resultados
calular()

document.write(`<br><br>la cantidad minima de aldeanos necesarios para mantener la produccion constante de estas unidades es:<br>
Aldeanos en comida ${foodVills} <br>
Aldeanos en madera ${woodVills} <br>
Aldeanos en oro ${goldVills} <br>
Aldeanos en piedra ${stoneVills}<br><br>
Aldeanos totales requeridos: ${foodVills+woodVills+goldVills+stoneVills}`)