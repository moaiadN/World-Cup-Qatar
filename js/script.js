
const token = "fad852592e7642feb4a2ab455757aa6e"
const baseUrl = "https://api.football-data.org/v4/competitions/2000"


function getStandings(){
    const url = `${baseUrl}/standings`

    axios.get(url, {
        headers : {
            "X-Auth-Token": token
        }
    }).then((response) => {
       
        
        const standings = response.data.standings
        // console.log(standings)
        document.getElementById("standings").innerHTML = ""
        for(standing of standings){

            let tableContent = ""

           for(row of standing.table){
                tableContent += `
                <!-- Teams -->
                <li class="list-group-item">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-center">
                        <span class="flag">
                            <img class="rounded-circle border border-2" src="${row.team.crest}" alt="" srcset="">
                        </span>
                        <h5 class="m-2"><b>${row.team.tla}</b></h5>
                    </div>
                    <div class="col-sm-2 text-center">${row.won}</div>
                    <div class="col-sm-2 text-center">${row.lost}</div>
                    <div class="col-sm-2 text-center">${row.draw}</div>
                    <div class="col-sm-2 text-center"><b>${row.points}</b></div>
                </div>
              </li>
            `
           }
            const content =`
            <!-- ..Standings.. -->
            <div class="col-sm-6 mb-4">
            <div class="card shadow border-none">
                <div class="card-header bg-primary text-center">
                  <b>${standing.group}</b>
                </div>
                <div class="row m-0 bg-secondary">
                    <div class="col-sm-4 text-center">team</div>
                    <div class="col-sm-2 text-center">W</div>
                    <div class="col-sm-2 text-center">L</div>
                    <div class="col-sm-2 text-center">D</div>
                    <div class="col-sm-2 text-center">Pts</div>
                </div>
                <!-- Teams -->
                <ul class="list-group list-group-flush">
                ${tableContent}
                </ul>
              </div>
        </div>
                
        `
            
            document.getElementById("standings").innerHTML += content
           }
        
    })

}
function getMatches(){
    const url = `${baseUrl}/matches`

    axios.get(url, {
        headers : {
            "X-Auth-Token": token
        }
    }).then((response) => {
          console.log(response.data)
        
        const matches = response.data.matches
     
        document.getElementById("matches").innerHTML = ""
        for(match of matches){
            const homeTeam = match.homeTeam
            const awayTeam = match.awayTeam

            const utcDate = match.utcDate
            const matchTime = new Date(utcDate)
            const dateString = matchTime.getUTCFullYear()+" / "+(matchTime.getUTCMonth()+1)+" / "+matchTime.getUTCDate()+" -  "+matchTime.getUTCHours()+" : "+matchTime.getUTCMinutes()
            
            if(homeTeam.name == null){ continue }
            
            const content = `
            <!--  Matche col  -->
            <div class="col-sm-12">
                <div class="card shadow rounded-pill mt-2 overflow-hidden">
                    <div class="card-body p-0">
                        <div class="row" style="height: 100px;">
                            <!-- Left Team Col -->
                            <div
                                class="r-team col-sm-3 bg-primary d-flex justify-content-center align-content-center ">
                                <div class="d-flex justify-content-center align-content-center flex-column">
                                    <div class="flag">
                                        <img class="rounded-circle"
                                            src="${homeTeam.crest}" alt="" srcset="" width="40px" height="40px">
                                    </div>
                                    <h5 class="m-0"><b>${homeTeam.tla}</b></h5>
                                </div>
                            </div>

                            <!--  Match Info -->
                            <div class="col-sm-6 text-center">
                                <div class="row">
                                    <div class="col-sm-4 m-auto">
                                        <h3> ${match.score.fullTime.home ?? "-"} </h3>
                                    </div>

                                    <div class="col-sm-4 mt-2">
                                        <h6 class="m-0">${match.group}</h6>
                                        <h1 class="m-0">X</h1>
                                        <h6 class="m-0">${dateString}</h6>
                                    </div>

                                    <div class="col-sm-4 m-auto">
                                        <h3> ${match.score.fullTime.away ?? "-"} </h3>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Team Col -->
                            <div
                                class="l-team col-sm-3 bg-primary d-flex justify-content-center align-content-center ">
                                <div class="d-flex justify-content-center align-content-center flex-column">
                                    <div class="flag">
                                        <img class="rounded-circle"
                                            src="${awayTeam.crest}" alt="" srcset="" width="40px" height="40px">
                                    </div>
                                    <h5 class="m-0"><b>${awayTeam.tla}</b></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

        document.getElementById("matches").innerHTML += content
        }
    })

}

getStandings()
getMatches()