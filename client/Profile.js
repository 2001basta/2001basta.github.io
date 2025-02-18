import { PageTemplate } from "./PageTemplate.js"
import { AuthClient } from "./AuthClient.js";
import { Query } from "./Queries.js"
export class Profile {
    constructor(username, jwt) {
        this.username = username;
        this.jwt = jwt;
        this.personalInfo = null;
        this.allquery = new Query()
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
                    query: "{"
                        + this.allquery.UserInfo
                        + this.allquery.Myxp
                        + this.allquery.Level
                        + this.allquery.Projects
                        + this.allquery.Go_porcentag
                        + this.allquery.Js_porcentage
                        + this.allquery.Checkpoint
                        + this.allquery.Skills
                        + this.allquery.Xp_progress+
                        "}"
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            console.log(data);

            this.personalInfo = data.data.user[0];
            this.personalInfo.Level = data.data.level.aggregate.max.amount
            this.personalInfo.Myxp = data.data.myxp.aggregate.sum.amount
            this.personalInfo.Porjects = data.data.projects.map(proj =>
                proj.path.replace("/oujda/module/", "")
            )
            this.personalInfo.Go_porcentage = (data.data.go_valid_exercise.aggregate.count
                / data.data.go_exercise.aggregate.count).toFixed(2)
            this.personalInfo.Js_porcentage = (data.data.js_valid_exercise.aggregate.count
                / data.data.js_exercise.aggregate.count).toFixed(2)
            this.personalInfo.Checkpoint_porcentage = (data.data.valid_exercise.aggregate.count
                / (data.data.passed_checkpoint.nodes[0].events.length * 10)).toFixed(2)
            this.personalInfo.Skill_go = data.data.user[0].skill_go.aggregate.max.amount
            this.personalInfo.Skill_js = data.data.user[0].skill_js.aggregate.max.amount
            this.personalInfo.Skill_html = data.data.user[0].skill_html.aggregate.max.amount
            this.personalInfo.Skill_css = data.data.user[0].skill_html.aggregate.max.amount
            this.personalInfo.Skill_sql = data.data.user[0].skill_sql.aggregate.max.amount
            this.personalInfo.Xp_progress= convertCreatedAtToDaysAndKb(data.data.xp_progress)
            console.log(this.personalInfo.Xp_progress);
            
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
        this.setupLogoutListener(home, template)
    }

    applyStyles(element, newstyle = {
        display: 'block',
        width: 'calc(100% - 20px)',
        margin: '0 auto',
        padding: '10px'
    }) {
        Object.assign(element.style, newstyle);
    }

    setupLogoutListener(home, template) {
        let logout = document.getElementById("logout")
        if (logout) {
            logout.addEventListener('click', () => {
                home.innerHTML = template.renderLoginPage();
                this.applyStyles(home, {
                    display: 'flex',
                    width: '100%',
                    margin: '0',
                    padding: '0'
                });
                const client = new AuthClient();
                client.setupLoginListener();
            })
        }
    }
    convertCreatedAtToDays(data) {
        const now = new Date();
        return data.map(item => {
            const createdAtDate = new Date(item.createdAt);
            const diffTime = Math.abs(now - createdAtDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
                createdAt: item.createdAt,
                amount: (item.amount/1000).toFixed(2),
                daysSince: diffDays
            };
        });
    }
}