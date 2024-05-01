import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import genTokenAndSetCookie from "../utilities/jwttoken.js";

const saltRounds = 10;

export const signup = (req, res) => {
    const { fullname, username, password } = req.body;

    // Hash the password asynchronously
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let [word1, word2] = fullname.split(" ");

        const Newuser = new User({
            fullname,
            username,
            password: hashedPassword
            // profilePic: Uncomment and add profile picture logic here
        });
        genTokenAndSetCookie(Newuser._id, res)

        Newuser.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({ message: 'Registration successful' });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    });
}

export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        
        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // Generate token and set cookie here
        genTokenAndSetCookie(user._id, res);

        res.status(200).json({  
            _id: user._id,
            fullname: user.fullname,
            username: user.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const signout = (req, res) => {
    try{
        res.cookie("token","", {maxAge : 0});
        res.status(200).json({message: "signed out successful"})
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

