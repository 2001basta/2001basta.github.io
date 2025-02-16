import { PageTemplate } from "./PageTemplate.js"
export class Profile {
    constructor(username, jwt) {
        this.username = username;
        this.jwt = jwt;
        this.personalInfo = null;
    }

    async initialize() {
        if (!this.jwt) {
            throw new Error('Authentication token not found');
        }

        try {
            const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.jwt}`,
                },
                body: JSON.stringify({
                    query: `{
                        user {
                            firstName
                            lastName
                            email
                            auditRatio
                            login
                        }
                    }`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            this.personalInfo = data.data.user[0];
        } catch (error) {
            throw new Error('Failed to load profile information');
        }
    }

    updatePage() {
        const home = document.querySelector('.home');
        if (!home || !this.personalInfo) {
            return;
        }

        const template = new PageTemplate(this.personalInfo);
        home.innerHTML = template.render();
        this.applyStyles(home);
    }

    applyStyles(element) {
        Object.assign(element.style, {
            display: 'block',
            width: 'calc(100% - 20px)',
            margin: '0 auto',
            padding: '10px'
        });
    }
}