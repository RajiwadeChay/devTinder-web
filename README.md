# devTinder-web Notes

- Create a Vite + React application
- Remove unnessary code and create a Hello World App
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a NavBar.jsx seprate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ => Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Sign In Page
- Install axios
- CORS => install cors in backend => add middleware with configurations: origin, credentials to backend
- Whenever you're making API call pass axios {withCredentials : true} with it
- Install react-redux + @reduxjs/toolkit => Read Redux Official Docs
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in browser
- Sign In and see if data is coming properly in the store
- NavBar should update as soon as user signed in
- Refactor code to add constants file + components folder
- You should not be access other routes without sign in
- If token is not present, redirect user to signin page
- Logout Feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page => See all my connections
- New Page => See all my connection requests
- Feature => Accept / Reject connection request
- Send/ignore connection user card from feed
- New user sign up
- E2E Testing

# Rough Work

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile

# Deployment

- Sign Up on AWS
- Launch instance
<!-- - chmod 400 "devTinder-secret.pem" : EUR -->
- chmod 400 "devTinder-secret-ind.pem"
<!-- - ssh -i "devTinder-secret.pem" ubuntu@ec2-16-170-250-183.eu-north-1.compute.amazonaws.com : EUR -->
- ssh -i "devTinder-secret-ind.pem" ubuntu@ec2-65-1-94-35.ap-south-1.compute.amazonaws.com
- Install Node version 23.7.0 => nvm install 23.7.0
- Git Clone FE + BE app
- Deploy Frontend
  - npm i => Install dependencies
  - npm run build => build app
  - sudo apt update => system update
  - sudo apt install nginx => install nginx
  - sudo systemctl start nginx => start nginx
  - sudo systemctl enable nginx => enable nginx
  - Copy code from dist folder (build files) to /var/www/html/ (nginx http server)
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance
- Deploy Backend

  - allowed ec2 instance piblic IP on mongodb server
  - npm install pm2 -g
  - pm2 start npm -- start
  - pm2 logs => shows logs
  - pm2 flush <processName> => clears logs
  - pm2 list => lists processes
  - pm2 stop <processName> => stop the process
  - pm2 delete <processName> => delete the process
  - pm2 start npm --name "devtinder-backend" -- start => to start with custome process name
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx using cmd : sudo systemctl restart nginx => restart nginx
  - Modify the BASE_URL in frontend project to "/api"

# nginx config

Domain name = devtinder.com => 16.170.250.183

    Frontend = http://16.170.250.183/ => devtinder.com
    Backend = http://16.170.250.183:7777/ => devtinder.com/api

    ngnix config :
    server_name 16.170.250.183;

    location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }

# Adding s custom domain name

- Purchase domain name from godaddy
- sign up on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record : A devtinder.in 16.170.250.183
- Enable SSL for website
