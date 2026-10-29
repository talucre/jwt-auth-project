const jwt = require('jsonwebtoken')
const tokenRepo = require('../repository/token-repository')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: '30d',
        })
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenRepo.findByUserId(userId)
        if (tokenData) {
            return await tokenRepo.updateToken(userId, refreshToken)
        }
        const token = await tokenRepo.create(userId, refreshToken)
        return token
    }
}

module.exports = new TokenService()
