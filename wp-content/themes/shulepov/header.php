<!doctype html>
<html <?php language_attributes(); ?>>
<head>  
	<!-- google tag here -->
	<!-- script gtag -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- google-site-verification -->
	<!-- <link rel="profile" href="https://gmpg.org/xfn/11"> -->

	<title><?php bloginfo( 'name' ) ?></title>
	<link rel="stylesheet" href="<?php bloginfo( 'url' ) ?>/wp-content/cache/wnw-cache/all-css/1d9d03435b40a4e241c130d4be0fa6ca.css" />
	<style >@keyframes fadeIn {  to {    opacity: 1;  }}.fade-in {  opacity: 0;  animation: fadeIn .5s ease-in 1 forwards;}.is-paused {  animation-play-state: paused;}</style>
	<style >.wpcf7-submit{
				display:none;
			}
			.recaptcha-btn{
				display:block;
			}
			.grecaptcha-badge {display: none;}</style> 
	<script type="lazyload">var contactform = [];
			var checkIfCalled = true;
			var renderGoogleInvisibleRecaptchaFront = function() {
				// prevent form submit from enter key
				jQuery("input[name=_wpcf7]").attr("class","formid");
					jQuery('.wpcf7-form').on('keyup keypress', "input", function(e) {
					  var keyCode = e.keyCode || e.which;
					  if (keyCode === 13) {
						e.preventDefault();
						return false;
					  }
					});

				jQuery('.wpcf7-submit').each(function(index){

					var checkexclude = 0;
					var form = jQuery(this).closest('.wpcf7-form');
					var value = jQuery(form).find(".formid").val();
					// check form exclude from invisible recaptcha
									if(checkexclude == 0){
						// Hide the form orig submit button
						form.find('.wpcf7-submit').hide();

						// Fetch class and value of orig submit button
						btnClasses = form.find('.wpcf7-submit').attr('class');
						btnValue = form.find('.wpcf7-submit').attr('value');

						// Add custom button and recaptcha holder

						form.find('.wpcf7-submit').after('<input type="button" id="wpcf-custom-btn-'+index+'" class="'+btnClasses+'  recaptcha-btn recaptcha-btn-type-css" value="'+btnValue+'" title="'+btnValue+'" >');
						form.append('
	<div class="recaptcha-holder" id="recaptcha-holder-'+index+'">
	</div>');
						// Recaptcha rendenr from here
						var holderId = grecaptcha.render('recaptcha-holder-'+index,{
									'sitekey':'6LeELvwUAAAAAC6KzKDC9q1vkAjAQuL2UTULNOlY',
									'size': 'invisible',
									'badge' : 'bottomright', // possible values: bottomright, bottomleft, inline
									'callback' : function (recaptchaToken) {
										//console.log(recaptchaToken);
										var response=jQuery('#recaptcha-holder-'+index).find('.g-recaptcha-response').val();
										//console.log(response);
										//Remove old response and store new respone
										jQuery('#recaptcha-holder-'+index).parent().find(".respose_post").remove();
										jQuery('#recaptcha-holder-'+index).after('<input type="hidden" name="g-recaptcha-response"  value="'+response+'" class="respose_post">')
										grecaptcha.reset(holderId);

										if(typeof customCF7Validator !== 'undefined'){
											if(!customCF7Validator(form)){
												return;
											}
										}
										// Call default Validator function
										else if(contactFormDefaultValidator(form)){
											return;
										}
										else{
											// hide the custom button and show orig submit button again and submit the form
											jQuery('#wpcf-custom-btn-'+index).hide();
											form.find('input[type=submit]').show();
											form.find("input[type=submit]").click();
											form.find('input[type=submit]').hide();
											jQuery('#wpcf-custom-btn-'+index).attr('style','');
										}
									}
							},false);

						// action call when click on custom button
						jQuery('#wpcf-custom-btn-'+index).click(function(event){
							event.preventDefault();
							// Call custom validator function
							if(typeof customCF7Validator == 'function'){
								if(!customCF7Validator(form)){
									return false;
								}
							}
							// Call default Validator function
							else if(contactFormDefaultValidator(form)){
								return false;
							}
							else if(grecaptcha.getResponse(holderId) != ''){
								grecaptcha.reset(holderId);
							}
							else{
								// execute the recaptcha challenge
								grecaptcha.execute(holderId);
							}
						});
					}
				});
			}</script>
	<script async="" defer="defer" data-src="https://www.google.com/recaptcha/api.js?onload=renderGoogleInvisibleRecaptchaFront&render=explicit" ></script>

	<link rel="canonical" href="https://shulepov-code.ru/" />
	<link rel='dns-prefetch' href='//code.jquery.com' />
	<link rel="alternate" type="application/rss+xml" title="Частный веб-разработчик Шулепов Александр &raquo; Лента" href="https://shulepov-code.ru/feed/" />
	<link rel="alternate" type="application/rss+xml" title="Частный веб-разработчик Шулепов Александр &raquo; Лента комментариев" href="https://shulepov-code.ru/comments/feed/" />
	<link rel='stylesheet' id='animate-css'  href='https://shulepov-code.ru/wp-content/themes/shulepov/css/animate.css' type='text/css' media='all' /> 
	<script type='text/javascript' src='https://code.jquery.com/jquery-3.4.1.min.js'></script>       
	<link rel='https://api.w.org/' href='https://shulepov-code.ru/wp-json/' />
	<meta name="generator" content="WordPress 5.4.1" />
	<link rel="alternate" type="application/json+oembed" href="https://shulepov-code.ru/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fshulepov-code.ru%2F" />
	<link rel="alternate" type="text/xml+oembed" href="https://shulepov-code.ru/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fshulepov-code.ru%2F&#038;format=xml" />
	<link rel="icon" href="https://shulepov-code.ru/wp-content/uploads/2019/10/favicon.ico" sizes="32x32" />
	<link rel="icon" href="https://shulepov-code.ru/wp-content/uploads/2019/10/favicon.ico" sizes="192x192" />
	<link rel="apple-touch-icon" href="https://shulepov-code.ru/wp-content/uploads/2019/10/favicon.ico" />
	<meta name="msapplication-TileImage" content="https://shulepov-code.ru/wp-content/uploads/2019/10/favicon.ico" />  
	<script type="lazyload">(function (d, w, c) {
	        (w[c] = w[c] || []).push(function() {
	            try {
	                w.yaCounter55302157 = new Ya.Metrika({
	                    id:55302157,
	                    clickmap:true,
	                    trackLinks:true,
	                    accurateTrackBounce:true,
	                    webvisor:true
	                });
	            } catch(e) { }
	        });

	        var n = d.getElementsByTagName("script")[0],
	            s = d.createElement("script"),
	            f = function () { n.parentNode.insertBefore(s, n); };
	        s.type = "text/javascript";
	        s.async = true;
	        s.src = "https://mc.yandex.ru/metrika/watch.js";

	        if (w.opera == "[object Opera]") {
	            d.addEventListener("DOMContentLoaded", f, false);
	        } else { f(); }
	    })(document, window, "yandex_metrika_callbacks");</script> 

	<noscript>
		<div>
			<img data-class="LazyLoad" src="https://shulepov-code.ru/blank.png" data-src="https://mc.yandex.ru/watch/55302157" style="position:absolute; left:-9999px;" alt="" />
		
	</div>
	</noscript>

	<style >@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Montserrat|Oswald&display=swap&subset=cyrillic');</style>
</head>

<body class="home page-template page-template-front-page page-template-front-page-php page page-id-5">
	
	<div class="glitch-wrapper">
		<div class="glitch" data-text="ALXCHE_CODE" style="display:none;">ALXCHE_CODE </div>
	</div>

	<!-- header block -->
	<header class="header header_dark">
		<div class="header-wrap d-flex align-items-center"> 
			<a href="/" class="logo logo-white"> shulepov_code </a>
			<div class="brief-all--wrapper link-brif">
			<div class="brief-prime" onclick=""><i class="fas fa-pencil-alt"></i> Бриф <i class="fas fa-angle-down"></i>
			</div>
			<div class="brief-all"> 
			<a href="/brif-na-razrabotku-sajta/">Бриф на разработку сайта</a> 
			<a href="/brif-na-prodvizhenie-sajta/">Бриф на продвижение сайта</a> 
			<a href="/brif-na-razmeshhenie-reklamy/">Бриф на размещение рекламы</a> 
			<a href="/brif-na-sozdanie-logotipa/">Бриф на создание лого</a>
				</div>
			</div>
			<div class="languages"> 
			<a href="#" class="lang-ru">Eng</a></div> 

			
			<a href="#contacts" class="btn-3d header-btn" id="header-zakazat">
			<div class="side front">Заказать </div>
			<div class="side bottom">Заказать </div> </a>

			<ul class="header-contacts d-flex align-items-center">
				<li class="social-icon"> 
			<a href="tg://resolve?domain=shulepov_code"><i class="fab fa-telegram-plane"></i></a></li>
					<li class="social-icon social-icon_last"> 
			<a href="https://api.whatsapp.com/send?phone=79046343892"><i class="fab fa-whatsapp"></i></a></li>
					<li class="header-phone"> 
			<a href="tel:89046343892">8 (904) 634-38-92</a></li>
					<li class="social-icon"> 
			<a href="https://vk.com/im?sel=33602445"><i class="fab fa-vk"></i></a></li>
			</ul>

			
			<a href="#page11" class="callback-btn d-none"> <i class="fas fa-envelope"></i> </a> 
			<a href="tel:89046343892" class="mobile-phone d-none"> <i class="fas fa-phone"></i> </a>
				
			<!-- правое меню -->
			<div class="overlay">
				<nav class="overlayMenu">
					<ul id="menu-main-menu" class="menu">
						<li id="menu-item-25" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-25">
						<a href="https://shulepov-code.ru/" aria-current="page"><i style="" class="wpmi-icon wpmi-position-before wpmi-align-top fa fa-home"></i>Главная страница</a></li>
						<li id="menu-item-3542" class="d-none menu-item menu-item-type-post_type menu-item-object-page menu-item-3542">
						<a href="https://shulepov-code.ru/dizajn/">Дизайн</a></li>
						<li id="menu-item-3544" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3544">
						<a href="https://shulepov-code.ru/razrabotka/">Разработка сайтов</a></li>
						<li id="menu-item-3543" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3543">
						<a href="https://shulepov-code.ru/prodvizhenie/">SEO-продвижение</a></li>
						<li id="menu-item-4475" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4475">
						<a href="https://shulepov-code.ru/jekspress-sajt/">Экспресс-сайт</a></li>
						<li id="menu-item-31" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-31">
						<a href="https://shulepov-code.ru/sotrudnichestvo/">Сотрудничество</a></li>
						<li id="menu-item-5004" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5004">
						<a href="https://shulepov-code.ru/lichnye-konsultacii/">Личные консультации</a></li>
						<li id="menu-item-28" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-28">
						<a href="https://shulepov-code.ru/portfolio/">Портфолио</a></li>
						<li id="menu-item-26" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-26">
						<a href="https://shulepov-code.ru/blog/">Блог</a></li>
					</ul>

				</nav>
			</div>
		<!--  -->

			<div class="menu__btn hamburger-menu navBurger" role="navigation" id="navToggle"> 
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/></svg>
			</div>
		</div>
	</header>
<!--  -->
