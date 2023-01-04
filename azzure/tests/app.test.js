import { app } from '../APIdatabase/app'
import request from 'supertest'
import mongoose from 'mongoose'

const User = require("./user.models")
const Cookie = require("./cookies.models")
const VM = require("./VM.models")

/* Connect to the database before each test */
beforeEach(async () => {
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

/* Close database connection after each test */
afterAll(async () => {
    await mongoose.connection.close()
})


describe("Login user", () => {
    test("should return 200 if the user exists in the database and a cookie had been generated", async () => {
        const response = await request(app).post("/api/users/login").send({username: "toto", passwd: "1234"})
        expect(response.status).toEqual(200)
    })

    test("should return 404 if the user doesn't exist in the database", async () => {
        const response = await request(app).post("/api/users/login").send({username: "admin", passwd: "4475"})
        expect(response.status).toEqual(404)
    })

    test("should return 400 if no user info were given", async () => {
        const response = await request(app).post("/api/users/login").send({})
        expect(response.status).toEqual(400)
    })


})

describe("Verify authetication", () => {
    // TO DO
    test("", async () => {

    })
})

describe("Get all users", () => {
    // TO DO
    test("", async () => {

    })
})

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