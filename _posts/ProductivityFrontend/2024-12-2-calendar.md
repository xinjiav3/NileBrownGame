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
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        // because unescape has been deprecated, replaced with decodeURI
        //return unescape(dc.substring(begin + prefix.length, end));
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 
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
        if (getCookie("jwt_java_spring")) {
            handleRequest();
            return
        }
        alert("You are not logged in! Redirecting you to the login page...")
        window.location.href = "{{site.baseurl}}/duallogin"; 
        }
    function request() {
        return fetch("http://localhost:8085/api/calendar/events", fetchOptions)
        .then(response => {
            if (response.status !== 200) {
                console.error("HTTP status code: " + response.status);
                    return null;
            }
            hello = response.json();
            console.log(hello);
            return hello;
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            return null;
        });
}
    function handleRequest() {
        request().then(data => {
            if (data !== null) {
                console.log(data);
                const events = data.map(event => ({
                    title: event.title,
                    description: event.description,
                    start: event.date
                    }));
                console.log(events);
                displayCalendar(events);
            }
        });
    }
    function displayCalendar(events) {
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: events,
            eventClick: function(info) {
                // Show popup with title and description
                document.getElementById('popup-title').textContent = info.event.title;
                document.getElementById('popup-description').textContent = info.event.extendedProps.description || "No description available";
                document.getElementById('popup').style.display = 'block';
                document.getElementById('overlay').style.display = 'block';
            }
        });
        calendar.render();
    }
    // Close popup
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    document.addEventListener("DOMContentLoaded", auth());
</script>