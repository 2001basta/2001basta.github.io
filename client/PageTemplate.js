export class PageTemplate {
    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    render() {
        return `
            <header class="header">
                <div class="home-page">Home Page</div>
                <div class="user">
                    <div class="name">${this.userInfo.login}</div>
                    <div class="logout">Logout</div>
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
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="#f9f9f9" transform="scale(1,-1)">
                    <line x1="0" y1="200" x2="0" y2="0" style="stroke:blue;stroke-width:2" />
                    <line x1="0" y1="0" x2="200" y2="0" style="stroke:blue;stroke-width:2" />
                    <rect width="20" height="80" y="20" x="50" fill="#f9f9f9" />
                    <rect width="20" height="60" y="20" x="90" fill="#f9f9f9" />
                    <rect width="20" height="100" y="20" x="140" fill="#f9f9f9" />
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
}