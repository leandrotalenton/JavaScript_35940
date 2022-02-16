// objeto recoleccion estimada por segundo de recursos (DATO)
let collectionRates = {
    food: 0.3383,
    wood: 0.41,
    gold: 0.38,
    stone: 0.36,
    // researchWheelBarrowUpgrade: function(){
    //     collectionRates.food = 0.38;
    // },
    // researchHandCartUpgrade: function(){
    //     collectionRates.food = 0.4;
    // },
}
// objeto para almacenar requisitos de recursos por segundo
let resourcesRquiredPerSecond = {
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
}
// declaro la cartera de produccion donde se van a agregar las opcciones elegidas de unidades
let carteraDeProduccion = []
// declaro variables que voy a utilizar en la funcion
let villagerDistribution = {
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
    calularCantidadDeAldeanos: function() {
        villagerDistribution.food = Math.ceil(resourcesRquiredPerSecond.food / collectionRates.food);
        villagerDistribution.wood = Math.ceil(resourcesRquiredPerSecond.wood  / collectionRates.wood);
        villagerDistribution.gold = Math.ceil(resourcesRquiredPerSecond.gold  / collectionRates.gold);
        villagerDistribution.stone = Math.ceil(resourcesRquiredPerSecond.stone  / collectionRates.stone);
    },
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
const archer = new Unidad (`archer`,35,0,25,45,0);
const knight = new Unidad (`knight`,30,60,0,75,0);
const scoutCavalry = new Unidad (`scoutCavalry`,30,80,0,0,0);
const villager = new Unidad (`villager`,25,50,0,0,0);

// input de unidades deseadas a calcular
let input
do{
    input = parseInt(prompt(`Agregue las unidades a producir (una por vez): 0: terminar, 1:Knight, 2:Archer, 3:Scout Cavalry, 4:Aldeano`))
    if (input === 1){
        carteraDeProduccion.push(knight)
    } else if (input === 2){
        carteraDeProduccion.push(archer)
    } else if (input === 3){
        carteraDeProduccion.push(scoutCavalry)
    } else if (input === 4){
        carteraDeProduccion.push(villager)
    } 
} while (input != 0)

// se escribe una lista de unidades a producir y se suma su costo por recurso por segundo en las variables declaradas anteriormente
document.write(`<b>Calculadora de recursos AoE2</b> <br><br>Las unidades a producir son: <br>`)

for(unidades of carteraDeProduccion){
    document.write(`${unidades.name}, `)
    resourcesRquiredPerSecond.food += (unidades.foodCost / unidades.timeCost)
    resourcesRquiredPerSecond.wood += (unidades.woodCost / unidades.timeCost)
    resourcesRquiredPerSecond.gold += (unidades.goldCost / unidades.timeCost)
    resourcesRquiredPerSecond.stone += (unidades.stoneCost / unidades.timeCost)
}

// se ejecuta el metodo calularCantidadDeAldeanos y se escriben los resultados
villagerDistribution.calularCantidadDeAldeanos();

document.write(`<br><br>la cantidad minima de aldeanos necesarios para mantener la produccion constante de estas unidades es:<br>
Aldeanos en comida ${villagerDistribution.food} <br>
Aldeanos en madera ${villagerDistribution.wood} <br>
Aldeanos en oro ${villagerDistribution.gold} <br>
Aldeanos en piedra ${villagerDistribution.stone}<br><br>
Aldeanos totales requeridos: ${villagerDistribution.food+villagerDistribution.wood+villagerDistribution.gold+villagerDistribution.stone}`)