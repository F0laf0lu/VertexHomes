import { getUserById, updateUserService, deactivateUserService } from "../services/userService.js";
import { NotFoundError, PermissionDeniedError } from "../utils/error.js";


export const getUser = async (req, res) => {
    const { id } = req.user;
    const user = await getUserById(id);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    res.status(200).json({
        status: "success",
        data: user,
    });
};


export const updateUser = async (req, res) => {
    const { firstname, lastname } = req.body;
    const { id } = req.user;
    const { userId } = req.params;

    if (id !== userId) {
        throw new PermissionDeniedError("You don't have permission to update this user");
    }

    const updatedUser = await updateUserService(userId, firstname, lastname);
    if (!updatedUser) {
        throw new NotFoundError("User not found");
    }

    res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
    });
};


export const deactivateUser = async (req, res) => {
    const { id } = req.user; 
    const { userId } = req.params;

    if (id !== userId) {
        throw new PermissionDeniedError("You don't have permission to deactivate this user");
    }

    const deactivatedUser = await deactivateUserService(userId);
    if (!deactivatedUser) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({
        status: "success",
        message: "User deactivated successfully",
    });
};
