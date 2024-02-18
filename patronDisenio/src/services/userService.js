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

    saveUser = async (user) => {
        try {
            let userSaved = await userModel.create(user);
            console.log("acá estoy")
            return userSaved;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateUser = async (id, user) => {
        try {
            let result = await userModel.updateOne({ _id: id }, { $set: user });
            return result;
        } catch (error) {
            return null;
        }
    }

}