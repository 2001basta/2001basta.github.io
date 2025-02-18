export class PageTemplate {
    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    render() {
        return `
            <header class="header">
                <div class="name">${this.userInfo.login}</div>
                <div class="user">
                    <div class="logout" id="logout">Logout</div>
                </div>
            </header>
            <div class="profile-project">
                <div class="profile">
                    <div class="image">
                        <img class="profilimage" src="./images/profil.png" alt="Profile">
                    </div>
                    <div class="firstname">${this.userInfo.firstName}</div>
                    <div class="lastname">${this.userInfo.lastName}</div>
                    <div class="email">${this.userInfo.email}</div>
                    <div class="phone-number">${this.userInfo.attrs.tel}</div>
                    <div class="city">${this.userInfo.attrs.city}</div>
                </div>
                <div class="projects">
                    <div class="level-rachio">
                        <h2 class="text">School Information</h2>
                        <div class="level">Level ${this.userInfo.Level}</div>
                        <div class="xpamont">xp ${Math.ceil(this.userInfo.Myxp/1000)}MB</div>
                        <div class="auditrachio">Audit Ratio: ${Math.ceil(this.userInfo.auditRatio)}</div>
                    </div>
                    <div class="all-projects">
                        <h2 class="text">The Projects</h2>
                        <div class="projet">${this.userInfo.Porjects[0]}</div>
                        <div class="projet">${this.userInfo.Porjects[1]}</div>
                        <div class="projet">${this.userInfo.Porjects[2]}</div>
                    </div>
                </div>
            </div>
            ${this.renderGraphs()}
        `;
    }

    renderGraphs() {
        return `
            <div class="successfully-projet">
                ${this.renderCircleGraph()}
            </div>
            <div class="graph1-2">
                ${this.renderBarGraph()}
                ${this.renderLineGraph()}
            </div>
        `;
    }

    renderCircleGraph() {
        let arr = [this.userInfo.Go_porcentage,this.userInfo.Js_porcentage,this.userInfo.Checkpoint_porcentage]
        let elments = ["piscine-go","piscine-js","checkpoint"]
        return arr.map((x,i) => `
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
                <circle r="40" cx="50" cy="80" 
                    fill="#FF9800" 
                    stroke="#f9f9f9" 
                    stroke-width="5"
                    stroke-dasharray="282.74 282.74" 
                    stroke-dashoffset="${282.74 * (1-x)}" transform="rotate(-90 50,80)"/>
                    <text x="35" y="80">${100*x}%</text>
                    <text x="0" y="15" fill="#f9f9f9" font-size="20" font-weight="bold">${elments[i]}</text>
            </svg>
        `).join('');
    }

    renderBarGraph() {
        let arrElement=[this.userInfo.Skill_go,this.userInfo.Skill_js,this.userInfo.Skill_html,this.userInfo.Skill_sql,this.userInfo.Skill_css]
        let arrText=["Go","Js","Html","Sql","Css"]
        let strElement=""
        arrElement.forEach((x,i)=>{
            strElement+=`<rect width="25" height="${180*(x/100)}" x="${40+40*i+24*i}" y="${230-180*(x/100)}" />
            <text y="${230-180*(x/100)-15}" x="${40+40*i+24*i-5}" style="fill:#f9f9f9; font-size:15; font-weight:bold;">${x}%</text>
             <text y="245" x="${40+40*i+24*i-5}" style="fill:#f9f9f9; font-size:5;" transform="rotate(45, ${40+40*i+24*i-5}, 245)">${arrText[i]}</text>
            `
        })
        return `
            <div class="graph1">
                <h2>Best skills</h2>
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" fill="#f9f9f9" >
                    <line x1="4" y1="230" x2="350" y2="230" style="stroke:blue; stroke-width:2;"/>
                    <line x1="4" y1="230" x2="4" y2="50" style="stroke:blue; stroke-width:2;"/>
                    <polygon points="0,50 4,40 8,50" style="fill:blue;" />
                    ${strElement}
                </svg>
            </div>
        `;
    }

    renderLineGraph() {
        let arrElement=[this.userInfo.Skill_go,this.userInfo.Skill_js,this.userInfo.Skill_html,this.userInfo.Skill_sql,this.userInfo.Skill_css]
        
        return `
            <div class="graph2">
                <h2>XP progression</h2>
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" fill="#f9f9f9" >
                    <line x1="4" y1="230" x2="350" y2="230" style="stroke:blue; stroke-width:2;"/>
                    <line x1="4" y1="230" x2="4" y2="50" style="stroke:blue; stroke-width:2;"/>
                    <polygon points="0,50 4,40 8,50" style="fill:blue;" />
                    <polygon points="350,226 360,230 350,234" style="fill:blue;" />
                    <polyline style="fill:none; stroke: #f9f9f9; stroke-width:3" points="0,0 50,150 100,75 150,50 200,140 250,140" />
                    <circle r="3" cx="50" cy="150"></circle>
                    <circle r="3" cx="100" cy="75"></circle>
                    <circle r="3" cx="150" cy="50"></circle>
                    <circle r="3" cx="250" cy="140"></circle>
                </svg>
            </div>
        `;
    }

    renderLoginPage(){
        return `
            <div class="login">
                <div class="login0">
                    <p class="text-login">Login Page</p>
                </div>
                <div class="login1">
                    <input id="username" type="text" value="" placeholder="Entre the username">
                </div>
                <div class="login2">
                    <input id="password" type="password" value="" placeholder="Entre the password">
                </div>
                <div class="login3">
                    <button id="button-login" class="button-login">Login</button>
                </div>
                <div class="login4">
                    <p id="error" class="error"></p>
                </div>
            </div>
        `
    }
}