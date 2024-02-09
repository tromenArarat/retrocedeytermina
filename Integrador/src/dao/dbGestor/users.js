import {usersModel} from '../models/users.model.js'

export default class Users {
    constructor() {
        console.log(`Trabajando en << users >> con base de datos persistiendo en MongoDB`)
    }
    getAll = async () => {
        let users = await usersModel.find().lean();
        return users
    }
    
    saveUser = async (user) => {
        let result = await usersModel.create(user);
        return result;
    }
    //getOne = async (email, password) => await usersModel.find({ email: email, password: password });

    getOne = async (id) => await usersModel.findById(id);

    findEmail = async (email) => await usersModel.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1 }).lean();

    existEmail = async (email, password) => await usersModel.exists({ email: email });

    updateUser = async (obj) => await usersModel.updateOne({ _id: obj._id }, obj);

    existEmailPass = async (email, password) => await usersModel.exists({ email: email, password: password });

    //createOne = async (obj) => await (this.existEmail(obj.email)) ? null : userModel.create(obj);
    createOne = async (obj) => await usersModel.create(obj);
}