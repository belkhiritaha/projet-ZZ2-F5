import app from "../APIdatabase/app"
import request from 'supertest'
import mongoose from 'mongoose'


// The token should change in every connexion
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWRlbnRpZmllciI6IjYzYjYwM2JhMDU5MWEwMjhiOWEyMDhhOSIsImlhdCI6MTY3Mjg3MzE2MiwiZXhwIjoxNjcyOTU5NTYyfQ.f16EUu1TEzY-8rhwCrqt8f3NMDMQrSfAlCkCXTHNndo';

const userTest = {
    "_id": "63b603ba0591a028b9a208a9",
    "username": "test",
    "passwd": "test",
    "listVMs": [],
    "__v": 0
}


const User = require("../APIdatabase/user.models")
const Cookie = require("../APIdatabase/cookies.models")
const VM = require("../APIdatabase/VM.models")


/* Close database connection after each test */ 
afterAll(async () => {
    await mongoose.connection.close()
})


describe("Login user", () => {
    test("should return 200 if the user exists in the database and a cookie had been generated", async () => {
        const response = await request(app)
                                .post("/api/users/login")
                                .send({username: "toto", passwd: "1234"})
        expect(response.status).toEqual(200)
    })

    test("should return 404 if the user doesn't exist in the database", async () => {
        const response = await request(app)
                                .post("/api/users/login")
                                .send({username: "admin", passwd: "4475"})
        expect(response.status).toEqual(404)
    })

    test("should return 400 if no user info were given", async () => {
        const response = await request(app)
                                .post("/api/users/login")
                                .send()
        expect(response.status).toEqual(404)
    })
})

/*
describe("Verify authetication", () => {
    // TO DO
    test("", async () => {

    })
})
*/

describe("GET all users", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .get("/api/users")
        expect(response.status).toEqual(401)
    })

    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .get("/api/users")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()

    })
})


describe("Get user by ID", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .get("/api/users/63b603ba0591a028b9a208a9")
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and return a unique user", async () => {
        const response = await request(app)
                                .get("/api/users/63b603ba0591a028b9a208a9")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    // If the user tries to change the id to access others, his request will be denied
    test("should respond with a 401 status code", async () => {
        const response = await request(app)
                                .get("/api/users/63b603bafgjfg7")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Create user", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .post("/api/users")
                                .send({
                                    username: "test 2",
                                    passwd: "test",
                                })
        expect(response.status).toEqual(201)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "A new user has arrived !"
        })
    })

    test("should respond with a 400 status code", async () => {
        const response = await request(app)
                                .post("/api/users")
                                .send({})
        expect(response.status).toEqual(400)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Update the user's data", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .put("/api/users/63b603ba0591a028b9a208a9")
                                .send({
                                    username: "test 1.2",
                                    passwd: "test",
                                })
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "The data of the user has been modified !"
        })
    })

    test("should respond with a 400 status code", async () => {
        const response = await request(app)
                                .put("/api/users/63b603ba0591a028b908a9")
                                .send({})
        expect(response.status).toEqual(400)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Delete user by ID", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b603ba0591a028b9a208a9")
                                .send({
                                    username: "test 1.2",
                                    passwd: "test",
                                })
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "The user has been deleted !"
        })
    })

    test("should respond with a 400 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b603ba0591a028b908a9")
                                .send({})
        expect(response.status).toEqual(400)
        expect(response.error).not.toBeUndefined()
    })
})

/*
describe("Reset user database", () => {
    // TO DO
    test("", async () => {

    })
})


describe("Verify token", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Get all user's vms", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Get user's vm by ID", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Create new vm", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Update vm", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Delete vm", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Start vm", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Stop vm", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Reset vm database", () => {
    // TO DO
    test("", async () => {

    })
})
*/