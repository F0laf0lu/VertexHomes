import prisma from "../prisma.js";


export const getUserById = async(userId)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            is_active: true,
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
