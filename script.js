
//SELECT 

 // Objeto con todas las marcas de coches
 const carBrands = {
    toyota: "Toyota",
    ford: "Ford",
    honda: "Honda",
    bmw: "BMW",
    audi: "Audi",
    subaru:"Subaru",
    abarth:"Abarth",
    alfaRomeo: "Alfa Romeo",
    astonMartin: "Aston Martin",
    bentley:"Bentley",
    chevrolet:"Chevrolet",
    citroen:"Citroen",
    dacia:"Dacia",
    ds:"DS",
    ferrari:"Ferrari",
    fiat:"Fiat",
    hyundai:"Hyundai",
    infiniti:"Infiniti",
    jaguar:"Jaguar",
    jeep:"Jeep",
    kia:"Kia",
    lamborguini:"Lamborguini",
    landRover:"Land Rover",
    lexus:"Lexus",
    maserati:"Maserati",
    mazda:"Mazda",
    mercedes:"Mercedes",
    mini:"Mini",
    mitsubishi:"Mitsubishi",
    nissan:"Nissan",
    opel:"Opel",
    peugeot:"Peugeot",
    porsche:"Porsche",
    renautl:"Renault",
    rollsRoyce: "Rolls-Royce",
    seat:"Seat",
    skoda:"Skoda",
    smart:"Smart",
    suzuki:"Suzuki",
    tesla:"Tesla",
    volkswagen:"Volkswagen",
    volvo:"Volvo"

    
};


// Referencia al elemento select
const carBrandSelect = document.getElementById('carBrand');

// Obtener las claves (marcas de coches) del objeto y ordenarlas alfabéticamente
const sortedCarBrands = Object.keys(carBrands).sort();

// Añadir opciones al select en orden alfabético
sortedCarBrands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = carBrands[brand];
    carBrandSelect.appendChild(option);
});


document.addEventListener("DOMContentLoaded", function() {
    const parkingLot = document.querySelector('.parking-lot');
    const parkingForm = document.getElementById('parkingForm');

    const carBrandImages = {
        toyota: 'url(./img/marcas/toyota.png)',
        ford: 'url(./img/marcas/ford.png)',
        honda: 'url(./img/marcas/honda.png)',
        bmw: 'url(./img/marcas/bmw.png)',
        audi: 'url(./img/marcas/audi.png)',
        subaru:'url(./img/marcas/subaru.png)',
        abarth:'url(./img/marcas/abarth.png)',
        alfaRomeo: 'url(./img/marcas/alfaRomeo.png)',
        astonMartin: 'url(./img/marcas/astonMartin.png)',
        bentley:'url(./img/marcas/bentley.png)',
        chevrolet:'url(./img/marcas/chevrolet.png)',
        citroen:'url(./img/marcas/citroen.png)',
        dacia:'url(./img/marcas/dacia.png)',
        ds:'url(./img/marcas/ds.png)',
        ferrari:'url(./img/marcas/ferrari.png)',
        fiat:'url(./img/marcas/fiat.png)',
        hyundai:'url(./img/marcas/hyundai.png)',
        infiniti:'url(./img/marcas/infinit.png)',
        jaguar:'url(./img/marcas/jaguar.png)',
        jeep:'url(./img/marcas/jeep.png)',
        kia:'url(./img/marcas/kia.png)',
        lamborguini:'url(./img/marcas/lamborguini.png)',
        landRover:'url(./img/marcas/landRover.png)',
        lexus:'url(./img/marcas/lexus.png)',
        maserati:'url(./img/marcas/maserati.png)',
        mazda:'url(./img/marcas/mazda.png)',
        mercedes:'url(./img/marcas/mercedes.png)',
        mini:'url(./img/marcas/mini.png)',
        mitsubishi:'url(./img/marcas/mitsubishi.png)',
        nissan:'url(./img/marcas/nissan.png)',
        opel:'url(./img/marcas/opel.png)',
        peugeot:'url(./img/marcas/peugeot.png)',
        porsche:'url(./img/marcas/porsche.png)',
        renautl:'url(./img/marcas/renault.png)',
        rollsRoyce: 'url(./img/marcas/rollsRoyce.png)',
        seat:'url(./img/marcas/seat.png)',
        skoda:'url(./img/marcas/skoda.png)',
        smart:'url(./img/marcas/smart.png)',
        suzuki:'url(./img/marcas/suzuki.png)',
        tesla:'url(./img/marcas/tesla.png)',
        volkswagen:'url(./img/marcas/volkswagen.png)',
        volvo:'url(./img/marcas/volvo.png)'
    };

    // Generar las plazas de aparcamiento
    for (let i = 1; i <= 20; i++) {
        const parkingSpace = document.createElement('div');
        parkingSpace.classList.add('parking-space');
        parkingSpace.dataset.available = 'true'; // Indica si la plaza está disponible
        parkingSpace.dataset.licensePlate = ''; // Almacena la matrícula del vehículo
        parkingSpace.dataset.index = i; // Almacena el número de la plaza
        parkingSpace.style.backgroundColor = 'rgb(129, 194, 114)'; // Color inicial verde para indicar que está disponible
        parkingSpace.style.color = 'white';

        const parkingLabel = document.createElement('span');
        parkingLabel.textContent = `${i}`;
        parkingLabel.classList.add('parking-label');

        parkingSpace.appendChild(parkingLabel);

        parkingSpace.addEventListener('click', function(event) {
            if (event.button === 0) {
                toggleParkingSpace(parkingSpace);
            }
        });

        parkingSpace.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            releaseParkingSpace(parkingSpace);
        });

        parkingLot.appendChild(parkingSpace);
    }

    // Función para liberar una plaza de aparcamiento
    function releaseParkingSpace(space) {
        if (space.dataset.available === 'false') {
            space.style.backgroundColor = "rgb(129, 194, 114)"; // Cambiar el color de fondo a verde
            space.style.color = "white";
            space.dataset.available = 'true';
            space.dataset.licensePlate = ''; // Borrar la matrícula
            const parkingLabel = space.querySelector('.parking-label');
            parkingLabel.textContent = `${space.dataset.index}`; // Restaurar el número de la plaza
            space.style.backgroundImage = ''; // Limpiar la imagen de fondo
            alert(`Plaza ${space.dataset.index} libre.`);
            saveParkingData();
        } else {
            alert(`La plaza ${space.dataset.index} ya está libre.`);
        }
    }

    // Manejar el envío del formulario para guardar la matrícula y la marca en la plaza correspondiente
    parkingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const plaza = parseInt(parkingForm.elements.parkingSpace.value);
        const matricula = parkingForm.elements.licensePlate.value.toUpperCase(); // Convertir la matrícula a mayúsculas
        const carBrand = parkingForm.elements.carBrand.value;
        const parkingSpace = document.querySelector(`.parking-space:nth-child(${plaza})`);

        if (!isNaN(plaza) && plaza >= 1 && plaza <= 20) {
            parkingSpace.dataset.licensePlate = matricula;
            parkingSpace.style.fontSize = '20px';
            parkingSpace.style.backgroundColor = 'red';
            parkingSpace.style.color = 'white';
            parkingSpace.style.backgroundImage = carBrandImages[carBrand]; // Asignar la imagen de fondo según la marca
            const parkingLabel = parkingSpace.querySelector('.parking-label');
            parkingLabel.textContent = `${matricula}`; // Mostrar la matrícula en el label
            parkingSpace.dataset.available = 'false'; // Indicar que la plaza está ocupada

            alert(`Matrícula "${matricula}" asignada a la Plaza ${plaza}.`);
            saveParkingData();
        } else {
            alert('Número de plaza no válido.');
        }
        parkingForm.reset();
    });

    // Guardar el estado de las plazas de aparcamiento en localStorage
    function saveParkingData() {
        const parkingData = [];
        document.querySelectorAll('.parking-space').forEach(space => {
            parkingData.push({
                index: space.dataset.index,
                available: space.dataset.available,
                licensePlate: space.dataset.licensePlate,
                backgroundImage: space.style.backgroundImage,
                backgroundColor: space.style.backgroundColor
            });
        });
        localStorage.setItem('parkingData', JSON.stringify(parkingData));
    }

    // Cargar el estado de las plazas de aparcamiento desde localStorage
    function loadParkingData() {
        const parkingData = JSON.parse(localStorage.getItem('parkingData'));
        if (parkingData) {
            parkingData.forEach(data => {
                const space = document.querySelector(`.parking-space:nth-child(${data.index})`);
                space.dataset.available = data.available;
                space.dataset.licensePlate = data.licensePlate;
                space.style.backgroundImage = data.backgroundImage;
                space.style.backgroundColor = data.backgroundColor;
                const parkingLabel = space.querySelector('.parking-label');
                parkingLabel.textContent = data.licensePlate ? data.licensePlate : data.index;
            });
        }
    }

    // Cargar los datos al inicio
    loadParkingData();

    // Cambiar el color de fondo de las casillas sin matrícula a verde al cargar la página
    document.querySelectorAll('.parking-space').forEach(function(space) {
        if (!space.dataset.licensePlate) {
            space.style.backgroundColor = 'rgb(129, 194, 114)';
        }
    });
});