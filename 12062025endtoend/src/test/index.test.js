const request = require('supertest');
const app = require('../index');

describe('CRUD /users', () => {
    let userId;

    it('POST /users - crear usuario', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Juan3', email: 'juan2@example.com' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        userId = res.body.id;
    });

    it('GET /users/:id - obtener usuario', async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Juan3');
    });

    it('PUT /users/:id - actualizar usuario', async () => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Juan3 Updated', email: 'juanupdated@example.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Juan3 Updated');
    });

    it('DELETE /users/:id - eliminar usuario', async () => {
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted');
    });

    it('PATCH /users/:id - solo actualizar email usuario', async () => {
        const userId = 1; // Asegúrate de que este usuario exista en la base de datos
        const newEmail = 'nuevoemail@example.com';

        const res = await request(app)
            .patch(`/users/${userId}`)
            .send({ email: newEmail });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', userId.toString());
        expect(res.body).toHaveProperty('email', newEmail);
    });
}); 