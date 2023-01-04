import app from "../APIdatabase/app"
import request from 'supertest'
import mongoose from 'mongoose'

const User = require("../APIdatabase/user.models")
const Cookie = require("../APIdatabase/cookies.models")
const VM = require("../APIdatabase/VM.models")

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWRlbnRpZmllciI6IjYzYjQ5OTliODNmNmQ5NmQ5OTMxYWJiMSIsImlhdCI6MTY3MjgzNTQ2OSwiZXhwIjoxNjcyOTIxODY5fQ.hHHDIyXDo8hJYB6f4QCdeml-1ErmYArRotOL15-6hcY';

/* Connect to the database before each test
beforeAll(async () => {
    let db = "mongodb://localhost:27017/aZZure_DB";

    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (!err) {
            console.log("connected to MongoDB server")
        } else {
            console.log("error")
        }
    })
    
    const conSuccess = mongoose.connection
    conSuccess.once('open', _ => {
      console.log('Database connected:', db)
    })
})
*/

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
    })
})

/*
describe("Get user by ID", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Create user", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Update the user's data", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Delete user by ID", () => {
    // TO DO
    test("", async () => {

    })
})

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