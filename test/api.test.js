const server = require("../server");
const request = require('supertest');
const _Expression = require("../utils/expressions")


describe("api.js", () => {

    describe("get/setExpression", () => {

        let data = [
            {
                "uid":"E11",
                "expr":"4x+20z"
            },
            {
                "uid":"E11",
                "expr":"4##$$+205%%asd"
            }
        ];

        it("should set an expression with correct the uid and correct expr", async () => {
            await request(server)
            .get("/setExpression")
            .query(data[0])
            .expect('Content-Type', /json/)
            .expect(200);
        });
        
        it("should set an expression with the correct uid and incorrect expr", async () => {
            await request(server)
            .get("/setExpression")
            .query(data[1])
            .expect('Content-Type', /json/)
            .expect(422);
        });

    })

    describe("get/getAll", () => {

        it("should return list of expression with uid", async () => {
            await request(server)
            .get("/getAll")
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });
    
    describe("get/substituteVariable", () => {

        it("should substitute a variable with proper key and value", async () => {
          await request(server)
            .get("/substituteVariable")
            .query({ key: 'x', value: "1", uid: "E00" })
            .expect('Content-Type', /json/)
            .expect(200);
        });

        it("should NOT substitute a variable with an improper key", async () => {
            await request(server)
            .get("/substituteVariable")
            .query({ key: 'k', value: "1", uid: "E00" })
            .expect('Content-Type', /json/)
            .expect(422);
        });

        it("expect value to be a number only", async () => {
            await request(server)
            .get("/substituteVariable")
            .query({ key: 'x', value: "a", uid: "E00" })
            .expect('Content-Type', /json/)
            .expect(422);
        });

        it("incorrect UID", async () => {
            await request(server)
            .get("/substituteVariable")
            .query({ key: 'x', value: "1", uid: "A123" })
            .expect('Content-Type', /json/)
            .expect(422);
        });

    });

})