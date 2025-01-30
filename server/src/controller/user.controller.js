import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        if (!(name && email && phone && password)) {
            res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        if (phone.length < 10 || phone.length > 10) {
            res.status(400).json({ message: "Phone number must be of 10 digits" })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        if (user) {
            generateToken(user._id, res);
            await user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profilePic:user.profilePic,
                token:user.token,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup", error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            res.status(400).json({ message: "Invalid password" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profilePic:user.profilePic,
            token: user.token,
        });
    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log("Error in logout", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json( req.user );
    } catch (error) {
        console.log("Error in checkAuth from backend", error);
    }
};

// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic } = req.body;
//         const userId = req.user._id;
//         if (!profilePic) {
//             res.status(400).json({ message: "Profile pic is required" });
//         }
//         const uploadResponse = await cloudinary.uploader.upload(profilePic);
//         const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
//         res.status(200).json({ updateUser });
//     } catch (error) {
//         console.log("Error in updateProfile", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        // Upload the profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "profile_pictures", // Optional: Specify a folder
        });
        // Update the user's profile with the new picture URL
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        // Provide a more descriptive error response
        res.status(500).json({ message: "Failed to update profile. Please try again later." });
    }
};