import { PageTemplate } from "./PageTemplate.js"
import { AuthClient } from "./AuthClient.js";
import {Query} from "./Queries.js"
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
                    +this.allquery.UserInfo
                    +this.allquery.Myxp
                    +this.allquery.Level
                    +this.allquery.projects+
                    "}"
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            console.log(data);
            
            this.personalInfo = data.data.user[0];
            this.personalInfo.Level= data.data.level.aggregate.max.amount
            this.personalInfo.Myxp= data.data.myxp.aggregate.sum.amount
            this.personalInfo.Porjects= data.data.projects.map(proj =>
                proj.path.replace("/oujda/module/","")
            )
            
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
        this.setupLogoutListener(home,template)
    }

    applyStyles(element,newstyle={
        display: 'block',
        width: 'calc(100% - 20px)',
        margin: '0 auto',
        padding: '10px'
    }) {
        Object.assign(element.style, newstyle);
    }

    setupLogoutListener(home,template){
        let logout= document.getElementById("logout")
        if (logout){
            logout.addEventListener('click',()=>{
                home.innerHTML = template.renderLoginPage();
                this.applyStyles(home,{
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
}