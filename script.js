// Warten, bis das DOM vollständig geladen ist, bevor Funktionen ausgeführt werden
document.addEventListener("DOMContentLoaded", function() {
    displayEvents(); // Veranstaltungen anzeigen, sobald die Seite geladen ist
});

// Funktion zum Hinzufügen einer Veranstaltung
function addEvent() {
    // Veranstaltungsinformationen aus den Eingabefeldern abrufen
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const isPublic = document.getElementById("public").checked;

    // Veranstaltung als Objekt erstellen
    const event = {
        title,
        date,
        time,
        location,
        description,
        isPublic
    };

    // Veranstaltungen aus dem LocalStorage abrufen oder ein leeres Array erstellen
    let events = localStorage.getItem("events");
    events = events ? JSON.parse(events) : [];
    // Neue Veranstaltung hinzufügen
    events.push(event);
    // Veranstaltungen im LocalStorage speichern
    localStorage.setItem("events", JSON.stringify(events));

    displayEvents(); // Veranstaltungen erneut anzeigen, um die neue Veranstaltung anzuzeigen
}

// Funktion zum Anzeigen aller Veranstaltungen im Kalender
function displayEvents() {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Kalenderbereich leeren, bevor Veranstaltungen hinzugefügt werden

    // Veranstaltungen aus dem LocalStorage abrufen oder ein leeres Array erstellen
    let events = localStorage.getItem("events");
    events = events ? JSON.parse(events) : [];

    // Für jede Veranstaltung ein DIV-Element erstellen und dem Kalenderbereich hinzufügen
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event"); // CSS-Klasse hinzufügen
        // HTML für die Veranstaltung erstellen und dem DIV-Element zuweisen
        eventDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p>Description: ${event.description}</p>
            <p>${event.isPublic ? "Public Event" : "Private Event"}</p>
            <button onclick="deleteEvent('${event.title}')">Delete</button> <!-- Button zum Löschen der Veranstaltung -->
        `;
        calendarDiv.appendChild(eventDiv); // Veranstaltung dem Kalenderbereich hinzufügen
    });
}

// Funktion zum Löschen einer Veranstaltung
function deleteEvent(title) {
    // Bestätigungsdialog anzeigen, bevor die Veranstaltung gelöscht wird
    if (confirm("Are you sure you want to delete this event?")) {
        // Veranstaltungen aus dem LocalStorage abrufen oder ein leeres Array erstellen
        let events = localStorage.getItem("events");
        events = events ? JSON.parse(events) : [];
        // Veranstaltung mit dem angegebenen Titel filtern und aus dem Array entfernen
        events = events.filter(event => event.title !== title);
        // Geänderte Veranstaltungen im LocalStorage speichern
        localStorage.setItem("events", JSON.stringify(events));
        displayEvents(); // Veranstaltungen erneut anzeigen, um die gelöschte Veranstaltung zu entfernen
    }
}
