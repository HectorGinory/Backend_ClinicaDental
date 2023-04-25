import Users from './model.js';
export const searchUserById = async (id) => {
    const user = await Users.findOne({ _id: id });
    return user;
};
//# sourceMappingURL=controller.js.map