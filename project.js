const form=document.getElementById("car-form");
const titleElement=document.querySelector("#title");
const priceElement=document.querySelector("#price");
const urlElement=document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-cars");



//UI objesini başlatma
const ui=new UI();
const storage=new Storage();

//tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);

    document.addEventListener("DOMContentLoaded",function(){
        let cars=storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardBody.addEventListener("click",deleteCar);

    clear.addEventListener("click",clearAllCars);

}

function addCar(e){
    e.preventDefault();
    
    const title=titleElement.value;
    const price=priceElement.value;
    const url=urlElement.value;

    if (title=== "" || price=== "" || url=== ""){
        ui.displayMessages("tüm alanları doldur..","danger");
    }
    else{
        //yeni araç
        const newCar=new Car(title,price,url);
        ui.addCarToUI(newCar);//arayüze araç ekleme

        storage.addCarToStorage(newCar);

        ui.displayMessages("araç başarıyla eklendi..","success");
    }
    ui.clearInputs(titleElement,urlElement,priceElement);
    
}

function deleteCar(e){
    if(e.target.id==="delete-car"){
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("silme işlemi başarılı..","success");
    }
}

function clearAllCars(){
    if(confirm("tüm araçlar silinecek emin misin daa")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
}