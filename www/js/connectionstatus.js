document.addEventListener("deviceready", connInit, false);
function connInit() {
  document.addEventListener("online", toggleCon, false);
	document.addEventListener("offline", toggleCon, false);
	}
function toggleCon(e) {
	console.log("Called",e.type);
	if(e.type == "offline") {
		navigator.notification.alert(
		"Lo siento, pero parece no haber conección al internet.\nCiertas funciones no estrán disponibles.",
		null,
		"Problemas de conección",
		"Ok"
		);
		//navigator.notification.alert("Sorry, you are offline.", phoneGapAlert, "Offline!","Ok");
		
	} else {
		//alert("¡Bien!. Ya tiene conección al internet");
		//navigator.notification.alert("Woot, you are back online.", phoneGapAlert, "Online!","Ok");
	//	setupButtonHandler();
	}
}