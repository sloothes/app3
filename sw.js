//	app3/sw.js

	self.version = 1;
	var debugMode = true;

	var libraries = [

		"/js/Objectid.js",
		"/js/rawdeflate.js",
		"/js/rawinflate.js",
		"/js/jquery.min.js",
		"/js/zangodb.min.js",
		"/js/signals.min.js",
		"/js/validator.min.js",
		"/js/bootstrap.min.js",

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

	self.addEventListener( "install", function () {

		caches.open( "libraries" ).then( function( cache ){

			libraries.forEach( function ( script ) {

				cache.add( script ).catch( function () {

					console.error( "[SW] Cound\'t cache:", script );

				});

			});

		});

	});

	self.addEventListener( "fetch", function ( event ) {

		const request = event.request;
		event.respondWith( cacheFirst( request ) );

	});

	function cacheFirst( request ) {

		caches.match( request ).then( function( cachedResponse ){

			if ( cachedResponse === undefined ) {

				debugMode && console.log( "[SW] Not cached:", request.url );
				return fetch( request );

			} else {

				return cachedResponse;

			}

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

