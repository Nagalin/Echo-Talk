import server from '../'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import Chat from '../models/Chat'

describe('Unit test chat controller   GET(/chat/:id)', () => {
    afterEach(() => jest.clearAllMocks())

    const chatId = '1234'
    it('should access a chat', async () => {
        Chat.findOne = jest.fn().mockResolvedValueOnce({
            lastMessage: '1234',
            users: [{ name: 'John Doe' }]
        })
        jwt.verify = jest.fn().mockImplementation((token, key, callback) => {
            callback(null, '');
        });
        const response = await request(server)
        .get(`/chat/${chatId}`)
        .set('Cookie', 'accessToken=mockedToken')

        expect(response.status).toBe(200)
    })

    it('should handle internal error properly', async () => {
        Chat.findOne = jest.fn().mockImplementationOnce(() => {
            throw new Error('MongoDB error')
        })
       
        const response = await request(server)
        .get(`/chat/${chatId}`)
        .set('Cookie', 'accessToken=mockedToken')

        expect(response.status).toBe(500)
        expect(response.text).toBe('Internal server error')
    })
})

describe('Unit test fetch chat controller GET(/chat)', () => {
    afterEach(() => jest.clearAllMocks())

    const mockedChat = [
        {
            "_id": "65cffe92bf90711477ea56c9",
            "createdAt": "2024-02-17T00:32:18.540Z",
            "updatedAt": "2024-02-17T01:47:02.547Z",
            "lastMessage": {
                "_id": "65d0101604fc708feefb987b",
                "sender": {
                    "_id": "65cdf5e5a55de266b54130c3",
                    "username": "user2",
                    "picName": "image-1707996645424-648326590"
                },
                "reciever": {
                    "_id": "65cdbd24938f2bd49ded461a",
                    "username": "user",
                    "picName": "image-1707982116434-310196438"
                },
                "content": "for real",
                "createdAt": "2024-02-17T01:47:02.259Z",
                "updatedAt": "2024-02-17T01:47:02.259Z",
                "__v": 0
            }
        }
    ]

    it('should fetch chat properly', async () => {
        Chat.find = jest.fn().mockResolvedValueOnce(mockedChat)
        const response = await request(server)
        .get('/chat')
        .set('Cookie', 'accessToken=mockedToken')

        expect(response.status).toBe(200)
    })

    it('should handle chat not found properly', async () => {
        Chat.find = jest.fn().mockResolvedValueOnce([])
        const response = await request(server)
        .get('/chat')
        .set('Cookie', 'accessToken=mockedToken')

        expect(response.status).toBe(404)
    })

    it('should hanle internal error properly', async () => {
        Chat.find = jest.fn().mockImplementationOnce(() => {
            throw new Error('MongoDB error')
        })

        const response = await request(server)
        .get('/chat')
        .set('Cookie', 'accessToken=mockedToken')

        expect(response.status).toBe(500)
        expect(response.text).toBe('Internal server error')
    })
})