import UserDao from "../dao/userDao.js"; 

class UserRepository {
    async createUser(userData) {
        return await UserDao.save(userData); 
    }

    async getUserById(id) {
        return await UserDao.findById(id); 
    }

    async getUserByEmail(email) {
        return await UserDao.findOne({email: email}); 
    }
    async findOne(query){
        return await UserDao.findOne(query);
    }

}

export default  new UserRepository(); 