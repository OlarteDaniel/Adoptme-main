import chai from 'chai';
import supertest from 'supertest';
import logger from '../src/utils/loggers.js';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de Adoptame', ()=>{
    
    describe('Test de usuarios', ()=>{
        let testUserId;
        

        before(async () => {
            const newUser = {
                first_name: 'Test',
                last_name: 'User',
                email: 'testuser@example.com',
                password: 'TestPassword123'
            };

            const response = await requester.post('/api/users').send(newUser);
            testUserId = response.body.payload._id; 

        });
        
        after(async function () {
            if(testUserId){
                const response = await requester.delete(`/api/users/${testUserId}`)
                logger.info(`Se ha eliminado el usuario de prueba`)
            }
        });

        describe('Metodo GET /api/users', ()=>{

            it('Se debería devolver una lista de usuarios', async () => {
                const response = await requester.get('/api/users');

                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.be.an('array');
            });
        });

        describe('Metodo GET /api/users/:uid', ()=>{

            it('Se debería traer un usuario en específico', async () => {
                const response = await requester.get(`/api/users/${testUserId}`);

                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id', testUserId);
            });
    
            it('Se debería devolver un error 404 si el usuario no existe', async()=>{
                const invalidId  = '6732345ea6173f81d3d81432';
                const response = await requester.get(`/api/users/${invalidId }`);
    
                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(404);
                expect(response.body).to.have.property('error','User not found')
            });

        })

        describe('Metodo POST /api/users', () => {
            
            it('Se deberia crear un usuario correctamente', async() =>{
                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'testuser1@example.com',
                    password: 'TestPassword123'
                }
                const response = await requester.post('/api/users').send(newUser);

                expect(response.ok).to.be.equal(true)
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id')

                const userId = response.body.payload._id;
                if (userId) {
                    await requester.delete(`/api/users/${userId}`);
                }
            });

            it('Se deberia devolver un error 400 si los campos estan incompletos', async()=>{
                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    password: 'TestPassword123'
                }
                const response = await requester.post('/api/users').send(newUser);
                expect(response.ok).to.be.equal(false)
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('error','Incomplete values');

            })

        })

        describe('Metodo PUT /api/users/:uid', ()=>{

            it('Se debería actualizar un usuario correctamente', async () => {
                const updatedData = {
                    first_name: 'Daniel',
                    last_name: 'Olarte',
                    email: 'danielolartelamas.663@gmail.com',
                    password: 'UpdatedPassword123'
                };
                const response = await requester.put(`/api/users/${testUserId}`).send(updatedData);

                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'User updated');
            });

            it('Se debería devolver un error 404 si el usuario no existe', async () => {
                const invalidId = '6732345ea6173f81d3d81432';
                const updatedData = {
                    first_name: 'Daniel',
                    last_name: 'Olarte',
                    email: 'danielolartelamas.663@gmail.com',
                    password: 'UpdatedPassword123'
                };
                const response = await requester.put(`/api/users/${invalidId}`).send(updatedData);

                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(404);
                expect(response.body).to.have.property('error', 'User not found');
            });

        });

        describe('Metodo DELETE /api/users/:uid', ()=>{

            it('Se deberia eliminar un usuario correctamente', async() =>{
                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'testuser1@example.com',
                    password: 'TestPassword123'
                }
                const user = await requester.post('/api/users').send(newUser);
                const uid = user.body.payload._id; 

                const response = await requester.delete(`/api/users/${uid}`);

                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'User deleted');
            })

        })

    });

    describe('Test de mascotas', () => {
        let testPetId;

        before(async () => {
            const newPet = {
                name: 'Bobby',
                specie: 'Perro',
                birthDate: '2022-06-15'
            };

            const response = await requester.post('/api/pets').send(newPet);
            testPetId = response.body.payload._id;

        });

        after(async function () {
            if(testPetId){
                const response = await requester.delete(`/api/pets/${testPetId}`)
                logger.info(`Se ha eliminado la mascota de prueba`)
            }
        });


        describe('Metodo GET /api/pets', () => {

            it('Se deberían devolver todas las mascotas', async () => {
                const response = await requester.get('/api/pets');
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.be.an('array');
            });

        });

        describe('Metodo POST /api/pets', () => {

            it('Se debería crear una mascota correctamente', async () => {
                const newPet = {
                    name: 'Bobby',
                    specie: 'Perro',
                    birthDate: '2022-06-15'
                };
                const response = await requester.post('/api/pets').send(newPet);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id');

                const petId = response.body.payload._id;
                if (petId) {
                    await requester.delete(`/api/pets/${petId}`);
                }
            });

            it('Debería devolver error 400 si faltan datos', async () => {
                const newPet = {
                    name: 'Bobby',
                };
                const response = await requester.post('/api/pets').send(newPet);
                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('error', 'Incomplete values');
            });

        });

        describe('Metodo PUT /api/pets/:pid', () => {

            it('Se debería actualizar una mascota correctamente', async () => {
                const updateData = { 
                    name: 'Bobby Updated',
                    specie: 'cat',
                    birthDate: '2022-06-15'
                };
                const response = await requester.put(`/api/pets/${testPetId}`).send(updateData);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'pet updated');
            });

        });

        describe('Metodo DELETE /api/pets/:pid', () => {

            it('Se debería eliminar una mascota correctamente', async () => {
                const response = await requester.delete(`/api/pets/${testPetId}`)
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'pet deleted');
            });

        });
    });

    describe('Test de sesiones',() =>{

        describe('Metodo POST /api/sessions/register', () => {

            it('Se debería registrar un usuario correctamente', async () => {
                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: 'TestPassword123'
                };
                const response = await requester.post('/api/sessions/register').send(newUser);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);

                const userId = response.body.payload;
                if (userId) {
                    await requester.delete(`/api/users/${userId}`);
                }
            });

            it('Debería devolver error 400 si faltan datos', async () => {
                const newUser = { email: 'testuser@example.com' };
                const response = await requester.post('/api/sessions/register').send(newUser);
                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('error', 'Incomplete values');
            });

            it('Deberia devolver error 400 si el usuario ya existe', async() =>{
                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: 'TestPassword123'
                };

                const response = await requester.post('/api/sessions/register').send(newUser);
                const response2 = await requester.post('/api/sessions/register').send(newUser);

                expect(response2.ok).to.be.equal(false);
                expect(response2.status).to.equal(400);
                expect(response2.body).to.have.property('error', 'User already exists');

                const userId = response.body.payload;
                if (userId) {
                    await requester.delete(`/api/users/${userId}`);
                }
            })

        });

        describe('Metodo POST /api/sessions/login', () => {

            it('Se debería iniciar sesión correctamente', async () => {

                const newUser = {
                    first_name: 'Test',
                    last_name: 'User',
                    email: 'testuser@example.com',
                    password: 'TestPassword123'
                };

                const responseCreate =  await requester.post('/api/sessions/register').send(newUser);

                const loginUser = {
                    email: 'testuser@example.com',
                    password: 'TestPassword123'
                };
                const response = await requester.post('/api/sessions/login').send(loginUser);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'Logged in');

                const userId = responseCreate.body.payload;
                if (userId) {
                    await requester.delete(`/api/users/${userId}`);
                }
            });

            it('Debería devolver un error 400 si faltan credenciales', async () => {
                const loginUser = {
                    email: 'testuser@example.com'
                };
                const response = await requester.post('/api/sessions/login').send(loginUser);
                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('error', 'Incomplete values');
            });

            it('Deberia devolver un error 404 si el usuario no existe', async() =>{
                const loginUser = {
                    email: 'testuser@example.com',
                    password: 'TestPassword123'
                };
                const response = await requester.post('/api/sessions/login').send(loginUser);

                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(404);
                expect(response.body).to.have.property('error', "User doesn't exist");
            })

        });
    })

    describe('Test de adopciones', () =>{

        describe('Metodo GET /api/adoptions', () => {
            it('Se debería devolver una lista de adopciones', async () => {
                const response = await requester.get('/api/adoptions');
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.be.an('array');
            });
        });

    })

})