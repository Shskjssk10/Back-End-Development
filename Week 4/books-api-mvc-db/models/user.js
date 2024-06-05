const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(id, username, email){
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static async createUser(user){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id;`;

        const request = connection.request();
        request.input("username", user.username);
        request.input("email", user.email);

        const result = await request.query(sqlQuery);

        connection.close();
    }

    static async getAllUsers(){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Users`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new User(row.id, row.username, row.email)
        );
    }

    static async getUserById(id){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Users WHERE id = @id`;

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new User(
            result.recordset[0].id,
            result.recordset[0].username,
            result.recordset[0].email
        )
        : null;
    }

    static async deleteUser(id){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; // Indicate success based on affected rows
    }

    static async updateUser(id, updatedUser){
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`; // Parameterized query

        const request = connection.request();
        request.input("id", id);
        request.input("username", updatedUser.username || null); // Handle optional fields
        request.input("email", updatedUser.email || null);

        await request.query(sqlQuery);

        connection.close();

        return this.getUserById(id);
    }

    static async searchUsers(searchTerm) {
        const connection = await sql.connect(dbConfig);
    
        try {
          const query = `
            SELECT *
            FROM Users
            WHERE username LIKE '%${searchTerm}%'
              OR email LIKE '%${searchTerm}%'
          `;
    
            const result = await connection.request().query(query);
            return result.recordset;
        } catch (error) {
            throw new Error("Error searching users"); // Or handle error differently
        } finally {
            await connection.close(); // Close connection even on errors
        }
    }
}

module.exports = User;