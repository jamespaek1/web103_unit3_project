# WEB103 Unit 3 Project - UnityGrid Plaza

Submitted by: **James Paek**

About this web app: **UnityGrid Plaza is a virtual community space where users can explore music events across four different venues. Users can click on a venue from an interactive map to view upcoming and past events at that location.**

Time spent: **3** hours

## Required Features

The following **required** functionality is completed:

- [x] The web app uses React to display data from the API
- [x] The web app is connected to a PostgreSQL database, with an appropriately structured events table
- [x] The web app displays the title of the app
- [x] A visual interface allows the user to select a location they would like to view
- [x] Each location has a detail page with its own unique URL
- [x] Clicking on a location navigates to its corresponding detail page and displays events associated with that location

The following **stretch** features are implemented:

- [x] An additional page shows all possible events
- [x] Users can filter events by location
- [x] Events display a countdown showing the time remaining before that event
- [x] Events appear with different formatting when the event has passed

## Video Walkthrough

Here's a walkthrough of implemented required and stretch features:

<img src='Week 3 Project Assignment.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with James Paek using Licecap software

## Notes

- Connecting to the Render PostgreSQL database required using the external hostname 
  instead of the internal one, which caused connection errors initially.
- Configuring dotenv properly with ES modules was tricky since import statements 
  are hoisted, so environment variables weren't loaded before the database pool 
  was created. Solved this by using a dynamic import.
- The SSL configuration needed to be toggled depending on whether connecting 
  locally or through Render's external connection.
- Date formatting from PostgreSQL returned unexpected formats that caused 
  "Invalid Date" errors in the frontend, which required adjusting the parsing logic.

## License

Copyright **2026** **James Paek**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.