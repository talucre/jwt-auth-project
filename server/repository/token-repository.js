const db = require('../db')

class TokenRepository {
    async findByUserId(userId) {
        const token = await db('token')
            .select('*')
            .where({ user_id: userId })
            .first()

        return token
    }

    async updateToken(userId, refreshToken) {
        const [updatedToken] = await db('token')
            .where({ user_id: userId })
            .update({ refreshToken })
            .returning('*')

        return updatedToken
    }

    async create(userId, refreshToken) {
        const [token] = await db('token')
            .insert({ user_id: userId, refreshToken })
            .returning('*')

        return token
    }
}

module.exports = new TokenRepository()
