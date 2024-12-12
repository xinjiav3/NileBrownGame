---
permalink: /calendar
---
<link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.css" rel="stylesheet">
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #4a235a;
    }
    button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #000000;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #9c27b0;
    }
    #calendar {
        max-width: 900px;
        margin: 20px auto;
        padding: 0 20px;
        background-color: black;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    /* Styles for popup modal */
    #popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        text-align: center;
        z-index: 1000;
    }
    #popup h3 {
        margin: 0 0 10px;
        color: black;
    }
    #popup button {
        margin-top: 10px;
        padding: 5px 15px;
        background-color: #7DF9FF;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    #popup button:hover {
        background-color: #9c27b0;
    }
    /* Overlay background */
    #overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
    #popup-description {
        color: black;
    }
</style>
<button onclick="handleRequest()">Reload Events</button>
<div id="calendar"></div>
<!-- Overlay background for popup -->
<div id="overlay" onclick="closePopup()"></div>
<!-- Popup modal for event details -->
<div id="popup">
    <h3 id="popup-title"></h3>
    <p id="popup-description"></p>
    <button onclick="closePopup()">Close</button>
</div>
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.js"></script>
<script>
function getCookie(name) {
    var dc = document.cookie;
    // Save the entire cookie string from the document object
    var prefix = name + "=";
    // Construct the prefix with the desired cookie name followed by an equal sign
    var begin = dc.indexOf("; " + prefix);
    // Look for the cookie's prefix preceded by "; " (indicates it's not the first cookie)
    if (begin == -1) {
        // If the cookie with "; " + prefix is not found
        begin = dc.indexOf(prefix);
        // Check if the cookie is the very first one (without "; " before it)
        if (begin != 0) return null;
        // If the cookie is not at the start of the string, it does not exist
    }
    else {
        begin += 2;
        // Adjust the starting position to account for the "; " offset
        var end = document.cookie.indexOf(";", begin);
        // Look for the position of the next ";" to determine the end of the cookie value
        if (end == -1) {
            end = dc.length;
            // If there is no ";" after the cookie, set the end to the end of the string
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
    // Extract and decode the cookie value from the identified start and end positions
}
    // Not using the import because it gave my code issues for some reason, but this is the same thing
    const fetchOptions = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'X-Origin': 'client' // New custom header to identify source
        },
    }
    function auth() {
        // Check if the auth cookie returned after a login exists, and if it does, let the user through
        if (getCookie("jwt_java_spring")) {
            handleRequest();
            return
        }
        // If it doesn't, redirect them to the login page
        alert("You are not logged in! Redirecting you to the login page...")
        window.location.href = "{{site.baseurl}}/duallogin"; 
        }
    function request() {
        // Will use javaURI before deployment time
        return fetch("http://localhost:8085/api/calendar/events", fetchOptions)
        // Get all events from the calendar API
        .then(response => {
            if (response.status !== 200) {
                console.error("HTTP status code: " + response.status);
                    return null;
            }
            return response.json();
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            return null;
        });
}
    function handleRequest() {
        request().then(data => {
            // data = the calendar API returned data
            if (data !== null) {
                // If data exists
                const events = data.map(event => ({
                    // Map the data values accordingly for displaying later
                    title: event.title,
                    description: event.description,
                    start: event.date
                    }));
                displayCalendar(events);
                // Display the calendar
            }
        });
    }
    function displayCalendar(events) {
        const calendarEl = document.getElementById('calendar');
        // Grab calendar element
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: events,
            // Set calendar settings from imported calendar
            eventClick: function(info) {
                // Show popup with title and description
                document.getElementById('popup-title').textContent = info.event.title;
                document.getElementById('popup-description').textContent = info.event.extendedProps.description || "No description available";
                document.getElementById('popup').style.display = 'block';
                document.getElementById('overlay').style.display = 'block';
            }
        });
        calendar.render();
        // Render function from imported calendar
    }
    // Close popup
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    document.addEventListener("DOMContentLoaded", auth());
</script>