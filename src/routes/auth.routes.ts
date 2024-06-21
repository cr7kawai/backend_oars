import { Router, RouterOptions } from 'express';

class AuthRoutes{

    //Objeto tipo Router
    public router: Router;

    //Inicializa
    constructor(){

    }

    config(){
        this.router.get('/', (req, res) =>{
            res.send('Invocando Autenticación')
        })
    }
}

const authRoutes = new AuthRoutes;
export default authRoutes.router;