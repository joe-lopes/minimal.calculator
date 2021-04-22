class CalcController{

    constructor(){
        this.timeTag = document.querySelector("#time");

        this.initialize();
    }

initialize(){

    this.getTime();

    let interval = setInterval(() =>{
            
            this.getTime();
        
        }, 1000);
}

//time section
getTime(){
    
    let time = new Date();

    let nowDate = time.toLocaleDateString("pt-br", {day: "2-digit", month: "short", year: "numeric"});

    let nowTime = time.toLocaleTimeString("pt-br");

    let fullTime = nowDate +", " + nowTime;
    
    this.timeTag.innerHTML = fullTime;
}



}