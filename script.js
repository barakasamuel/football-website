document.addEventListener('DOMContentLoaded', function() {
})
// the key is used to get data concerning matches from localStorage
const STORAGE_KEY = 'matches';
const matchForm = document.getElementById("matchForm");
const matchesList = document.getElementById("matchesList");
const refreshButton = document.getElementById("refreshLivescore");

function loadMatches() {
    const matches = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    matches.forEach(addMatchToTable);
}
// the epl matches are added horizontally on the matches table
function addMatchToTable(match) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${match.date}</td>
        <td>${match.team1} vs ${match.team2}</td>
        <td>${match.time}</td>
        <td>${match.stadium}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    matchesList.appendChild(row);
}
// this form when it is submitted adds a new match
matchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newMatch = {
        team1: document.getElementById("team1").value,
        team2: document.getElementById("team2").value,
        date: document.getElementById("matchDate").value,
        time: document.getElementById("matchTime").value,
        stadium: document.getElementById("stadium").value
    };
    // checks if all fields are perfect
    if (Object.values(newMatch).includes("")) return alert("Please fill out all fields.");
    addMatchToTable(newMatch);
    // match is saved to localstorage
    const matches = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    matches.push(newMatch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    matchForm.reset();
});
// where a match can be deleted by ommission
matchesList.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        const matchDetails = {
            date: row.children[0].textContent,
            team1: row.children[1].textContent.split(' vs ')[0],
            team2: row.children[1].textContent.split(' vs ')[1],
            time: row.children[2].textContent,
            stadium: row.children[3].textContent
        };
        row.remove(); 
        // a match can be removed from local storage
        let matches = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        matches = matches.filter(match => JSON.stringify(match) !== JSON.stringify(matchDetails));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    }
});
refreshButton.addEventListener("click", function () {
    const newScores = [
        { matchId: "match1", score: "5 - 2", status: "Live" },
        { matchId: "match2", score: "3 - 3", status: "Match Played" },
        { matchId: "match3", score: "3 - 2", status: "Live" },
        { matchId: "match4", score: "5 - 4", status: "Match Played" }
    ];
    // scores or status are updated here
    newScores.forEach(match => {
        const matchElement = document.getElementById(match.matchId);
        if (matchElement) {
            matchElement.querySelector(".score").textContent = match.score;
            matchElement.querySelector(".status").textContent = match.status;
        }
    });
    alert("Live scores refreshed!");
});
loadMatches();
