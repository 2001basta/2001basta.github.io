export class PageTemplate {
    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    render() {
        return `
            <header class="header">
                <div class="mobile-nav">
                    <div class="close-nav">
                        <i class="fa-solid fa-xmark"></i>  
                    </div>
                    <div class="bar">
                        <i class="fa-solid fa-bars" ></i>
                    </div>
                    <div class="profile-nav">
                        <div class="image">
                            <img class="profilimage" src="./images/profil.png" alt="Profile">
                        </div>
                        <div class="firstname">${this.userInfo.firstName}</div>
                        <div class="lastname">${this.userInfo.lastName}</div>
                        <div class="email">${this.userInfo.email}</div>
                        <div class="phone-number">${this.userInfo.attrs.tel}</div>
                        <div class="city">${this.userInfo.attrs.city}</div>
                    </div>
                </div>
                <div class="nil"></div>
                <div class="user">
                    <span class="name">${this.userInfo.login}</span>
                    <div class="logout" id="logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>

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
                        <div class="xpamont">xp ${Math.ceil(this.userInfo.Myxp / 1000)}MB</div>
                        <div class="auditrachio">Audit Ratio: ${this.userInfo.auditRatio}</div>
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
        let arr = [this.userInfo.Go_porcentage, this.userInfo.Js_porcentage, this.userInfo.Checkpoint_porcentage]
        let elments = ["piscine-go", "piscine-js", "checkpoint"]
        return arr.map((x, i) => `
            <svg height="100" width="100" meet xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
                <circle r="40" cx="50" cy="80" 
                    fill="#FF9800" 
                    stroke="#f9f9f9" 
                    stroke-width="5"
                    stroke-dasharray="282.74 282.74" 
                    stroke-dashoffset="${282.74 * (1 - x)}" transform="rotate(-90 50,80)"/>
                    <text x="35" y="80">${100 * x}%</text>
                    <text x="0" y="15" fill="#f9f9f9" font-size="20" font-weight="bold">${elments[i]}</text>
            </svg>
        `).join('');
    }

    renderBarGraph() {
        let arrElement = [this.userInfo.Skill_go, this.userInfo.Skill_js, this.userInfo.Skill_html, this.userInfo.Skill_sql, this.userInfo.Skill_css]
        let arrText = ["Go", "Js", "Html", "Sql", "Css"]
        let strElement = ""
        arrElement.forEach((x, i) => {
            strElement += `<rect width="25" height="${180 * (x / 100)}" x="${40 + 40 * i + 24 * i}" y="${200 - 180 * (x / 100)}" />
            <text y="${200 - 180 * (x / 100) - 15}" x="${40 + 40 * i + 24 * i - 5}" style="fill:#f9f9f9; font-size:15; font-weight:bold;">${x}%</text>
             <text y="210" x="${40 + 40 * i + 24 * i - 5}" style="fill:#f9f9f9; font-size:15;" transform="rotate(45, ${40 + 40 * i + 24 * i - 5}, 245)">${arrText[i]}</text>
            `
        })
        return `
            <div class="graph1">
                <h2>Best skills</h2>
                <svg class="kills_svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" fill="#f9f9f9" >
                    <line x1="4" y1="200" x2="350" y2="200" style="stroke:blue; stroke-width:2;"/>
                    <line x1="4" y1="200" x2="4" y2="20" style="stroke:blue; stroke-width:2;"/>
                    <polygon points="0,20 4,10 8,20" style="fill:blue;" />
                    ${strElement}
                </svg>
            </div>
        `;
    }

    renderLineGraph() {
        let arrElement = this.userInfo.Xp_progress
        let points = ""
        let circles = ""
        let style = ""
        let lastx = 0
        arrElement.forEach((obj, i) => {
            lastx += parseInt(obj.amount)
            points += `${lastx},${obj.daysSince} `
            circles += `
            <circle class="circle${i}" r="3" cx="${lastx}" cy="${obj.daysSince}" fill="blue"></circle>
             <text x="${lastx - i}" y="${obj.daysSince + 30}" style="fill:#f9f9f9; font-size:15;" class="text${i}">${obj.createdAt}
             <tspan dy="1.2em" dx="-2.7em">${lastx}Xp</tspan>
             </text>
            `
            style += `
                .text${i}{
                    position: fixed;
                    opacity: 0; 
                    display: none;
                    transition: opacity 0.3s;
                }
                .circle${i}:hover + .text${i}{
                    opacity: 1;
                    display: block;
                }
            `
        })

        return `
            <div class="graph2">
                <h2 style="margin-bottom: 14px;">XP progression</h2>
                <svg class="xp_progresss" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300" fill="#f9f9f9" >
                    <line x1="4" y1="296" x2="690" y2="296" style="stroke:blue; stroke-width:2;"/>
                    <line x1="4" y1="296" x2="4" y2="10" style="stroke:blue; stroke-width:2;"/>
                    <polygon points="0,10 4,0 8,10" style="fill:blue;" />
                    <polygon points="690,292 700,296 690,300" style="fill:blue;" />
                    <polyline style="fill:none; stroke: #f9f9f9; stroke-width:2" points="${points}" />
                    ${circles}
                    <style>
                    ${style}
                    </style>
                </svg>
            </div>
        `;
    }

    renderLoginPage() {
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

    ShowAndHidProfil() {
        const mobile_nav = document.querySelector(".mobile-nav")
        const profile = document.querySelector(".profile-nav")
        const close = document.querySelector(".close-nav")
        mobile_nav.addEventListener('click', () => {
            mobile_nav.style.top = "0"
            profile.style.display = "block"
            close.style.display = "flex"
        })
        close.addEventListener('click', () => {
            
            mobile_nav.style.top = "0"
            profile.style.display = "none"
            close.style.display = "none"
        })
    }
}