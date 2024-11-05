import { deactivateUserService, getUserById, updateUserService } from "../services/userService"
import { NotFoundError, PermissionDeniedError} from "../utils/error";


export const getUser = async (req, res) => {
    const {userId} = req.param
    const user = await getUserById(userId)

    if (!user) {
        throw new NotFoundError("User not found");
    }
    
    res.status(200).json({
        success: true,
        data: user
    })
}

export const updateUser = async (req, res)=>{
    const {firstname, lastname} = req.body
    const {id} = req.user
    const {userId} = req.params

    if (id !== userId) {
        throw new PermissionDeniedError("You don't have permission to update this user");
        
    }
    const updatedUser = await updateUserService(userId, firstname, lastname)
    if (!updatedUser) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({
        success: true,
        data: updateUser
    })
}

export const deactivateUser = async (req, res) => {
    const {id} = req.user
    const {userId} = req.params

    if (id !== userId) {
        throw new PermissionDeniedError("You don't have permission to update this user");
    }
    const deleteUser = await deactivateUserService(userId)
    if (!deleteUser) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({
        success:true,
        message: "Deactivation Successful"
    })
}