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

    async login(req, res, next) {
        try {
        } catch (e) {}
    }

    async logout(req, res, next) {
        try {
        } catch (e) {}
    }

    async activate(req, res, next) {
        const activationLink = req.params.link
        await userService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    }

    async refresh(req, res, next) {
        try {
        } catch (e) {}
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '456'])
        } catch (e) {}
    }
}

module.exports = new UserController()
