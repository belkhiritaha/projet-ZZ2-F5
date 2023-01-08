import app from "../APIdatabase/app"
import request from 'supertest'
import mongoose from 'mongoose'


// The token should change in every connexion
//
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWRlbnRpZmllciI6IjYzYjc0OTQ3ZTYyNzZmMmQ4NGUzNWE4OSIsImlhdCI6MTY3MzIwNDE4MCwiZXhwIjoxNjczMjkwNTgwfQ.9Dq0WrPqTP1vDXHhS8DrZQm6y1lhWCmmYivylXs_aIU";

/* Close database connection after each test */ 
afterAll(async () => {
    await mongoose.connection.close()
})


describe("Login user", () => {
    test("should return 200 if the user exists in the database and a cookie had been generated", async () => {
        const response = await request(app)
                                .post("/api/users/login")
                                .send({username: "abcd", passwd: "abcd"})
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
                                .get("/api/users/63b74947e6276f2d84e35a89")
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and return a unique user", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89")
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
                                .put("/api/users/63b74947e6276f2d84e35a89")
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
                                .put("/api/users/63b74947e62764e35a89")
                                .send({})
        expect(response.status).toEqual(400)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Get all user's vms", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89/vms")
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and returns the vm's list", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89/vms")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    // If the user tries to change the id to access others, his request will be denied
    test("should respond with a 401 status code : userID don't exist", async () => {
        const response = await request(app)
                                .get("/api/users/63b603bafgjfg7")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Get user's vm by ID", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f")
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and returns the vm's list", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 404 status code : vm don't exist", async () => {
        const response = await request(app)
                                .get("/api/users/63b74947e6276f2d84e35a89/vms/63b752ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(404)
        expect(response.error).not.toBeUndefined()
    })

    test("should respond with a 401 status code : userID doesn't exist", async () => {
        const response = await request(app)
                                .get("/api/users/63b603bafgjfg7/vms/63b752ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Create new vm", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms")
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "New vm",
                                })
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 201 status code and creates a new vm", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "New vm",
                                })
        expect(response.status).toEqual(201)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 401 status code : UserID not found", async () => {
        const response = await request(app)
                                .post("/api/users/63b749f2d84e35a89/vms")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send()
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Update vm", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .put("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f")
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm",
                                })
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and returns the vm's list", async () => {
        const response = await request(app)
                                .put("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm",
                                })
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 404 status code : vm doesn't exist", async () => {
        const response = await request(app)
                                .put("/api/users/63b74947e6276f2d84e35a89/vms/63b77af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm",
                                })
        expect(response.status).toEqual(404)
        expect(response.error).not.toBeUndefined()
    })

    test("should respond with a 401 status code : userID don't exist", async () => {
        const response = await request(app)
                                .put("/api/users/63b603bafgjfg7/vms/63b752ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm",
                                })
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Delete vm", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .delete("/api/users/63b74947e6276f2d84e35a89/vms/63b753d25f9d368be838afca")
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b74947e6276f2d84e35a89/vms/63b753d25f9d368be838afca")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 404 status code : vm doesn't exist", async () => {
        const response = await request(app)
                                .delete("/api/users/63b74947e6276f2d84e35a89/vms/63b77af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(404)
        expect(response.error).not.toBeUndefined()
    })

    test("should respond with a 401 status code : userID don't exist", async () => {
        const response = await request(app)
                                .delete("/api/users/63b603bafgjfg7/vms/63b752ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Start vm", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f/start")
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm started",
                                })
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and returns the vm's list", async () => {
        const response = await request(app)
                                .put("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm started",
                                })
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 404 status code : vm doesn't exist", async () => {
        const response = await request(app)
                                .put("/api/users/63b74947e6276f2d84e35a89/vms/63b77af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm started",
                                })
        expect(response.status).toEqual(404)
        expect(response.error).not.toBeUndefined()
    })

    test("should respond with a 401 status code : userID don't exist", async () => {
        const response = await request(app)
                                .put("/api/users/63b603bafgjfg7/vms/63b752ce17af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm started",
                                })
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Stop vm", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f/stop")
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm stopped",
                                })
        expect(response.status).toEqual(401)
    })
    
    test("should respond with a 200 status code and returns the vm's list", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms/63b75277e8a80538ce17af6f/stop")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm stopped",
                                })
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
    })

    test("should respond with a 404 status code : vm doesn't exist", async () => {
        const response = await request(app)
                                .post("/api/users/63b74947e6276f2d84e35a89/vms/63b77af6f")
                                .set('Authorization', `Basic ${TOKEN}`)
                                .send({
                                    name: "Ubuntu-vm",
                                    description: "Modified vm stopped",
                                })
        expect(response.status).toEqual(404)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Reset vm database", () => {
    test("should require authorization", async () => {
        const response = await request(app)
                                .delete("/api/users/63b75480fa0f99d8f59a4586/vms")
        expect(response.status).toEqual(401)
    })

    /*test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b75480fa0f99d8f59a4586/vms")
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "The vm database has been reset !"
        })
    })*/

    test("should respond with a 400 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b75480fa0ff59a4586/vms")
        expect(response.status).toEqual(401)
        expect(response.error).not.toBeUndefined()
    })
})

/*
describe("Delete user by ID", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b74947e6276f2d84e35a89")
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "The user has been deleted !"
        })
    })

    test("should respond with a 400 status code", async () => {
        const response = await request(app)
                                .delete("/api/users/63b603ba0591a0289")
        expect(response.status).toEqual(400)
        expect(response.error).not.toBeUndefined()
    })
})


describe("Reset user database", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app)
                                .delete("/api/users")
        expect(response.status).toEqual(200)
        expect(response.text).not.toBeUndefined()
        expect(response.body).toEqual({
            message: "The user database has been deleted !"
        })
    })
})
*/
