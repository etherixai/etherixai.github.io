/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
	breakpoints({
		default:   ['1681px',   null       ],
		xlarge:    ['1281px',   '1680px'   ],
		large:     ['981px',    '1280px'   ],
		medium:    ['737px',    '980px'    ],
		small:     ['481px',    '736px'    ],
		xsmall:    ['361px',    '480px'    ],
		xxsmall:   [null,       '360px'    ]
	});

	// Firebase Setup
	const firebaseConfig = {
		apiKey: "AIzaSyA44SNXedI52T1GIftDgBGRw4RQscj2hgY",
		authDomain: "etherixai.firebaseapp.com",
		projectId: "etherixai",
		storageBucket: "etherixai.firebasestorage.app",
		messagingSenderId: "1080577712222",
		appId: "1:1080577712222:web:c7a9ab151b379afe73d4cf",
		measurementId: "G-PZ0CZ7B7FE"
	};

	firebase.initializeApp(firebaseConfig);
	const auth = firebase.auth();

	window.registerUser = function() {
		const email = document.getElementById("register-email").value;
		const password = document.getElementById("register-password").value;

		auth.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				alert("Registered Successfully!");
				console.log("User:", userCredential.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	window.loginUser = function() {
		const email = document.getElementById("login-email").value;
		const password = document.getElementById("login-password").value;

		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				alert("Login Successful!");
				console.log("User:", userCredential.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly();

	// Background.
	$wrapper._parallax(0.925);

	// Nav Panel.
	$navPanelToggle = $(
		'<a href="#navPanel" id="navPanelToggle">Menu</a>'
	).appendTo($wrapper);

	$header.scrollex({
		bottom: '5vh',
		enter: function() {
			$navPanelToggle.removeClass('alt');
		},
		leave: function() {
			$navPanelToggle.addClass('alt');
		}
	});

	$navPanel = $(
		'<div id="navPanel">' +
			'<nav></nav>' +
			'<a href="#navPanel" class="close"></a>' +
		'</div>'
	).appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-navPanel-visible'
		});

	$navPanelInner = $navPanel.children('nav');

	var $navContent = $nav.children();

	breakpoints.on('>medium', function() {
		$navContent.appendTo($nav);
		$nav.find('.icons, .icon').removeClass('alt');
	});

	breakpoints.on('<=medium', function() {
		$navContent.appendTo($navPanelInner);
		$navPanelInner.find('.icons, .icon').addClass('alt');
	});

	if (browser.os == 'wp' && browser.osVersion < 10)
		$navPanel.css('transition', 'none');

	var $intro = $('#intro');

	if ($intro.length > 0) {
		if (browser.name == 'ie') {
			$window.on('resize.ie-intro-fix', function() {
				var h = $intro.height();
				if (h > $window.height())
					$intro.css('height', 'auto');
				else
					$intro.css('height', h);
			}).trigger('resize.ie-intro-fix');
		}

		breakpoints.on('>small', function() {
			$main.unscrollex();
			$main.scrollex({
				mode: 'bottom',
				top: '25vh',
				bottom: '-50vh',
				enter: function() {
					$intro.addClass('hidden');
				},
				leave: function() {
					$intro.removeClass('hidden');
				}
			});
		});

		breakpoints.on('<=small', function() {
			$main.unscrollex();
			$main.scrollex({
				mode: 'middle',
				top: '15vh',
				bottom: '-15vh',
				enter: function() {
					$intro.addClass('hidden');
				},
				leave: function() {
					$intro.removeClass('hidden');
				}
			});
		});
	}

})(jQuery);
