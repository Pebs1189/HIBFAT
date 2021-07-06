//import helpers to run test cases
const {getUsers, getUserById} = require('./helper/gets');

// jest.setTimeout(10000);

describe('Testing inside users.test.js', ()=> {
    //get all users, total 7
    test('should return status length of users created in DB (actual: 7)', async () => {
        const url = 'http://localhost:3000/user/';

        await getUsers(url)
            .then(data => {
                expect(data.total).toBe(7);
            }
        );
    });
    
    //get test1 user by id
    test('should return the user test1 from DB', async () => {
        const url = 'http://localhost:3000/user/';
        const id = '60d1a2dfef5b4527f841603c';
        const expected = {
            "uid": "60d1a2dfef5b4527f841603c",
            "nombre": "test1",
            "correo": "test1@cor.com"
        }

        await getUserById(url, id)
            .then(data => {
                expect(data).toEqual(expected);
            }
        );
    }); 

    //get test1 user by an incorrect id
    test('should return an error response with msg: "No es un id válido"', async () => {
        const url = 'http://localhost:3000/user/';
        const id = '60d1a2dfef5b4527f841603x';
        const msg = 'No es un id válido';

        await getUserById(url, id)
            .then(value => expect(value).toBe('Must be a incorrect user id'))
            .catch(err => {
                const msgErr = err.response.data.errors[0].msg;
                expect(msg).toBe(msgErr);
            }
        );
    });
    
});