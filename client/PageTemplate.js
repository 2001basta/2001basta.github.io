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
                </div>
                <div class="projects">
                    <div class="level-rachio">
                        <h2 class="text">School Information</h2>
                        <div class="level">Level 15</div>
                        <div class="xpamont">xp 540MB</div>
                        <div class="auditrachio">Audit Ratio: ${this.userInfo.auditRatio}</div>
                    </div>
                    <div class="all-projects">
                        <h2 class="text">The Projects</h2>
                        <div class="projet">Project 1</div>
                        <div class="projet">Project 2</div>
                        <div class="projet">Project 3</div>
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
        let arr = [0.6,0.8,1]
        return arr.map((x) => `
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" 
                    fill="#FF9800" 
                    stroke="#f9f9f9" 
                    stroke-width="5"
                    stroke-dasharray="282.74 282.74" 
                    stroke-dashoffset="${282.74 * (1-x)}" />
                    <text x="40" y="40" transform="rotate(30 35,35)">${100*x}%</text>
            </svg>
        `).join('');
    }

    renderBarGraph() {
        return `
            <div class="graph1">
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill="#f9f9f9" transform="scale(1,-1)">
                    <line x1="4" y1="250" x2="4" y2="100" style="stroke:blue;stroke-width:2" />
                    <line x1="4" y1="100" x2="300" y2="100" style="stroke:blue;stroke-width:2" />
                    <polygon points="0,250 8,250 4,260" style="fill:blue;" />
                    <!--height=150*x ex: x=0.8 pr x=0.6 -->
                    <rect width="20" height="120" y="100" x="40" fill="red" />
                    <!-- y=100+height+20 x=x-2  porcentage=0.8*100-->
                    <text y="240" x="38" style="fill:blue; font-size:15; font-weight:bold;">80%</text>
                    <!-- x=40-4+20*i+40  -->
                    <rect width="20" height="90" y="100" x="96" fill="red" />
                    <text y="210" x="94" style="fill:blue; font-size:15; font-weight:bold;">60%</text>
                    <rect width="20" height="100" y="100" x="156" fill="red" />
                    <rect width="20" height="150" y="100" x="208" fill="red" />
                </svg>
            </div>
        `;
    }

    renderLineGraph() {
        return `
            <div class="graph2">
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="gray" transform="scale(1,-1)">
                    <line x1="0" y1="200" x2="0" y2="0" style="stroke:blue;stroke-width:2" />
                    <line x1="0" y1="0" x2="200" y2="0" style="stroke:blue;stroke-width:2" />
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