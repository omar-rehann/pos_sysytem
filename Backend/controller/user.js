import usermodel from "../modules/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import mangermodel from "../modules/manger.js";

// Create Token
const createtoken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );
};
// Login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const existemial = await usermodel.findOne({ email }) || await mangermodel.findOne({ email });

        if (!existemial) {
            return res.status(401).json({
                success: false,
                message: "Email Not Found",
            });
        }

        const match = await bcrypt.compare(
            password,
            existemial.password
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Password Not Matching",
            });
        }

        const logintoken = createtoken(existemial._id);

        return res.json({
            success: true,
            logintoken,
            user: {
                _id: existemial._id,
                name: existemial.name,
                email: existemial.email,
                role: existemial.role,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Register
const Register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const existemial = await usermodel.findOne({ email });

        if (existemial) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const userfact = new usermodel({
            name,
            email,
            password: hashpassword,
        });

        await userfact.save();

        const logintoken = createtoken(userfact._id);

        return res.status(201).json({
            success: true,
            logintoken,
            user: {
                _id: userfact._id,
                name: userfact.name,
                email: userfact.email,
                role: userfact.role,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// show user
const showuser = async(req, res) => {
        const users = await usermodel.find({});
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "Not User Found Form Delete ",
            });
        }
        return res.status(200).json({
            success: true,
            user: users,
        });

    }
    // delete user
const deleteusermodel = async(req, res) => {
    const { id } = req.params;
    const alluser = await usermodel.findByIdAndDelete(id);
    if (!alluser) {
        return res.status(404).json({
            success: false,
            message: "Not User Found Form Delete ",
        });
    }
    await usermodel.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
}

export { login, Register, deleteusermodel, showuser };