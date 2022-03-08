const foodRequired = document.querySelectorAll(`.recursos__food-texto`)[0];
const woodRequired = document.querySelectorAll(`.recursos__wood-texto`)[0];
const goldRequired = document.querySelectorAll(`.recursos__gold-texto`)[0];
const stoneRequired = document.querySelectorAll(`.recursos__stone-texto`)[0];
const totalRequired = document.querySelectorAll(`.recursos__totales-texto`)[0];

// mejoras economicas (afectan a la recoleccion estimada de recursos por segundo)
class EcoUpgrade {
    constructor(id, resource, name, rate){
        this.id = id;
        this.resource = resource;
        this.name = name;
        this.rate = rate;
        this.img = `./Resources/${resource}${id}.webp`;
    }
}
const allEcoUpgrades = [
    new EcoUpgrade (0,`food`,`None`,0.3383),
    new EcoUpgrade (1,`food`,`Heavy Plow`,0.35),
    new EcoUpgrade (2,`food`,`Wheel Barrow`,0.39),
    new EcoUpgrade (3,`food`,`Hand Cart`,0.40),
    new EcoUpgrade (0,`wood`,`None`,0.41),
    new EcoUpgrade (1,`wood`,`Double Bit Axe`,0.49),
    new EcoUpgrade (2,`wood`,`Bow Saw`,0.59),
    new EcoUpgrade (3,`wood`,`Two Man Saw`,0.65),
    new EcoUpgrade (0,`gold`,`None`,0.38),
    new EcoUpgrade (1,`gold`,`Gold Mining`,0.44),
    new EcoUpgrade (2,`gold`,`Gold Shaft Mining`,0.50),
    new EcoUpgrade (0,`stone`,`None`,0.36),
    new EcoUpgrade (1,`stone`,`Stone Mining`,0.41),
    new EcoUpgrade (2,`stone`,`Stone Shaft Mining`,0.48),
];

// collection rates, niveles de mejora y formulas para modificarlas:
const collectionRates = {
    food: 0.3383,
    wood: 0.41,
    gold: 0.38,
    stone: 0.36
}

let foodEcoUpgrade = 1
let woodEcoUpgrade = 1
let goldEcoUpgrade = 1
let stoneEcoUpgrade = 1

document.querySelector(`.mejorasEconomicas__comida-img`).addEventListener(`click`,() => { // si clickeo la imagen hace las 3 siguientes acciones:
    document.querySelector(`.mejorasEconomicas__comida-img`).setAttribute(`src`,`./Resources/food${foodEcoUpgrade}.webp`) //cambia el atributo de origen de la imagen
    collectionRates.food = allEcoUpgrades.filter(I => I.resource === `food`)[foodEcoUpgrade].rate; // reemplaza el valor de recoleccion de comida por el de la enesima mejora de comida del array de mejoras
    foodEcoUpgrade === allEcoUpgrades.filter(I => I.resource === `food`).length-1 ? foodEcoUpgrade = 0 : foodEcoUpgrade += 1; // aumenta el numero del tracker de mejoras y si estaba en su maximo permitido lo resetea
    newProductionPortfolio()
});
document.querySelector(`.mejorasEconomicas__madera-img`).addEventListener(`click`,() => {
    document.querySelector(`.mejorasEconomicas__madera-img`).setAttribute(`src`,`./Resources/wood${woodEcoUpgrade}.webp`)
    collectionRates.wood = allEcoUpgrades.filter(I => I.resource === `wood`)[woodEcoUpgrade].rate;
    woodEcoUpgrade === allEcoUpgrades.filter(I => I.resource === `wood`).length-1? woodEcoUpgrade = 0 : woodEcoUpgrade += 1;
    newProductionPortfolio()
});
document.querySelector(`.mejorasEconomicas__oro-img`).addEventListener(`click`,() => {
    document.querySelector(`.mejorasEconomicas__oro-img`).setAttribute(`src`,`./Resources/gold${goldEcoUpgrade}.webp`)
    collectionRates.gold = allEcoUpgrades.filter(I => I.resource === `gold`)[goldEcoUpgrade].rate;
    goldEcoUpgrade === allEcoUpgrades.filter(I => I.resource === `gold`).length-1 ? goldEcoUpgrade = 0 : goldEcoUpgrade += 1;
    newProductionPortfolio()
});
document.querySelector(`.mejorasEconomicas__piedra-img`).addEventListener(`click`,() => {
    document.querySelector(`.mejorasEconomicas__piedra-img`).setAttribute(`src`,`./Resources/stone${stoneEcoUpgrade}.webp`)
    collectionRates.stone = allEcoUpgrades.filter(I => I.resource === `stone`)[stoneEcoUpgrade].rate;
    stoneEcoUpgrade === allEcoUpgrades.filter(I => I.resource === `stone`).length-1 ? stoneEcoUpgrade = 0 : stoneEcoUpgrade += 1;
    newProductionPortfolio()
});

// objeto para almacenar requisitos de recursos por segundo
let resourcesRquiredPerSecond = {
    food: 0,
    wood: 0,
    gold: 0,
    stone: 0,
    calculateResourcesRquiredPerSecond: function(){
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
        totalRequired.innerHTML = (`${villagerDistribution.food+villagerDistribution.wood+villagerDistribution.gold+villagerDistribution.stone}`);
    }
}

// declaro la cartera de produccion donde se van a agregar las opcciones elegidas de unidades
let productionPortfolio = [];

//funcion que actualiza el calculo de aldeanos y lo refleja en el HTML
newProductionPortfolio = function(){
    productionPortfolio = []; // vacia el productionPortfolio existente
    for(unit of unitsList){
        let Q = document.querySelector(`.unidades__${unit.name}-q`);
        (Q.value === "" || parseInt(Q.value) < 0) && (Q.value = 0); //arregla campos vacios o con Q <0
        parseInt(Q.value) != 0 //por defecto las imagenes estan oscuras, si Q es >0, se iluminan
            ?document.querySelector(`.unidades__${unit.name}-imagen`).classList.add(`activeImg`)
            :document.querySelector(`.unidades__${unit.name}-imagen`).classList.remove(`activeImg`)
        for(i = 1; i <= `${parseInt(Q.value)}` ; i++){ //agrega al protfolio de produccion una cantidad de unidades igual a Q
            productionPortfolio.push(unit);
        }
    }
    resourcesRquiredPerSecond.calculateResourcesRquiredPerSecond();
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
    militia = new Unit (`militia`,22,60,0,20,0),
    trebuchet = new Unit (`trebuchet`,50,0,200,200,0),
    villager = new Unit (`villager`,25,50,0,0,0),
    elephant = new Unit (`elephant`,24,120,0,70,0),
];

// creacion del HTML con sus eventos
for(const unit of unitsList){
    const unitDiv = document.createElement(`div`); // crea un div por unidad
    unitDiv.classList.add(`unidades__${unit.name}`);
    unitDiv.classList.add(`unidades__div`);

    const unitAmount = document.createElement(`input`); // crea un input por unidad
    unitAmount.type = `number`
    unitAmount.placeholder = `Insert amount`
    unitAmount.classList.add(`unidades__${unit.name}-q`)
    unitAmount.addEventListener("change", newProductionPortfolio) // si cambio el valor, se ejecuta un newProductionPortfolio

    const unitImg = document.createElement(`img`); // crea un img por unidad
    unitImg.classList.add(`unidades__${unit.name}-imagen`);
    unitImg.classList.add(`unidades__div-imagen`);
    unitImg.src = unit.image; // le pone el source que figura como propiedad del objeto
    unitImg.setAttribute(`title`,`${unit.name}`)
    unitImg.onclick = ()=>{ // si clickeo en la imagen se aumenta en 1 al valor del input
        unitAmount.value = parseInt(unitAmount.value) + 1;
        newProductionPortfolio()
    };

    unitDiv.appendChild(unitImg); // agrego la image
    unitDiv.appendChild(unitAmount);

    document.querySelector(`.unidades`).appendChild(unitDiv); // agrego las cosas creadas dinamicamente al div existende de mi HTML
}

document.addEventListener(`DOMContentLoaded` , newProductionPortfolio)


// se agregan las funcionalidades del localstorage (por ahora son de compromiso para entregar algo)
let guardar = function(){
    let stringProductionPortfolio = JSON.stringify(productionPortfolio);
    localStorage.setItem(`stringProductionPortfolio`, stringProductionPortfolio)
}
document.querySelector(`.botonGuardar`).addEventListener(`click`, guardar);

let cargar = function(){
    productionPortfolio = JSON.parse(localStorage.getItem(`stringProductionPortfolio`)) || [];
    for(unit of unitsList){
        document.querySelector(`.unidades__${unit.name}-q`).value = productionPortfolio.filter(propiedadNombre => propiedadNombre.name == unit.name).length;
    }
    newProductionPortfolio()
}
document.querySelector(`.botonCargar`).addEventListener(`click`, cargar);

let borrar = function(){
    for(unit of unitsList){
        document.querySelector(`.unidades__${unit.name}-q`).value = 0
    }
    newProductionPortfolio();
}
document.querySelector(`.botonBorrar`).addEventListener(`click`, borrar);