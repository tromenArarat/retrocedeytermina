import userModel from '../DAO/models/user.model.js'

export default class User {
    getUsers = async () => {
        try {
            let users = await userModel.find();
            return users;
        } catch (error) {
            console.log('Error al obtener los usuarios: ', error);
            return null;
        }
    }
    getUserById = async (id) => {
        try {
            let user = await userModel.findOne({ _id: id });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    findEmail = async (email) => await userModel.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1, role: 1, cart: 1 }).lean();
    saveUser = async (user) => {
        try {
            let userSaved = await userModel.create(user);
            return userSaved;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    updateUser = async (obj) => await userModel.updateOne({ _id: obj._id }, obj);
    deleteOne = async (id) => {
        let result = await userModel.deleteOne({ _id: id });
        return result;
    }
}