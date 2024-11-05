import prisma from "../prisma";

// Delete User
// Update User
// Get User
// create agent profile

export const getUserById = async(userId)=>{
    const user = await prisma.findUnique({
        where:{
            id:userId
        }
    });
    return user
}

export const updateUserService = async(userId, firstname, lastname) => {
    
    const updatedUser = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            firstName:firstname,
            lastName: lastname
        }
    });
    return updatedUser;
}

export const deactivateUserService = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return null;
    }

    const deleteUser = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            is_active:false
        }
    });
    return deleteUser
}
