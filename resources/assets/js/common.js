class NBAplayers {

    constructor() {
        this.socket = undefined;
        this.bindEvents();
        this.onLoad();
    }

    bindEvents() {
        $(document).keypress((e) => {
            if (e.which == 13) {
                this.playerSearch(e);
            }
        });
    }

    onLoad() {
        this.wsocket();

        this.socket.onmessage = (message) => {
            const data = $.parseJSON(message.data);
            this[data.action](data.data);
        }
    }

    /**
     * WebSockets
     */
    wsocket() {
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.onopen = function () {
            console.log('WebSocket Open');
        };
    }

    /**
     * Search for a Player
     * @param e
     */
    playerSearch(e) {
        e.preventDefault();
        const searchVal = $('[name="playerSearch"]').val();
        // Search IF Typed more than 2 letters
        if(searchVal.length > 2) {
            this.socket.send(JSON.stringify({action: 'findPlayer', value: searchVal}));
        }
    }

    /**
     * Get Player Data
     * @param data
     */
    findPlayer(data) {
        $('.playerName, .playerInfo, .playerStats').empty();
        if(data) {
            $('.playerName').html(`<h2>${data.fullName}</h2>`);
            this.getPlayerInfo({
                PlayerID: data.playerId,
                SeasonType: "Regular Season",
                LeagueID: "00"
            });

            this.getPlayerProfile({PlayerID: data.playerId});
        }
        else {
            $('.playerName').html(`<h2>Player Not Found</h2>`);
        }
    }

    /**
     * WS Get Player Basic Info
     * @param params
     */
    getPlayerInfo(params) {
        this.socket.send(JSON.stringify({action: 'playerInfo', value: params}));
    }

    /**
     * WS Get Player Profile Data
     * @param params
     */
    getPlayerProfile(params) {
        this.socket.send(JSON.stringify({action: 'playerProfile', value: params}));
    }

    /**
     * Parse Player Info
     * @param data
     */
    playerInfo(data) {
        const info = data.commonPlayerInfo[0];
        let html = `<blockquote>
                <p>Team: ${info.teamName}</p>
                <p>${info.position}</p>
                <p>${info.weight}/${info.height}</p>
                <p>Exp: ${info.seasonExp} years</p>
                <p>From: ${info.country}</p>
            </blockquote>`;

        $('.playerInfo').html(html);
    }

    /**
     * Parse Player Statistics
     * @param data
     */
    playerProfile(data) {
        let html = `<table class="statsTable">
                        <thead>
                            <tr>
                                <th>season</th>
                                <th>team</th>
                                <th>ast</th>
                                <th>blk</th>
                                <th>dreb</th>
                                <th>fG3A</th>
                                <th>fG3M</th>
                                <th>fg3Pct</th>
                                <th>fgPct</th>
                                <th>fga</th>
                                <th>fgm</th>
                                <th>ftPct</th>
                                <th>fta</th>
                                <th>ftm</th>
                                <th>gp</th>
                                <th>gs</th>
                                <th>min</th>
                                <th>oreb</th>
                                <th>pf</th>
                                <th>pts</th>
                                <th>reb</th>
                            </tr>
                        </thead>
                        <tbody>`;
        const regularSeason = data.seasonTotalsRegularSeason;
        if(regularSeason) {
            for(let item of regularSeason.reverse()) {
                html += `<tr>
                            <td>${item.seasonId}</td>
                            <td>${item.teamAbbreviation}</td>
                            <td>${item.ast}</td>
                            <td>${item.blk}</td>
                            <td>${item.dreb}</td>
                            <td>${item.fG3A}</td>
                            <td>${item.fG3M}</td>
                            <td>${item.fg3Pct}</td>
                            <td>${item.fgPct}</td>
                            <td>${item.fga}</td>
                            <td>${item.fgm}</td>
                            <td>${item.ftPct}</td>
                            <td>${item.fta}</td>
                            <td>${item.ftm}</td>
                            <td>${item.gp}</td>
                            <td>${item.gs}</td>
                            <td>${item.min}</td>
                            <td>${item.oreb}</td>
                            <td>${item.pf}</td>
                            <td>${item.pts}</td>
                            <td>${item.reb}</td>
                        </tr>`;
            }
        }
        html += `</body>
                </table>`;

        $('.playerStats').html(html);
    }
}


$(document).ready(function () {
    new NBAplayers();
});