const userService = require('../services/user-service')

class UserController {
    async registration(req, res) {
        const { email, password } = req.body
        const userData = await userService.registration(email, password)

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.json(userData)
    }

    async login(req, res, next) {}

    async logout(req, res, next) {}

    async activate(req, res, next) {
        const activationLink = req.params.link
        await userService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    }

    async refresh(req, res, next) {}

    async getUsers(req, res, next) {
        res.json(['123', '456'])
    }
}

module.exports = new UserController()
