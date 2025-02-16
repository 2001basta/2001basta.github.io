import { Profile } from "./Profile.js"

export class AuthClient {
    constructor() {
        this.credentials = {
            username: '',
            password: ''
        }
        this.jwt = ''
    }

    showError(errorElement, message, duration = 2000) {
        if (errorElement) {
            errorElement.innerText = message
            setTimeout(() => {
                errorElement.innerText = ''
            }, duration)
        }
    }

    setupLoginListener() {
        const loginButton = document.getElementById('button-login')
        const errorElement = document.getElementById('error')

        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                try {
                    const validationError = this.validateCredentials()
                    if (validationError) {
                        this.showError(errorElement, validationError)
                        return
                    }

                    await this.authenticate()
                    const profile = new Profile(this.credentials.username, this.jwt)
                    await profile.initialize()
                    profile.updatePage()
                    
                } catch (error) {
                    this.showError(errorElement, error.message)
                }
            })
        }
    }

    validateCredentials() {
        const usernameInput = document.getElementById('username')
        const passwordInput = document.getElementById('password')

        if (!usernameInput || !passwordInput) {
            return 'Form elements not found'
        }

        if (!usernameInput.value || !passwordInput.value) {
            return 'Please verify your username and password.'
        }

        this.credentials.username = usernameInput.value
        this.credentials.password = passwordInput.value
    }

    async authenticate() {
        const basicAuth = btoa(`${this.credentials.username}:${this.credentials.password}`)

        try {
            const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicAuth}`,
                }
            })

            if (!response.ok) {
                throw new Error('Not authorized. Please verify your username and password.')
            }

            const data = await response.json()
            this.jwt = data
        } catch (error) {
            throw new Error('Authentication failed. Please try again.')
        }
    }
}