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
            err= "Not authorized. Please verify your username and password.";
            this.logErorr(errlogin, err)
        });
    }
}

let newClient = new NewClient()
newClient.setlisenerOnlogin()
