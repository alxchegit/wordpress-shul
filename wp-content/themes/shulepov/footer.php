
<!-- footer -->

<script type="lazyload">(function($) {
			$(function() {
				$(".wpcf7-countrytext").countrySelect({
					
				});
				$(".wpcf7-phonetext").intlTelInput({
					autoHideDialCode: false,
					autoPlaceholder: "off",
					nationalMode: false,
					separateDialCode: false,
					hiddenInput: "full_number",
						
				});
			});
		})(jQuery);</script> 

<!-- <script type='text/javascript' src='https://shulepov-code.ru/wp-content/themes/shulepov/assets/js/scripts.min.js'></script>  -->
<script type='text/javascript' src='<?php bloginfo( 'template_directory' ) ?>/assets/js/scripts.min.js'></script> 

<script type="lazyload">var fb_timeout, fb_opts={'overlayShow':true,'hideOnOverlayClick':true,'showCloseButton':true,'margin':20,'centerOnScroll':false,'enableEscapeButton':true,'autoScale':true };
if(typeof easy_fancybox_handler==='undefined'){
var easy_fancybox_handler=function(){
jQuery('.nofancybox,a.wp-block-file__button,a.pin-it-button,a[href*="pinterest.com/pin/create"],a[href*="facebook.com/share"],a[href*="twitter.com/share"]').addClass('nolightbox');
/* IMG */
var fb_IMG_select='a[href*=".jpg"]:not(.nolightbox,li.nolightbox>a),area[href*=".jpg"]:not(.nolightbox),a[href*=".jpeg"]:not(.nolightbox,li.nolightbox>a),area[href*=".jpeg"]:not(.nolightbox),a[href*=".png"]:not(.nolightbox,li.nolightbox>a),area[href*=".png"]:not(.nolightbox),a[href*=".webp"]:not(.nolightbox,li.nolightbox>a),area[href*=".webp"]:not(.nolightbox)';
jQuery(fb_IMG_select).addClass('fancybox image');
var fb_IMG_sections=jQuery('.gallery,.wp-block-gallery,.tiled-gallery,.wp-block-jetpack-tiled-gallery');
fb_IMG_sections.each(function(){jQuery(this).find(fb_IMG_select).attr('rel','gallery-'+fb_IMG_sections.index(this));});
jQuery('a.fancybox,area.fancybox,li.fancybox a').each(function(){jQuery(this).fancybox(jQuery.extend({},fb_opts,{'transitionIn':'elastic','easingIn':'easeOutBack','transitionOut':'elastic','easingOut':'easeInBack','opacity':false,'hideOnContentClick':false,'titleShow':true,'titlePosition':'over','titleFromAlt':true,'showNavArrows':true,'enableKeyboardNav':true,'cyclic':false}))});
/* Inline */
jQuery('a.fancybox-inline,area.fancybox-inline,li.fancybox-inline a').each(function(){jQuery(this).fancybox(jQuery.extend({},fb_opts,{'type':'inline','autoDimensions':true,'scrolling':'no','easingIn':'easeOutBack','easingOut':'easeInBack','opacity':false,'hideOnContentClick':false,'titleShow':false}))});};
jQuery('a.fancybox-close').on('click',function(e){e.preventDefault();jQuery.fancybox.close()});
};
var easy_fancybox_auto=function(){setTimeout(function(){jQuery('#fancybox-auto').trigger('click')},1000);};
jQuery(easy_fancybox_handler);jQuery(document).on('post-load',easy_fancybox_handler);
jQuery(easy_fancybox_auto);</script>  


<div id="popup-form" class="popup-block mfp-hide">
	<h3>ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ</h3>
	<div role="form" class="wpcf7" id="wpcf7-f4838-o2" lang="ru-RU" dir="ltr">
		<div class="screen-reader-response" aria-live="polite"> </div>
		<form action="/#wpcf7-f4838-o2" method="post" class="wpcf7-form" novalidate="novalidate">
			<div style="display: none;"> 
				<input type="hidden" name="_wpcf7" value="4838" /> 
				<input type="hidden" name="_wpcf7_version" value="5.1.9" /> 
				<input type="hidden" name="_wpcf7_locale" value="ru_RU" /> 
				<input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f4838-o2" /> 
				<input type="hidden" name="_wpcf7_container_post" value="0" />
			</div> 
			<label for="input-name">Ваше имя: <span class="wpcf7-form-control-wrap user-name">
				<input type="text" name="user-name" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" id="input-name" aria-required="true" aria-invalid="false" /></span> 
			</label> 
			<label for="input-phone">Телефон: <span class="wpcf7-form-control-wrap user-phone">
				<input type="tel" name="user-phone" value="" id="input-phone" class="wpcf7-form-control wpcf7mf-mask wpcf7-mask wpcf7-validates-as-required user-phone" size="40" aria-required="1" placeholder="+7(___) ___-__-__" data-mask="+7(___) ___-__-__" /></span> 
			</label> 
			<button type="submit" class="btn btn-red">Отправить</button>

			<noscript>
				<div class="wpcf7-response-output wpcf7-spam-blocked">Your browser does not support JavaScript!. Please enable javascript in your browser in order to get form work properly. </div> 
			</noscript>

			<script type="lazyload">if(contactform === undefined){
							var contactform = [];
						}
						var innerVal = [4838,'mail_sent_ok','Спасибо за Ваше сообщение. Оно успешно отправлено.'];
						contactform.push(innerVal);
						var innerVal = [4838,'mail_sent_ng','При отправке сообщения произошла ошибка. Пожалуйста, попробуйте ещё раз позже.'];
						contactform.push(innerVal);
						var innerVal = [4838,'validation_error','Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз.'];
						contactform.push(innerVal);
						var innerVal = [4838,'spam','При отправке сообщения произошла ошибка. Пожалуйста, попробуйте ещё раз позже.'];
						contactform.push(innerVal);
						var innerVal = [4838,'accept_terms','Вы должны принять условия и положения перед отправкой вашего сообщения.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_required','Поле обязательно для заполнения.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_too_long','Поле слишком длинное.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_too_short','Поле слишком короткое.'];
						contactform.push(innerVal);
						var innerVal = [4838,'upload_failed','При загрузке файла произошла неизвестная ошибка.'];
						contactform.push(innerVal);
						var innerVal = [4838,'zipping_failed','There was an error in zippng the files.'];
						contactform.push(innerVal);
						var innerVal = [4838,'upload_file_type_invalid','Вам не разрешено загружать файлы этого типа.'];
						contactform.push(innerVal);
						var innerVal = [4838,'upload_file_too_large','Файл слишком большой.'];
						contactform.push(innerVal);
						var innerVal = [4838,'upload_failed_php_error','При загрузке файла произошла ошибка.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_date','Формат даты некорректен.'];
						contactform.push(innerVal);
						var innerVal = [4838,'date_too_early','Введённая дата слишком далеко в прошлом.'];
						contactform.push(innerVal);
						var innerVal = [4838,'date_too_late','Введённая дата слишком далеко в будущем.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_number','Формат числа некорректен.'];
						contactform.push(innerVal);
						var innerVal = [4838,'number_too_small','Число меньше минимально допустимого.'];
						contactform.push(innerVal);
						var innerVal = [4838,'number_too_large','Число больше максимально допустимого.'];
						contactform.push(innerVal);
						var innerVal = [4838,'quiz_answer_not_correct','Неверный ответ на проверочный вопрос.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_email','Неверно введён электронный адрес.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_url','Введён некорректный URL адрес.'];
						contactform.push(innerVal);
						var innerVal = [4838,'invalid_tel','Введён некорректный телефонный номер.'];
						contactform.push(innerVal);
						var innerVal = [4838,'gdpr',''];
						contactform.push(innerVal);</script>
				<div class="wpcf7-response-output wpcf7-display-none" aria-hidden="true"> </div>
		</form>
	</div>
</div> 


<script type="lazyload">/*Menu*/
    $("#navToggle").click(function() {
        $(this).toggleClass("active");
        $(".overlay").toggleClass("open");
        // this line ▼ prevents content scroll-behind
        $("body").toggleClass("locked");
    });
    $('.overlay').click(function() {
        $(this).removeClass('open');
        $('.navBurger').removeClass('active');
    });
</script> 

<script type="lazyload">jQuery(document).ready(function() {
	jQuery("#togglers").click(function() {
	  		openbox('boxx', this);
			return false;
	});

	function openbox(id, togglers) {
		var div = document.getElementById(id);
		if(div.style.display == 'flex') {
			div.style.display = 'none';
			togglers.innerHTML = '<i class="fas fa-comments togimg"></i>';
		}
		else {
			div.style.display = 'flex';
			togglers.innerHTML = '<i class="fas fa-times"></i>';
		}
	}
	});
	jQuery(document).ready(function() {
	if(device.ios() || device.macos()) {
	jQuery('.imes').attr("style", "display: inline-block !important");
	}else{
	jQuery('.imes').attr("style", "display: none !important");
	}
	});
</script> 


<ul class="social-links text-center">
	<li class="social-links__item"> 
		<a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
	<li class="social-links__item"> 
		<a href="#" target="_blank"><i class="fab fa-youtube"></i></a></li>
	<li class="social-links__item"> 
		<a href="#" target="_blank"><i class="fab fa-behance"></i></a></li>
	<li class="social-links__item"> 
		<a href="#" target="_blank"><i class="fab fa-vk"></i></a></li>
	<li class="social-links__item"> 
		<a href="#" target="_blank"> <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 150 150" style="enable-background:new 0 0 150 150;" xml:space="preserve">
		<style  type="text/css">.fl{fill:#00e2bc;}</style><g> <path class="fl" d="M0,144C0,98,0,52,0,6c1.2-2.8,3.4-4.6,6-6c45.7,0,91.3,0,137,0c3.5,0.7,5.5,3,7,6c0,46,0,92,0,138		c-1.2,2.8-3.4,4.6-6,6c-46,0-92,0-138,0C3.4,148.6,1.2,146.8,0,144z M27.2,76c0,9.8,0,19.7,0,29.5c0,12,0.6,12.5,12.7,11.6		c3.8-0.3,5.2-1.8,5.2-5.6c-0.2-7.7,0.1-15.3-0.1-23c-0.1-3.8,0.7-5.4,4.9-5.1c5.3,0.4,10.7-0.1,16,0.1c4,0.2,5.4-1.7,5.3-5.3		c0-1.3,0-2.7,0-4c0.1-3.7-1.5-5.4-5.5-5.2c-5.8,0.2-11.7,0-17.5,0.1c-2.4,0.1-3.2-0.7-3.1-3.1c0.2-4.7,0.2-9.3,0-14		c-0.2-3.2,0.7-4.4,4.1-4.2c6.1,0.3,12.3,0,18.5,0.1c5.7,0.1,5.4-4,5.4-7.6c0-3.5,0.5-7.5-5.4-7.4c-10.3,0.3-20.6,0.1-31,0.1		c-8.4,0-9.3,0.9-9.3,9.5C27.2,53.7,27.2,64.8,27.2,76z M88.3,73.5c0,11.7,0,23.3,0,35c0,7.1,1.4,8.5,8.4,8.5c8.3,0,16.6-0.1,25,0.1		c3.7,0.1,5.2-1.5,5.3-4.9c0.1-2,0.1-4-0.1-6c-0.2-2.7-1.6-4.2-4.5-4.1c-3.8,0.1-7.7-0.2-11.5,0.1c-3.7,0.3-5.1-0.7-5-4.8		c0.3-17.6,0.1-35.3,0.1-52.9c0-11.7,2.1-11.5-11.6-11.5c-4.5,0-6.2,1.6-6.2,6.2C88.4,50.5,88.3,62,88.3,73.5z"/> </g> </svg> </a></li>
	<li class="social-links__item"> 
		<a href="#" target="_blank"> 
			<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 124 100" style="enable-background:new 0 0 124 100;" xml:space="preserve">
			<style  type="text/css">.freelance{fill:#00e2bc;}</style><g> <path class="freelance" d="M41.1,97.9c-1.6,0-3.2,0-4.8,0c1.9-7.8,3.8-15.6,5.9-23.9c-4.7,0-8.9,0.2-13.2,0C17.8,73.3,4.8,64.1,4.8,46.6		c0-11.8,1.6-15.1,3.7-18.8C16.2,14.1,28.2,6.3,43.1,2.4c25,0,49.9,0,74.9,0.1c1.2,0,3.8-1.5,3.3,1.8c-2.9,4.6-5.3,9.6-9.5,13.4		c-8.1,7.5-17.7,9.5-28.3,8.5c-3.2-0.3-4.8,0.5-5.5,4c-1,5.4-2.7,10.8-4.3,16.1c-0.8,2.9-0.3,3.9,3,3.8c9.4-0.2,18.8,0,28.1-0.1		c3.4-0.1,3.7,1.1,2.5,3.9c-5,10.9-13.3,17.7-25.1,19.8c-4.2,0.7-8.6,0.2-12.9,0.2c-1.4,0-2.8-0.1-3.4,1.8		C61.8,87.7,52.9,94.3,41.1,97.9z M41.1,50.2c7.6-0.1,7.6-0.1,9.5-7.4c0.6-2.1,1.2-4.3,1.7-6.4c2.9-10.8,2.9-10.8-8.4-10.1		c-7.7,0.5-14,5.4-15.8,12.3c-1.4,5.5,1.6,10.3,7.2,11.3C37.3,50.2,39.2,50.1,41.1,50.2z"/> </g> </svg> </a></li>
</ul>


<div id="boxx">
	<div style="position:relative;"> 
		<a href="#" target="_blank" class="tele_comp" title="Написать в Telegram"><i class="fab fa-telegram-plane"></i></a> 
		<a href="#" target="_blank" title="Написать в Whatsapp"><i class="fab fa-whatsapp"></i></a> 
		<a href="#" target="_blank" title="Написать в VK"><i class="fab fa-vk"></i></a> 
		<a href="#" class="mob_view sms" title="Написать смс"><i class="fas fa-sms"></i></a> 
		<a href="#" class="mob_view imes" title="Написать в imessage"><i class="fas fa-comment-dots"></i></a> 
		<a href="#" title="Позвонить"><i class="fas fa-phone"></i></a> 
		<a href="#" target="_blank" title="Написать письмо"><i class="fas fa-envelope"></i></a>
	</div>
</div> 


<a id="togglers" href="#"><i class="fas fa-comments togimg"></i></a>

<!-- <script data-jv-id="5oXzhxWhQF" async="" data-src="//code.jivosite.com/widget.js" ></script>  -->

<div class="fancybox-hidden" style="display: none;">
	<div id="popup_msg">
		<div class="popup-box">
			<div class="popup-title">Спасибо за Вашу заявку! </div>
			<div class="popup-subtitle">Я свяжусь с Вами в течении 30 минут. Так же Вы можете со мной связаться по телефону 
				<a href="#">8-904-634-38-92</a> или написать мне 
				<a href="#" target="_blank">VK</a>
			</div>
		</div>
	</div>
</div>
<!-- 
<script>
	
</script>
 -->
<!-- <script defer="defer" id="main-js" src="https://shulepov-code.ru/wp-content/cache/wnw-cache/all-js/8295453e65c123b3459a2670c37024e5.js"></script> -->

<!-- wp-footer start here v -->
<?php wp_footer(); ?>
<!-- wp_footer ends -->
</body>

</html>