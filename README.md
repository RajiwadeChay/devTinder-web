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

<!-- Domain name = devtinder.com => 16.170.250.183 : EUR -->

Domain name = devtinder.com => 65.1.94.35

    Frontend = http://65.1.94.35/ => devtinder.com
    Backend = http://65.1.94.35:7777/ => devtinder.com/api

    ngnix config :
    server_name 65.1.94.35;

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
<!-- - DNS record : A devtinder.in 16.170.250.183 : EUR -->
- DNS record : A devtinder.in 65.1.94.35
- Enable SSL for website

# Sending Emails via SES

- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address on AWS identity
- Install AWS SDK - v3
- Code Example => https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/README.md
- Setup SESClient
- Access Credentials should be created in IAM under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS

- Installing node-cron
- Learning about cron expressions syntax - crontab.guru
- Schedule a job
- date-fns
- Find all the unique email id who have got connection request in previous day
- Send Email
- Explore queue mechanism to send bulk emails
- Amazon SES Bulk Emails
- Make sendEmail function dyanamic
- bee-queue & bull npm packages

# Razorpay Payment Gateway Integration

- Sign up on Razorpay & complete KYC
- Create a UI for premium page
- Creating an API for create order in backend
- Added my key and secret in .env file
- Initialized Razorpay in utils
- Creating order on Razorpay
- create Schema and model
- saved the order in payments collection
- make the API dynamic
- Setup Razorpay webhook on your live API
- Ref => https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref => https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/
- Ref => https://razorpay.com/docs/webhooks/validate-test/
- Ref => https://razorpay.com/docs/webhooks/payloads/payments/

# Real Time Chat using Websocket(Socket.io)

- Build the UI for a chat window on /chat/:targetUserId
- Setup socket.io in backend
- npm i sockret.io
- Setup frontend socket.io-client
- Initialise the chat
- Create Socket Connection
- Listen to events
- Homework : Improve the UI
- Homework : Fix security bug => auth in web sockets
- Homework : Fix bug => If I'm not friend, then I should not be able to send message
- Homework : Feat => Show green symbol when online - [lsat seen 2 hours ago]
- Homework : Limit messages when fetching from DB
- Project Idea : Tic Tac Toe game
- Project Idea : Chess
