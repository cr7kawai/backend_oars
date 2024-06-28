import { Request, Response } from "express";
import validator from "validator";
import model from '../models/auth.modelo';
import { utils } from "../utils/utils";


class AuthController{
    public async iniciarSesion(req: Request, res: Response) {
       
        try {
            const {email, password }= req.body;
     
            // verificar que los datos no esten vacios
            if (validator.isEmpty(email.trim()) ||
                validator.isEmpty(password.trim())) {
            return res
                .status(400)
                .json({ message: "Los campos son requeridos", code: 1 });
            }
     
            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
            return res.status(404).json({ message: "El usuario es incorrecto", code: 1 });
            }
            let result = utils.checkPassword(password, lstUsers[0].password);
            result.then((value)=>{
                if(value){
                    return res.json({message: "Autenticación correcta", code: 0});
                }else{
                    return res.json({message: "Password Incorrecto", code: 1});
                }
            })

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}

export const authController = new AuthController();