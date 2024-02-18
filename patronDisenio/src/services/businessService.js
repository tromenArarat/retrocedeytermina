import businessModel from '../DAO/models/business.model.js'

export default class Business {

    getBusiness = async () => {
        try {
            let result = await businessModel.find();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getBusinessById = async (id) => {

        try {
            let result = await businessModel.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    saveBusiness = async (business) => {
        try {
            let result = await businessModel.create(business);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateBusiness = async (id, bussiness) => {
        try {
            let result = await businessModel.updateOne({ _id: id }, { $set: bussiness });
            return result;
        } catch (error) {
            return null;
        }
    }

}