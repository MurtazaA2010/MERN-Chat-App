import User from "../Models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const users = await User.find({ _id: { $ne: loggedInUser } });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
