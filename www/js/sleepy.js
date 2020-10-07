function setWake(){
  var wakes = document.getElementById('waketime');
  var waketime = wakes.options[wakes.selectedIndex].value;
  localStorage.setItem("waketime", waketime);  
  console.log("Setting waketime to "+waketime);
}

function setSleep(){
  var sleeps = document.getElementById('sleeptime');
  var sleeptime = sleeps.options[sleeps.selectedIndex].value;
  localStorage.setItem("sleeptime", sleeptime);
  console.log("Setting sleeptime to "+sleeptime);    
}
