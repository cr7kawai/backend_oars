import { Request, Response } from "express";
import { utils } from "../utils/utils";
import model from "../models/usuario.modelo"; // Asegúrate de importar correctamente tu modelo

class UsuarioController {

  public async list(req: Request, res: Response) {
    try {
      const usuarios = await model.list();
      return res.json({ message: "Listado de Usuario", data: usuarios });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const usuario = req.body;

      const encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;

      const result = await model.add(usuario);

      return res.json({ message: "Usuario agregado correctamente", data: result });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const usuario = req.body;
      console.log(usuario)
      if (usuario.password) {
        const encryptedText = await utils.hashPassword(usuario.password);
        usuario.password = encryptedText;
      }

      const result = await model.update(usuario);

      return res.json({ message: "Usuario actualizado correctamente", data: result });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const result = await model.delete(email);

      return res.json({ message: "Usuario eliminado correctamente", data: result });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}

export const usuarioController = new UsuarioController();