const functions = require('firebase-functions');

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.addArvBuscInstrumento = functions.database
	.ref('/usuarios/{userID}')
	.onWrite(event => {
	 	const user = event.data.val();
	 	const userID = event.data.key;
	 
	 	if(user.categorized){
			console.warn("O usuario "+ userID +" já foi inserido!");
			return;
		}
	 	
	 	console.log("Insert reconhecido em usuarios. ID =  "+ userID);
		console.log("Dados do usuário "+ userID +" novo: "+ user);
	 	user.categorized = true;
	 
	 	const promise = event.data.ref.parent.parent.child('noTeste').child(userID).set(user);
	 	//const promise = functions.database.ref('/noTeste/' + userID).set(user);
	 	//const promise = admin.database.ref('noTeste/' + userID).set(user);
	 	return promise;
 	});