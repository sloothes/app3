//	app3/sw.js

	self.version = 1;
	var debugMode = true;

	const appItems = [

		"/favicon.ico",
		"/three/fonts/helvetiker_regular.typeface.json",

	];

	const libraries = [

		"/js/Objectid.js",
		"/js/rawdeflate.js",
		"/js/rawinflate.js",
		"/js/jquery.min.js",
		"/js/zangodb.min.js",
		"/js/signals.min.js",
		"/js/validator.min.js",
		"/js/bootstrap.min.js",
    	"/js/photoswipe.js",
    	"/js/photoswipe-ui-default.js",
		"/js/MathDecimalAdjustment.js",
		"/js/DeviceDetector.js",

	//	three.
		"/three/three.js",
		"/three/Animation.js",
		"/three/AnimationHandler.js",
		"/three/KeyFrameAnimation.js",
		"/three/EditorControls.js", 
		"/three/TransformControls.js", 
		"/three/SubdivisionModifier.js",
		"/three/UVsDebug.js",
		"/three/shader.js",
		"/three/system.min.js",

		"/js/MW.js",
		"/js/MWtps.js",
		"/js/VirtualInput.js",

	];

	const stylesheets = [

		"/css/joystick.css",
		"/css/anywhere3d.css",
		"/css/jquery.Jcrop.css",
		"/css/bootstrap.min.css",
		"/css/bootbox-dialoges.css",
		"/photoswipe/dist/photoswipe.css",
		"/photoswipe/dist/default-skin/default-skin.css",

	];

	const textures = [

	//	eyes.
		"https://i.imgur.com/VybEXWo.png",
		"https://i.imgur.com/BxzT89R.png",
		"https://i.imgur.com/Si5QWl0.png",

	//	hair.
		"https://i.imgur.com/hvCqpxt.jpg",
		"https://i.imgur.com/uPyhj5R.jpg",
		"https://i.imgur.com/Qh5JtAx.jpg",
		"https://i.imgur.com/NWw7sOL.png",
		"https://i.imgur.com/33FQFCR.png",

	//	male skins.
		"https://i.imgur.com/2xafKkK.jpg", // "light"
		"https://i.imgur.com/4h9rLSg.jpg", // "medium"
		"https://i.imgur.com/mAZgsw8.jpg", // "dark"
		"https://i.imgur.com/V6MSKOT.jpg", // "normal"

	//	female skins.
		"https://i.imgur.com/lk6QpjA.jpg", // "light"
		"https://i.imgur.com/cT7BYGt.jpg", // "medium"
		"https://i.imgur.com/cgjD1Bl.jpg", // "dark"
		"https://i.imgur.com/pRYCYkb.jpg", // "darker"
		"https://i.imgur.com/HEQKHjk.jpg", // "normal"

	//	sky02
		"https://i.imgur.com/AiYr5Bj.jpg", // "posx"
		"https://i.imgur.com/BawPVy4.jpg", // "negx"
		"https://i.imgur.com/OnEYrxP.jpg", // "posy"
		"https://i.imgur.com/t5eKqEL.jpg", // "negy"
		"https://i.imgur.com/L7SNCXP.jpg", // "posz"
		"https://i.imgur.com/7dcYXKc.jpg", // "negz"
	//	sky03
		"https://i.imgur.com/fbLkP5b.jpg", // "posx"
		"https://i.imgur.com/2ezGkl6.jpg", // "negx"
		"https://i.imgur.com/IyXzc4L.jpg", // "posy"
		"https://i.imgur.com/ja5htHQ.jpg", // "negy"
		"https://i.imgur.com/QZDxVvI.jpg", // "posz"
		"https://i.imgur.com/BZ68JvT.jpg", // "negz"
	//	space4.
		"https://i.imgur.com/v6bjQLb.jpg", // "posx"
		"https://i.imgur.com/lwrlr6P.jpg", // "negx"
		"https://i.imgur.com/kKUKBJg.jpg", // "posy"
		"https://i.imgur.com/N0oZlJR.jpg", // "negy"
		"https://i.imgur.com/x9q8z0K.jpg", // "posz"
		"https://i.imgur.com/HYcK7Ii.jpg", // "negz"
	//	space5.
		"https://i.imgur.com/QMKy05Z.jpg", // "posx"
		"https://i.imgur.com/eys5BBV.jpg", // "negx"
		"https://i.imgur.com/8l6Pi8Q.jpg", // "posy"
		"https://i.imgur.com/Z1KEwRy.jpg", // "negy"
		"https://i.imgur.com/wSs16BJ.jpg", // "posz"
		"https://i.imgur.com/DwVYZWm.jpg", // "negz"

	];


	self.addEventListener( "install", function () {

		caches.open( "app" ).then( function( cache ){

			appItems.forEach( function ( url ) {
				cache.add( url ).catch( function () {
					console.error( "[SW] Cound\'t cache:", url );
				});
			});

		}).then( function(){
			return caches.open( "libraries" );
		}).then( function( cache ){

			libraries.forEach( function ( url ) {
				cache.add( url ).catch( function () {
					console.error( "[SW] Cound\'t cache:", url );
				});
			});

		}).then( function(){
			return caches.open( "stylesheets" );
		}).then( function( cache ){

			stylesheets.forEach( function ( url ) {
				cache.add( url ).catch( function () {
					console.error( "[SW] Cound\'t cache:", url );
				});
			});

		}).then( function(){
			return caches.open( "textures" );
		}).then( function( cache ){

			textures.forEach( function ( url ) {
				cache.add( url ).catch( function () {
					console.error( "[SW] Cound\'t cache:", url );
				});
			});

		});

	});

	self.addEventListener( "fetch", function ( event ) {

		const request = event.request;
		event.respondWith( cacheFirst( request ) );

	});

	function cacheFirst( request ) {

		return caches.match( request ).then( function( cachedResponse ){

			if ( cachedResponse === undefined ) {

				debugMode && console.log( "[SW] Not cached:", request.url );
				return fetch( request );

			}

			return cachedResponse;

		});
	}

    function unistall(){

        self.registration.unregister().then(function(){

            return self.clients.matchAll();

        }).then(function(clients) {

            clients.forEach(function(client){
                client.navigate(client.url);  // will be re-installed on reload!
                console.log("[SW] Unistalled from client " + client.url);
            });

        });

    }

