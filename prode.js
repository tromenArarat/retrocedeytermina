const url = 'https://api.football-data.org/v4/competitions/CL/matches';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '????'
	}
};

async function fetchear(){
    let response = await fetch(url,options);
    let data = await response.json();
    return data;
}


fetchear().then(e=>console.log(e));

  /*
async function fetchear(){
    let response = await fetch(url,options);
    let data = await response.json();
    return data;
}

async function mostrarEquipos(){
    const data = await fetchear();
    
    const response = data.response;
    
    response.forEach(e => {
        
        if(e.league.name!="Copa de la Liga Profesional"){
            console.log(e.teams.home.name);
            console.log(e.teams.away.name); 
        }
    });
}
*/
  //  mostrarEquipos().then(e=>console.log(e));
// mostrarLogosLiga();
// mostrarEquipos();
