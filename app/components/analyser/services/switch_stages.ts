export function switchStages(stage:number){
    switch(stage){
        case 1:
            return {
                "1":true,
                "2":false,
                "3":false
            }
         
        case 2:
            return{
                "1":false,
                "2":true,
                "3":false
            }
        case 3:
            return{
                "1":false,
                "2":false,
                "3":true
            }

    }
}