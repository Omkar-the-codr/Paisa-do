const express = require('express');
const userRouter = require("./user");
const jwt = require(" jsonwebtoken");
const { JWT_SECRET } = require('../config');
const router = express.Router();


const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})
router.use("/user", userRouter);
router.post("/signup", async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user= await User.findOne({
        username: req.body.username
    })

    if(user._id){
        return res.status(411).json({
            message: " Email already taken/ Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req,res)=>{
    const{ success}=signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: " Error while loggin in"
    })
})
module.exports = router;