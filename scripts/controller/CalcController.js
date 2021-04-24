class CalcController{

    constructor(){

        this.audio = new Audio("mario.mp3");
        this.equation = [];
        this.display = document.querySelector("#display");
        this.timeTag = document.querySelector("#time");
        this.memory = [];
        this.initialize();
    }

    initialize(){

        this.getTime();

        let interval = setInterval(() =>{
                
                this.getTime();
            
            }, 1000);

        this.initButtons();

        this.initKeyboard();

        this.pasteFromClipboard();
    }

    /*
    
    */ 
    initButtons(){

        var key;

        let buttons = document.querySelectorAll(".row > .btn");

        buttons.forEach((btn, index) => {

            btn.addEventListener("click", () =>{
                
                key = btn.className.replace("btn ", "");

                this.manageKeys(key);

                this.audio.currentTime = 0;

                this.audio.play();

            });
        });
    }

    initKeyboard(){

        document.addEventListener('keyup', k=>{
        
        let pressedKey = k.key; 

        console.log(k);

            switch (k.key) {    
                case "0":   
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.numbers(pressedKey);
                    this.memory = [];
                        break;
                
                case "+":   
                case "-":
                case "*":
                case "/":
                    this.operators(pressedKey);
                    break;
    
                case "Backspace":
                    this.clearLastEntry();
                    break;
    
                case "Escape":
                    this.clearAll();
                    break;
    
                case "%":
                    this.percent();
                    break;
    
                case ".":
                case ",":
                    this.dot();
                    break;
    
                case "=":
                case "Enter":
                    this.getResult();    
                    break;

                case "c":
                    this.copyToClipboard();    
                    break;
            };
        });
    }

    manageKeys(key){

        switch (key) {
            
            case "0":   
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.numbers(key);
                this.memory = [];
                    break;
            
            case "+":   
            case "-":
            case "*":
                case "/":
                this.operators(key);
                break;

            case "CE":
                this.clearLastEntry();
                break;

            case "C":
                this.clearAll();
                break;

            case "%":
                this.percent();
                break;

            case ".":
                this.dot();
                break;

            case "=":
                this.getResult();    
                break;

            default:    
                this.equation.push(key);
        }
    }

    copyToClipboard(){
        
        let input = document.createElement("input");

        input.value = this.display.innerHTML;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    pasteFromClipboard(){

        document.addEventListener("paste", e=>{
                
            let text = e.clipboardData.getData("Text");

            this.display.innerHTML = parseFloat(text);

            console.log("esse é o seu método paste");

        });
    }


    lastEntry(){

        let entry = this.equation[this.equation.length - 1];

        if(!isNaN(entry)){
            
            return "number"

        } else {

            switch (entry) {
                
                case "+": case "-": case "*": case "/":

                    return "operator"
            
                default:
                    
                    return entry;                    
            }
        }
    } 


    numbers(key){

        if(this.lastEntry() == "number") {

            if (!this.memory.length == 0){

                this.equation = [];

                this.equation.push(key);

                this.display.innerHTML = parseFloat(key);

                console.log(this.equation);
                return;

            }
            
            let lastNumber = this.equation.pop() + key;

            this.equation.push(lastNumber);

            this.display.innerHTML = lastNumber;

            
        } else {

            this.equation.push(key);

            this.display.innerHTML = parseFloat(key);

        }
            console.log(this.equation);
            return;
    }

    operators(key){
    
        if(this.equation.length > 2){
                            
            this.getResult();

            this.equation.push(key);

            console.log(this.equation);
            return;
        } 
        
        if(this.lastEntry() == "operator"){
            
            this.equation.pop();
            
            this.equation.push(key);

            console.log(this.equation);
            return;
        } 
        
        this.lastEntry() ?  this.equation.push(key) : false;

        console.log(this.equation);
        return;
    }

    dot(){

        //posição vazia  ou último é operador
        if(this.lastEntry() == null || this.lastEntry() == "operator"){

            this.equation.push("0");

            display.innerHTML = this.equation[this.equation.length - 1];

        }

        //último é número
        if(this.lastEntry() == "number"){

            let decimal = this.equation.pop().toString() + ".";
            
            this.equation.push(decimal);

            display.innerHTML = this.equation[this.equation.length - 1].toString();

        }
    }

    percent(){

        if(!isNaN(this.equation[this.equation.length - 1])){

            this.equation[this.equation.length - 1] /= 100;
            
            display.innerHTML = this.equation[this.equation.length - 1];

            this.memory = [];

        }
    }

    clearAll(){

        this.equation = [];

        this.display.innerHTML = 0;

        this.memory = [];
    }

    clearLastEntry(){

        if(this.equation.length > 2){

            this.equation.pop();

            this.display.innerHTML = this.equation[0];

        } else{
            
            this.clearAll();

        }
    }


    getResult(){
        

            let result;
        
            if(this.equation.length > 2){

                result = eval(this.equation.join(""));

                this.memory = [this.equation[1], this.equation[2]];
                
                console.log("entered equation.length > 2");

            } else if(this.equation.length == 1 || this.memory.length == 2 ){
                    
                this.equation = [this.equation[0], this.memory[0], this.memory[1]];
                    
                console.log("entered equation.length == 1 || this.memory.length == 2")

                result = eval(this.equation.join(""));

            } else if (this.equation.length == 2){

                    console.log("entered equation.length == 2")
                    
                    this.equation.push(this.equation[0]);

                    this.memory = [this.equation[1], this.equation[2]];
                        
                    result = eval(this.equation.join(""));
            }

        this.equation = [result];

        this.display.innerHTML = parseFloat(this.equation.toString());

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