import pool from '../utils/connection';

class UsuarioModelo {
    public async list() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT u.email, u.password, u.role FROM tbl_usuario u"
            );
        });
        return result;
    }

    public async add(usuario: any) {
        // Validar que no exista un usuario con el mismo email
        const existingUser = await this.findByEmail(usuario.email);
        if (existingUser.length > 0) {
            throw new Error('Ya existe un usuario con este email.');
        }

        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
        });
        return result;
    }

    public async update(usuario: any) {
        // Validar que el usuario exista antes de actualizar
        const existingUser = await this.findByEmail(usuario.email);
        if (!existingUser) {
            throw new Error('El usuario no existe.');
        }

        const updateQuery = "UPDATE tbl_usuario SET password = ? WHERE email = ?";
        const result = await pool.then(async (connection) => {
            return await connection.query(updateQuery, [usuario.password, usuario.email]);
        });
        return result;
    }

    public async delete(email: string) {
        // Validar que el usuario exista antes de eliminar
        const existingUser = await this.findByEmail(email);
        if (!existingUser) {
            throw new Error('El usuario no existe.');
        }

        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
        });
        return result;
    }

    private async findByEmail(email: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query("SELECT * FROM tbl_usuario WHERE email = ?", [email]);
        });
        return result;
    }
}

const model = new UsuarioModelo();
export default model;