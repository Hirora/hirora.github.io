
async function fetchLaunches() {
	const apiUrl = 'https://api.spacexdata.com/v3/launches/upcoming?sort=launch_date_local'
	const response = await fetch(apiUrl, { method: 'get' }).then((response) => response.json())
	
	return response
}

function createList(launches) {
	for (i = 0; i < 4; i++) {
		let launch = launches[i]
		const element = document.createElement('div')
		element.classList.add('grid-container')
		/*element.innerHTML = `
        <p><h2>${launch.mission_name.split(' ')[0]}</h2> <span id="preIcon"></span> ${launch.rocket.rocket_name}</p>
        <p>${formatStamp(launch.launch_date_unix)}</p>
		`*/
		
		element.innerHTML = `
		<div style="color: #5af78e"><b>${launch.mission_name.split(' ')[0]}</b></div>
		<div>${launch.rocket.rocket_name}</div>
		<div>${formatStamp(launch.launch_date_unix)}</div>
		`
		document.getElementById('spacex').appendChild(element);
	}
}

function formatStamp(unixtimestamp){

	// Months array
	var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	// Convert timestamp to milliseconds
	var date = new Date(unixtimestamp*1000);

	// Year
	var year = date.getFullYear();

	// Month
	var month = months_arr[date.getMonth()];

	// Day
	var day = date.getDate();

	// Hours
	var hours = date.getHours();

	// Minutes
	var minutes = "0" + date.getMinutes();

	// Seconds
	var seconds = "0" + date.getSeconds();

	// Display date time in MM-dd-yyyy h:m:s format
	/*var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);*/
	var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2);
 
	return convdataTime

}

window.addEventListener("load", function() {
    let response = fetchLaunches();
    console.log(response);
    
    response.then(function(results) {
    	createList(results);
    })
});
