Neighborhood Restaurants
========================

About
-----

This project is for the final udacity fend project and incorperates many technologies. This project in particular mainly hinges on the use of Google maps api for mapping and Zomato api for retrieving restaurant information for a given town.

Demo
----

Neighborhood Restaurants can be seen here: https://neighborhood-restaurants.firebaseapp.com/

Service workers do not work in development mode with react and that can also be checked on firebase or deploying to your own server. Depending on where it is being deployed certain things will need to be changed. see here: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment

Install
-------

Getting started:

in the project directory run 

`yarn`

then 

`yarn start`

This will install dependencies and start a local test server. When your ready to deploy just run:

`yarn build`

from there your ready to go. Just make sure to set correct settings for where you're deploying.


Note: as stated above. Service workers dont work in this state (development). See the firebase deployment for a fully working version or follow the other link above to deploy in a different setting.