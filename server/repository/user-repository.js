const db = require('../db')

class UserRepository {
    async findByEmail(email) {
        const user = await db('user')
            .select('id')
            .where({ email: email.trim().toLowerCase() })
            .first()

        return user || null
    }

    async create(email, password, activationLink) {
        const [user] = await db('user')
            .insert({ email, password, activationLink })
            .returning('*')

        return user
    }
}

module.exports = new UserRepository()
