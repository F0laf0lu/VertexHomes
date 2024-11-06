import prisma from "../prisma.js";



export const getAgentProfileService = async(agentId)=>{
    const agent = await prisma.agentProfile.findUnique({
        where:{
            id:agentId
        },
        select:{
            id: true,
            location:true,
            agencyName:true,
            license:true
        }
    });

    if (!agent) {
        return null;
    };
    return agent;
}

export const createAgentProfileService = async (userId, license, location, agencyName) => {
    const agentProfile = await prisma.agentProfile.create({
        data: {
            userId, 
            license, 
            location, 
            agencyName
        }
    });
    return agentProfile;
};

export const updateAgentProfileService = async (agentId, license, location, agencyName) => {
    const updatedAgent = await prisma.agentProfile.update({
        where: {
            id:agentId
        },
        data: {
            license, 
            location, 
            agencyName
        }
    });

    if (!updatedAgent) {
        return null;
    }

    return updatedAgent;
};

export const deleteAgentProfileService = async (agentId, userId) => {
    const deleteAgent = await prisma.agentProfile.delete({
        where: {
            id:agentId
        }
    });
    const deleteUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            is_active: false
        }
    });

    return { deleteUser, deleteAgent };
};
