const {response} = require('express')
const request = require('supertest');
//const expect = require('matchers')
let server

const User = require("../models/User")



describe('user', () => {
    beforeEach(() => {
        server = require("../index")
    })
    afterEach(() => {
        server.close()
        User.collection.deleteMany()
    });

  describe("Post /register", () => {
    const validUser = {
        firstName : "joud",
        lastName : "Jad",
        phone_Number: 25987456,
        date_Birth: "01/04/19940",
        email : "joud@gmail.com",
        password : "123456"
    }

    //Debug    
    it("should return status 500 if input is Empty ", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"", lastName:"", phone_Number:"", email:"", password:""})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(500);
            
    })

    it("should return status 500 if input is Empty ", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"", lastName:"jad", phone_Number:25987456, date_Birth:"12/04/1999", email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(500);
    })

    it("should return status 500 if input is Empty ", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"", phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})

            .set({Accpet: "Application/json"})
            expect(response.status).toBe(500)
           // expect(response.body).toMatchObject(})
    })
    it("should return status 500 if input is Empty ", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: ""})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(500);
    })
    it("should return status 401 if Invalid firstname entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud/", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
            
    })

    it("should return status 401 if Invalid firstname entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Jo ud", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid firstname entered", async() => {
        const response = await request(server)
        .post('/register')
            .send({firstName:"Joud5", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})

            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })

    it("should return status 401 if Invalid lastName entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad/",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
            
    })

    it("should return status 401 if Invalid lastName entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"ja d",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid lastName entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad5",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})

            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })

    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "jou/d@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "jo ud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })
   
    it("should return status 401 if Invalid email entered", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "joud$@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401);
    })

    it("should return status 401 if the Password is too short", async() => {
        const response = await request(server)
        .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(401)
    })

    it("should return status 401 if the email alredy exixtes", async() => {
        
        await request(server)
        .post('/api/auth/register')
            .send({validUser})
            .set({Accpet: "Application/json"})
    
       const response = await request(server)
       .post('/api/auth/register')
            .send({validUser})
            .set({Accpet: "Application/json"})
            
            expect(response.status).toBe(401)
        
    })

    it("should return status 401 if the phone number alredy exixtes", async() => {
        
        await request(server)
        .post('/api/auth/register')
            .send({validUser})
            .set({Accpet: "Application/json"})
    
       const response = await request(server)
       .post('/api/auth/register')
            .send({firstName:"Houda", lastName:"Mes", phone_Number:25987456, date_Birth:" 25/02/1994",email: "houda@gmail.com", password: "houda123"})
            .set({Accpet: "Application/json"})
            
            expect(response.status).toBe(500)
        
    })
    it("should return status 200 if sign UP successful", async() => {
        const response = await request(server)
            .post('/api/auth/register')
            .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200)
            
    })
    it("should return status 200 if sign UP successful", async() => {
        const response = await request(server)
            .post('/api/auth/register')
            .send({firstName:"Houda", lastName:"Mes",phone_Number:"26987456", date_Birth:" 25/03/1994",email: "hou_da@gmail.com", password: "houda123"})
            .set({Accpet: "Application/json"})
            expect(response.status).toBe(200)
    })


})


describe("Post /login", () => {
    const validUser = {
        firstName : "joud",
        lastName : "Jad",
        phone_Number: 25987456,
        date_Birth: "01/04/19940",
        email : "joud@gmail.com",
        password : "123456"
    }
    //Debug
    it("should return status 400 if input is empty", async() => {
       
        await request(server)
        .post('/api/auth/register')
        .send({validUser})
        .set({Accpet: "Application/json"})        
        const response = await request(server)
        .post('/api/auth/login')
        .send({email:"", password:""})
        .set({ Accpet: "Application/json"})
        expect(response.status).toBe(500);
    })
    it("should return status 500, if email message  is not exist ", async() => {
        await request(server)
            .post('/api/auth/register')
            .send({validUser})
            .set({Accpet: "Application/json"})
       const response = await request(server)
            .post("/api/auth/login")
            .send({email:" jjj@exemple.com", password:validUser.password})
            .set({Accpet: "Application/json"})
           // console.log(response)
            expect(response.status).toBe(500)
            

             
     });
     it("should return status 400 , if password is not correct", async() => {
         await request(server)
              .post('/api/auth/register')
              .send({validUser})
              .set({Accpet: "Application/json"})
         const response = await request(server)
              .post("/api/auth/login")
              .send({email: "joud@gmail.com", password:"142365"})
              expect(response.status).toBe(400);  
              
      });
      it("should return status 200 if email and password are correct", async() =>{
         await request(server)
              .post('/api/auth/register')
              .send({firstName:"Joud", lastName:"jad",phone_Number:25987456, email: "joud@gmail.com", password: "joud123"})
              .set({Accpet: "Application/json"})
 
         const response = await request(server)
              .post("/api/auth/login")
              .send({email:"joud@gmail.com", password:"123456"})
              //console.log(response)
              
              expect(response.status).toBe(200);
              
      })
   })

})