import request from 'supertest'
import server from '../'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

describe('Unit test login api GET(/login)', () => {
    const userCredentials = {
        username: 'user',
        password: '1234'
    }
    afterEach(() => jest.clearAllMocks())

    it("should authenticate user's credential properly", async () => {
       
        User.findOne = jest.fn().mockResolvedValue(userCredentials)
        bcrypt.compare = jest.fn().mockResolvedValue(true)

        const response = await request(server)
        .post('/login')
        .send(userCredentials)

        expect(response.status).toBe(200)
        expect(response.headers['set-cookie']).toBeDefined()
    })

    it("should handle invalid user's credentials properly", async () => {
        User.findOne = jest.fn().mockResolvedValue(null)
        const response = await request(server)
        .post('/login')
        .send({
            username: 'invalid',
            password: 'invalid'
        })

        expect(response.status).toBe(401)
        expect(response.text).toBe('Invalid username or password')
    })

    it('should handle bad request properly', async () => {
        const response = await request(server)
        .post('/login')

        expect(response.status).toBe(400)
        expect(response.text).toBe('Username and password are required')
    })

    it('should handle internal server error properly', async () => {
        User.findOne = jest.fn().mockImplementationOnce(() => {
            throw new Error('MongoDB error')
        })

        const response = await request(server)
        .post('/login')
        .send(userCredentials)

        expect(response.status).toBe(500)
        expect(response.text).toBe('Internal server error')
    })
})

describe('Unit test register api POST(/register)', () => {
    afterEach(() => jest.clearAllMocks())

    const newUser = {
        username: 'username',
        password: '1234'
    }

    it('should register new user properly', async () => {
        User.findOne = jest.fn().mockResolvedValue(null)
        User.create = jest.fn().mockResolvedValue(newUser)
        const response = await request(server)
        .post('/register')
        .send(newUser)

        expect(response.status).toBe(201)
        expect(response.text).toBe('Your account have been created')
    })

    it('should not register conflict username properly', async () => {
        User.findOne = jest.fn().mockResolvedValue(newUser)
        const response = await request(server)
        .post('/register')
        .send(newUser)

        expect(response.status).toBe(409)
        expect(response.text).toBe('Username is already in used')
    })

    it('should handle bad request properly', async () => {
        const response = await request(server)
        .post('/register')

        expect(response.status).toBe(400)
        expect(response.text).toBe('Username and password are required')
    })

    it('should handle internal server error properly', async () => {
        User.findOne = jest.fn().mockImplementationOnce(() => {
            throw new Error('MongoDB error')
        })

        const response = await request(server)
        .post('/register')
        .send(newUser)

        expect(response.status).toBe(500)
        expect(response.text).toBe('Internal server error')

    })
})

describe('Unit test get new token api GET(/access-token)', () => {
    afterEach(() => jest.clearAllMocks())
    it('should handle missing cookies header', async () => {
        const response = await request(server).get('/access-token')

        expect(response.status).toBe(403)
    })

    it('should return an error if ACCESS_TOKEN_KEY or REFRESH_TOKEN_KEY is not set', async () => {
        delete process.env.ACCESS_TOKEN_KEY;
        delete process.env.REFRESH_TOKEN_KEY;

        const response = await request(server).get('/access-token')
        expect(response.status).toBe(500)
        expect(response.text).toBe('Internal server error')
        process.env.ACCESS_TOKEN_KEY = 'validAccessTokenKey';
        process.env.REFRESH_TOKEN_KEY = 'validRefreshTokenKey';
    });

    it('should handle invalid refresh token properly', async () => {
        jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
            callback(new Error('Invalid token'));
        });
        const response = await request(server).get('/access-token')
            .set('Cookie', 'refreshToken=yourRefreshTokenHere')

        expect(response.status).toBe(403)
        expect(response.text).toBe('Invalid refresh token')

    })

    it('should return a new token via cookie', async () => {

        jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
            callback(null, '');
        });
        const response = await request(server).get('/access-token')
            .set('Cookie', 'refreshToken=yourRefreshTokenHere')

        expect(response.status).toBe(200)
        expect(response.headers['set-cookie']).toBeDefined()


    })

})