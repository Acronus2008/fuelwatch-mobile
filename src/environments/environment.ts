// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const FACEBOOK_API_URL = 'https://graph.facebook.com/';
export const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
export const FUELWATCH_RSS_URL = 'https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS';

/*
* In development mode replace the FUELWATCH_RSS_URL for
* http://localhost:3002/fuelWatchRSS/Suburb/Albany/Surrounding?Product=1&Suburb=Albany&Surrounding=no'
* Requirements for that? Make a mock from RSS in your localhost environment
* */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
