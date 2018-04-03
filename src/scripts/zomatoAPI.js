//Zomato api is non standard as well as unfriendly to web browers. Using a normal fetch request results in nothing.
//and it sends only a preflight request. Even with non standard headers it still fails.

//There may be a fetch workaround, but until I find one, using this jquery workaround from https://stackoverflow.com/questions/33980212/ajax-request-with-headers-failing

import { ZomatoAPIKey } from "../static/APIKeys"
import $ from "jquery"

export const getRestaurants = () => {
    return new Promise((res, rej)=>{
        $.ajax({
            type: "GET", //it's a GET request API
            headers: {
              'X-Zomato-API-Key': ZomatoAPIKey //only allowed non-standard header
            },
            url: 'https://developers.zomato.com/api/v2.1/search?lat=42.1192932&lon=-77.960866&radius=1000', //what do you want
            dataType: 'json', //wanted response data type - let jQuery handle the rest...
            processData: true, //data is an object => tells jQuery to construct URL params from it
            success: function(data) {
              res(data); //what to do with response data on success
            },
            error: (xhr, text, thrownError) => {
                let errors = {
                    status: xhr.status,
                    text: text,
                    error: thrownError
                }
                rej({errors: errors, message: "Ajax request to Zomato failed."})
            }
          });
    })
}