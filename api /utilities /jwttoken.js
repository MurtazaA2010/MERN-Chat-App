import jwt from "jsonwebtoken";

const genTokenAndSetCookie = (userId, res)=> {
    const token = jwt.sign({userId}, process.env.JWT || "up60a9RS9AsspdDYG4mvcGLshs59xQ7dYmidSuQNUV8=", {
        expiresIn : "30d"
    }
    ) 

    res.cookie(jwt, token, {
        maxAge : 30*24*60*60*1000,
        httpOnly : true,
        sameSite : "strict",
    })
}

export default genTokenAndSetCookie;
