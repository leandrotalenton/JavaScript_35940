const foodRequired = document.querySelectorAll(`.recursos__food-texto`)[0];
const woodRequired = document.querySelectorAll(`.recursos__wood-texto`)[0];
const goldRequired = document.querySelectorAll(`.recursos__gold-texto`)[0];
const stoneRequired = document.querySelectorAll(`.recursos__stone-texto`)[0];
const totalRequired = document.querySelectorAll(`.recursos__totales-texto`)[0];

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
    calcularResourcesRquiredPerSecond: function(){
        resourcesRquiredPerSecond.food = 0;
        resourcesRquiredPerSecond.wood = 0;
        resourcesRquiredPerSecond.gold = 0;
        resourcesRquiredPerSecond.stone = 0;
        for(const unit of productionPortfolio){
            resourcesRquiredPerSecond.food += (unit.foodCost / unit.timeCost);
            resourcesRquiredPerSecond.wood += (unit.woodCost / unit.timeCost);
            resourcesRquiredPerSecond.gold += (unit.goldCost / unit.timeCost);
            resourcesRquiredPerSecond.stone += (unit.stoneCost / unit.timeCost);
        }
    }
}

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
    mostrarCantidadDeAldeanos: function() {
        foodRequired.innerHTML = (`${villagerDistribution.food}`);
        woodRequired.innerHTML = (`${villagerDistribution.wood}`);
        goldRequired.innerHTML = (`${villagerDistribution.gold}`);
        stoneRequired.innerHTML = (`${villagerDistribution.stone}`);
        totalRequired.innerHTML = (`<b>${villagerDistribution.food+villagerDistribution.wood+villagerDistribution.gold+villagerDistribution.stone}</b>`);
    }
}

// declaro la cartera de produccion donde se van a agregar las opcciones elegidas de unidades
let productionPortfolio = [];

//funcion que actualiza el calculo de aldeanos y lo refleja en el HTML
newProductionPortfolio = function(){
    productionPortfolio = [];
    for(unit of unitsList){
        Q = document.querySelector(`.unidades__${unit.name}-q`);
        if(Q.value === ""){
            Q.value = 0;
        }
        for(i = 1; i <= `${parseInt(Q.value)}` ; i++){
            productionPortfolio.push(unit);
        }
    }
    resourcesRquiredPerSecond.calcularResourcesRquiredPerSecond();
    villagerDistribution.calularCantidadDeAldeanos();
    villagerDistribution.mostrarCantidadDeAldeanos();
}

// constructor de unidades (DATO)
class Unit {
    constructor(name, timeCost, foodCost, woodCost, goldCost, stoneCost){
        this.name = name;
        this.timeCost = timeCost;
        this.foodCost = foodCost;
        this.woodCost = woodCost;
        this.goldCost = goldCost;
        this.stoneCost = stoneCost;
        this.image = `./Resources/${name}.webp`
    }
}

let unitsList = [
    archer = new Unit (`archer`,35,0,25,45,0),
    batteringRam = new Unit (`batteringRam`,36,0,160,75,0),
    bombardCannon = new Unit (`bombardCannon`,57,0,225,225,0),
    camel = new Unit (`camel`,22,55,0,60,0),
    cavalryArcher = new Unit (`cavalryArcher`,34,0,40,70,0),
    eagleWarrior = new Unit (`eagleWarrior`,35,25,0,50,0),
    handCannoneer = new Unit (`handCannoneer`,34,45,0,50,0),
    knight = new Unit (`knight`,30,60,0,75,0),
    scoutCavalry = new Unit (`scoutCavalry`,30,80,0,0,0),
    mangonel = new Unit (`mangonel`,46,0,160,135,0),
    monk = new Unit (`monk`,51,0,0,100,0),
    scorpion = new Unit (`scorpion`,30,0,75,75,0),
    skirmisher = new Unit (`skirmisher`,22,25,35,0,0),
    spearman = new Unit (`spearman`,22,35,25,0,0),
    swordsman = new Unit (`swordsman`,22,60,0,20,0),
    trebuchet = new Unit (`trebuchet`,50,0,200,200,0),
    villager = new Unit (`villager`,25,50,0,0,0),
    elephant = new Unit (`elephant`,24,120,0,70,0),
    
];

// creacion del HTML con sus eventos
for(const unit of unitsList){
    const unitDiv = document.createElement(`div`);
    unitDiv.classList.add(`unidades__${unit.name}`);
    unitDiv.classList.add(`unidades__div`);

    const unitImg = document.createElement(`img`);
    unitImg.classList.add(`unidades__${unit.name}-imagen`);
    unitImg.classList.add(`unidades__div-imagen`);
    unitImg.src = unit.image;
    unitImg.onclick = ()=>{
        if(unitAmount.value === ""){
            unitAmount.value = 0;
        }
        unitAmount.value = parseInt(unitAmount.value) + 1;
        newProductionPortfolio()
    };

    const unitName = document.createElement(`p`);
    unitName.innerText = unit.name;

    const unitAmount = document.createElement(`input`);
    unitAmount.type = `number`
    unitAmount.placeholder = `Insert amount`
    unitAmount.classList.add(`unidades__${unit.name}-q`)

    unitDiv.appendChild(unitImg);
    unitDiv.appendChild(unitName);
    unitDiv.appendChild(unitAmount);

    document.querySelector(`.unidades`).appendChild(unitDiv);

    unitAmount.addEventListener("change", newProductionPortfolio)
}

document.addEventListener(`DOMContentLoaded` , newProductionPortfolio)


// se agregan las funcionalidades del localstorage (por ahora son de compromiso para entregar algo)
/* guardar */
let guardar = function(){
    let stringProductionPortfolio = JSON.stringify(productionPortfolio);
    localStorage.setItem(`stringProductionPortfolio`, stringProductionPortfolio)
}
document.querySelector(`.botonGuardar`).addEventListener(`click`, guardar);

/* cargar */
let cargar = function(){
    productionPortfolio = JSON.parse(localStorage.getItem(`stringProductionPortfolio`))
    for(unit of unitsList){
        document.querySelector(`.unidades__${unit.name}-q`).value = productionPortfolio.filter(propiedadNombre => propiedadNombre.name == unit.name).length;
        Q = document.querySelector(`.unidades__${unit.name}-q`);
        if(Q.value === ""){
            Q.value = 0;
        }
        for(i = 1; i <= `${parseInt(Q.value)}` ; i++){
            productionPortfolio.push(unit);
        }
    }
    resourcesRquiredPerSecond.calcularResourcesRquiredPerSecond();
    villagerDistribution.calularCantidadDeAldeanos();
    villagerDistribution.mostrarCantidadDeAldeanos();
}
document.querySelector(`.botonCargar`).addEventListener(`click`, cargar);

/* borrar */
let borrar = function(){
    for(unit of unitsList){
        document.querySelector(`.unidades__${unit.name}-q`).value = 0
    }
    productionPortfolio = [];
    // localStorage.clear();
    newProductionPortfolio();
}
document.querySelector(`.botonBorrar`).addEventListener(`click`, borrar);