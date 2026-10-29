const userRepo = require('../repository/user-repository')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
    async registration(email, password) {
        const candidate = await userRepo.findByEmail(email)
        console.log(candidate)
        if (candidate) {
            throw new Error(
                `Пользователь с почтовым адресом ${email} уже существует`,
            )
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await userRepo.create(email, hashPassword, activationLink)
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`,
        )

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await userRepo.findByActivationLink(activationLink)
        if (!user) {
            throw new Error('Некорректная ссылка активации')
        }
        await userRepo.activate(user.id, activationLink)
    }
}

module.exports = new UserService()
