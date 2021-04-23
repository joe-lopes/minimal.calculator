class CalcController{

    constructor(){
        this.equation = [];
        this.display = document.querySelector("#display");
        this.timeTag = document.querySelector("#time");
        this.initialize();
        this.lastDigit();
        this.lastDigitType();
        
    }

    initialize(){

        this.getTime();

        let interval = setInterval(() =>{
                
                this.getTime();
            
            }, 1000);

        this.initButtons()
    }


    initButtons(){

        var key;

        let buttons = document.querySelectorAll(".row > .btn");

        buttons.forEach((btn, index) => {

            btn.addEventListener("click", () =>{
                
                key = btn.className.replace("btn ", "");

                this.addDigits(key);
            });
           
        });
    }

    addDigits(value){

        switch (this.lastDigitType()) {
            case "number":
                console.log("number");
                if(!isNaN(value)){
        
                        let lastNumber = this.equation.pop() + value.toString();
        
                        this.equation.push(lastNumber);
        
                        this.display.innerHTML = this.lastDigit();
        
                } else {
        
                    this.equation.push(value);
        
                }
                break;

            case "operator":
                console.log("operator");

                if(isNaN(value)){
                       
                    this.equation.pop();
                       
                    this.equation.push(value);

                    break;
                } 
                
        
            case "other":
                
                console.log("other");
                
                this.equation.push(value);

                this.display.innerHTML = this.lastDigit();

                break;
        }
        
        console.log(this.equation);
    
    }


    lastDigit(){
        
        return this.equation[this.equation.length - 1];
    } 

    lastDigitType(){


        if(!isNaN(this.lastDigit())){

            return "number";

        } else if("+" || "-" || "*" || "/"){

            return "operator";
        
        } else {

            return "other";
        }

    }

    //timeSection.js
    getTime(){
        
        let time = new Date();
    
        let nowDate = time.toLocaleDateString("pt-br", {day: "2-digit", month: "short", year: "numeric"});
    
        let nowTime = time.toLocaleTimeString("pt-br");
    
        let fullTime = nowDate +", " + nowTime;
        
        this.timeTag.innerHTML = fullTime;
    }

}