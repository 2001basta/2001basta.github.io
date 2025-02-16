class NewClient {
    constructor() {
        this.Password = ""
        this.Username = ""
        this.Jwt = ""
    }

    logErorr(diverr, err) {
        if (diverr) {
            diverr.innerText = err
            setTimeout(() => {
                diverr.innerText = ""
            }, 2000)
        }
    }

    setlisenerOnlogin() {
        let login = document.getElementById("button-login")
        let errlogin = document.getElementById("error")
        let err
        if (login) {
            login.addEventListener('click', () => {
                err = this.clientinfo()
                if (err) {
                    this.logErorr(errlogin, err)
                    return
                }
                this.clientAuthentication()
                let newProfile = new Profile(this)
                newProfile.getInfoOfUser()
                newProfile.refchPage()
            })
        }
    }

    clientinfo() {
        let user = document.getElementById("username")
        let passw = document.getElementById("password")
        if (user && passw) {
            if (passw.value == "" || user.value == "") {
                return "Please verify your username and password.";
            }
            this.Password = passw.value
            this.Username = user.value
        }
    }

    clientAuthentication() {
        const basicAuth = btoa(`${this.Username}:${this.Password}`);
        let errlogin = document.getElementById("error")
        var err
        fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                err = "Not authorized. Please verify your username and password.";
                this.logErorr(errlogin, err)
                return
            }
            let data = await response.json();
            this.Jwt = data;
        }).catch((err) => {
            err = "Not authorized. Please verify your username and password.";
            this.logErorr(errlogin, err)
        });
    }
}

class Profile extends NewClient {
    constructor(client) {
        super()
        this.Jwt = client.Jwt
        this.Username = client.Username
        this.Password = client.Password
        this.InfoPersonal = {}
    }
    getInfoOfUser() {

        if (!this.Jwt) {
            return
        }
        fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            headers: {
                'Authorization': `Bearer ${this.Jwt}`
            },
            method: "POST",
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
        }).then(async (resposne) => {
            if (!resposne.ok) {
                console.log("no data");
                return "Not Data For Now!"
            }
            console.log("data");
            let data = await resposne.json()
            this.InfoPersonal.Firstname = data.data.user[0]
            console.log(this.InfoPersonal);

        }).catch((err) => {
            console.log(err);
        })
    }
    refchPage(){
        let home = document.querySelector(".home")
        if (this.InfoPersonal){
            let tempes = new Templates()
            home.innerHTML=tempes.alltemplates.homepage
        }
    }

}
class Templates {
    constructor() {
        this.alltemplates= {
            homepage: `<header class="header">
            <div class="home-page">Home Page</div>
            <div class="user">
                <div class="name">User Name</div>
                <div class="logout">Logout</div>
            </div>
        </header>
        <div class="profile-project">
            <div class="profile">
                <div class="image">
                    <img class="profilimage" src="./images/profil.png" alt="">
                </div>
                <div class="firstname">John</div>
                <div class="lastname">Doe</div>
                <div class="email">john.doe@example.com</div>
                <div class="phone-number">+123 456 7890</div>
            </div>
            <div class="projects">
                <div class="level-rachio">
                    <h2 class="text">School Information</h2>
                    <div class="level">Level 15</div>
                    <div class="xpamont">xp 540MB</div>
                    <div class="auditrachio">auditRatio 40KB</div>
                </div>
                <div class="all-projects">
                    <h2 class="text">The Projects</h2>
                    <div class="projet">Project 1</div>
                    <div class="projet">Project 2</div>
                    <div class="projet">Project 3</div>
                </div>
            </div>
        </div>
        <div class="successfully-projet">
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="#FF9800" stroke="#f9f9f9" stroke-width="5"
                    stroke-dasharray="282.74 282.74" stroke-dashoffset="56.548" />
            </svg>
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="#FF9800" stroke="#f9f9f9" stroke-width="5"
                    stroke-dasharray="282.74 282.74" stroke-dashoffset="169.64" />
            </svg>
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="#FF9800" stroke="#f9f9f9" stroke-width="5"
                    stroke-dasharray="282.74 282.74" stroke-dashoffset="113.04" />
            </svg>
        </div>
        <div class="graph1-2">
            <div class="graph1">
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="#f9f9f9"
                    transform="scale(1,-1)">
                    <line x1="0" y1="200" x2="0" y2="0" style="stroke:blue;stroke-width:2" />
                    <line x1="0" y1="0" x2="200" y2="0" style="stroke:blue;stroke-width:2" />
                    <rect width="20" height="80" y="20" x="50" fill="#f9f9f9" />
                    <rect width="20" height="60" y="20" x="90" fill="#f9f9f9" />
                    <rect width="20" height="100" y="20" x="140" fill="#f9f9f9" />
                </svg>
            </div>
            <div class="graph2">
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="gray"
                    transform="scale(1,-1)">
                    <line x1="0" y1="200" x2="0" y2="0" style="stroke:blue;stroke-width:2" />
                    <line x1="0" y1="0" x2="200" y2="0" style="stroke:blue;stroke-width:2" />
                    <polyline style="fill:none; stroke: #f9f9f9; stroke-width:3;"
                        points="0,0 50,150 100,75 150,50 200,140 250,140" />
                    <circle r="3" cx="50" cy="150"></circle>
                    <circle r="3" cx="100" cy="75"></circle>
                    <circle r="3" cx="150" cy="50"></circle>
                    <circle r="3" cx="250" cy="140"></circle>
                </svg>
            </div>
        </div>`
        }
    }
}
let newClient = new NewClient()
newClient.setlisenerOnlogin()


