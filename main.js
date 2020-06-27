
/** Clock **/

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =
  h + "<span style='color: #5af78e'>:</span>" + m + "<span style='color: #5af78e'>:</span>" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

/** Greeting Message **/

function inRange(number, min, max) {
    return (number >= min && number <= max)
}

function buildMsg() {
    /**
     * Build a nice message for the user.
     * 
     * Following is how the message would be decided.
     * 0 - 5:59 : It's too late, take some sleep
     * 6 - 8:59 : You're up early
     * 9 - 11:59 : Have a good day ahead
     * 12 - 16:59 : Good Afternoon
     * 17 - 19:59 : Good Evening
     * 20 - 23:59 : It's time to wrap up for the day
     */
    date = new Date()
    currentHour = date.getHours()
    currentMinute = date.getMinutes()
    currentTime = currentHour + (0.01 * currentMinute)

    if (inRange(currentTime, 0, 5.59))
        return "It's late, get some sleep"
    if (inRange(currentTime, 6, 8.59))
        return "You're up early"
    if (inRange(currentTime, 9, 11.59))
        return "Have a good day ahead"
    if (inRange(currentTime, 12, 16.59))
        return "Good Afternoon"
    if (inRange(currentTime, 17, 19.59))
        return "Good Evening"
    if (inRange(currentTime, 20, 24))
        return "It's time to wrap up for the day"
    else
        return ""
}


/** Hover Selector **/

function fade(content) {
	let d = document.getElementById("display");

    d.classList.add('hide');
    setTimeout(function() { 
        d.textContent = content;
    }, 150);
    setTimeout(function() { 
        d.classList.remove('hide')
    }, 150);
}

function hoverSetup() {
	/**var mediaLis = document.getElementById("Media").getElementsByTagName("li");
	
	for (let i = 0; i < mediaLis.length; i++) {
		alert(mediaLis[i].getElementsByTagName("a")[0].innerHTML);
	}**/
	
	let media = document.getElementById("media");
	media.addEventListener("mouseover", function(event) {
		if (event.target.tagName == "A") {
			let name = event.target.innerHTML;
			/*document.getElementById("display").innerHTML = name; */
			fade(name);
		}
	}, false);
	
	media.addEventListener("mouseout", function(event) {
		if (event.target.tagName == "A") {
			fade("");
		}
	}, false);
}

window.onload = function() {
    document.getElementById("greeting").textContent = buildMsg();
    startTime();
    hoverSetup();
}

