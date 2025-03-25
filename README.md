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

Remaining :

- send/ignore connection user card from feed
- New user sign up
- E2E Testing

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile
