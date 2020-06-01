<?php
/**
 * default_s functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package default_s
 */


/*
*
*удаление админбара и css стиля в wp_head https://stackoverflow.com/questions/36853264/mysterious-margins-on-webpage
*
*/
show_admin_bar( false );
add_action('get_header', 'remove_admin_bar_weird_css');
function remove_admin_bar_weird_css() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}

/*
*
*
**/
if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

// удаление emoji http://wordpressinside.ru/plugins/otklyuchit-emoji/
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
// function default_s_content_width() {
// 	// This variable is intended to be overruled from themes.
// 	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
// 	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
// 	$GLOBALS['content_width'] = apply_filters( 'default_s_content_width', 640 );
// }
// add_action( 'after_setup_theme', 'default_s_content_width', 0 );


/**
 * Enqueue scripts and styles.
 */
function default_s_scripts() {
	wp_enqueue_style( 'shulepov', get_template_directory_uri() . "/css/style.css" );
	wp_enqueue_style( 'animate', get_template_directory_uri()."/css/animate.css");

	wp_deregister_script( 'jquery' );	
	// wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.min.js', array(), _S_VERSION, true );
	// wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.4.1.min.js' );
	wp_enqueue_script( 'all_js', get_template_directory_uri() . '/js/all-js.js', array(), _S_VERSION, true );

	 
}
add_action( 'wp_enqueue_scripts', 'default_s_scripts' );

function add_async_to_script( $tag, $handle ) {
    if ( 'all_js' !== $handle ) {
        return $tag;
    }
 
    return str_replace( ' src', ' defer="defer" src', $tag );
}
add_filter( 'script_loader_tag', 'add_async_to_script', 10, 2 );
/**
 * Implement the Custom Header feature.
 */
// require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
// require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
// require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
// require get_template_directory() . '/inc/customizer.php';
 


add_action( 'wp_head', 'header_scripts' );

function header_scripts() { 

}

add_action( 'wp_footer', 'footer_scripts' );
function footer_scripts() {
?>
<script>
var internal_js_delay_load = 10000;
	    var js_delay_load = 10000;
		var internal_css_delay_load = 10000;
		var google_fonts_delay_load = 2000;
		var lazy_load_js=[];
		
		var internal_js=[];

        var lazy_load_css=[];

        var optimize_images_json=[];

		var googlefont=null;

       

        var wnw_first_js = false;
		
		var wnw_int_first_js = false;

        var wnw_first_inner_js = false;

        var wnw_first_css = false;

		var wnw_first_google_css = false;

        var wnw_first = false;

        var wnw_optimize_image = false;

		var mousemoveloadimg = false;
        var page_is_scrolled = false;
        
		setTimeout(function(){load_googlefont();},google_fonts_delay_load);

        window.addEventListener("load", function(event){
			setTimeout(function(){load_intJS_main();},internal_js_delay_load);
			setTimeout(function(){load_extJS();},js_delay_load);
			setTimeout(function(){load_extCss();},internal_css_delay_load);
            lazyloadimages(0);
        });

        window.addEventListener("scroll", function(event){
           load_all_js();
		   load_extCss();
		});

		window.addEventListener("mousemove", function(){ 
			load_all_js();
			load_extCss();
		});

		window.addEventListener("touchstart", function(){ 
			load_all_js();
			load_extCss();
		});

		function load_googlefont(){
			if(wnw_first_google_css == false && typeof googlefont != undefined && googlefont != null && googlefont.length > 0){
				googlefont.forEach(function(src) {
					var load_css = document.createElement("link");
					load_css.rel = "stylesheet";
					load_css.href = src;
					load_css.type = "text/css";
					var godefer2 = document.getElementsByTagName("link")[0];
					if(godefer2 == undefined){
						document.getElementsByTagName("head")[0].appendChild(load_css);
					}else{
						godefer2.parentNode.insertBefore(load_css, godefer2);
					}
				});
				wnw_first_google_css = true;
			}
		}

		function load_all_js(){
				load_intJS_main();
				load_extJS();
        
			
			if(mousemoveloadimg == false){

				var top = this.scrollY;

				lazyloadimages(top);

				mousemoveloadimg = true;

			}

		}
		function insertAfter(newNode, referenceNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
        function load_innerJS(){
           	if(wnw_first_inner_js == false){
			    wnw_first_inner_js = true;
				var inline_scripts = document.getElementsByTagName("script");
				for (ii = 0; ii < inline_scripts.length; ii++) {
					if(inline_scripts[ii].getAttribute("type") !== null && inline_scripts[ii].getAttribute("type") == "lazyload"){
						var s = document.createElement("script");
                        s.innerHTML = inline_scripts[ii].innerHTML;
                        insertAfter(s,inline_scripts[ii]);
						inline_scripts[ii].parentNode.removeChild(inline_scripts[ii]);
					}
				}
            }
		}
        var inner_js_counter = -1;
		var s={};
         function load_extJS() {
			if(wnw_first_js){
				return;
			}
			if(!wnw_int_first_js){
				setTimeout(function(){load_extJS();},1000);
				return;
			}
			wnw_first_js = true;
			var static_script = document.getElementsByTagName("script");
			for (i = 0; i < static_script.length; i++) {
				if(static_script[i].getAttribute("data-src") !== null){
					static_script[i].setAttribute("src",static_script[i].getAttribute("data-src"));
					delete static_script[i].dataset.src;
				}
			}
			
			
        }
        var internal_js_loaded = false;
        var internal_js_called = false;
        var inner_js_counter1 = -1;
		var s1={};
		function load_intJS_main(){
		    if(internal_js_called){
		        return;
		    }
		    internal_js_called = true;
		    load_intJS();
		}
		function delay_if_var_not_exists(var_text){
		    if(typeof(ymaps) !== "object"){
		        console.log(typeof(ymaps));
		      setTimeout(function(){delay_if_var_not_exists(var_text)},200);  
		    }else{
		        load_intJS();
		    }
		}
         function load_intJS() {
			if(wnw_int_first_js){
				return;
			}
			if(inner_js_counter1+1 < internal_js.length){				
                inner_js_counter1++;				
                var script = internal_js[inner_js_counter1];				
            	if(script["src"] !== undefined){					
					s1[inner_js_counter1] = document.createElement("script");
					s1[inner_js_counter1]["type"] = "text/javascript";
					for(var key in script){
						s1[inner_js_counter1].setAttribute(key, script[key]);
					}
					s1[inner_js_counter1].onload=function(){
					    load_intJS();
					    
					    
					};
					document.getElementsByTagName("head")[0].appendChild(s1[inner_js_counter1]);
					
				}else{
					load_intJS();
				}
			}else{
				wnw_int_first_js = true;
				setTimeout(function(){load_innerJS();},100);
			}
			
        }
		
	

    var exclude_lazyload = null;

    var win_width = screen.availWidth;

    function load_extCss(){

        if(wnw_first_css == false && lazy_load_css.length > 0){

            lazy_load_css.forEach(function(src) {

                var load_css = document.createElement("link");

                load_css.rel = "stylesheet";

                load_css.href = src;

                load_css.type = "text/css";

                var godefer2 = document.getElementsByTagName("link")[0];

				if(godefer2 == undefined){

					document.getElementsByTagName("head")[0].appendChild(load_css);

				}else{

					godefer2.parentNode.insertBefore(load_css, godefer2);

				}

            });

            wnw_first_css = true;

        }

    }



    

    window.addEventListener("scroll", function(event){

         var top = this.scrollY;

         lazyloadimages(top);

         lazyloadiframes(top);



    });

    setInterval(function(){lazyloadiframes(top);},8000);

    setInterval(function(){lazyloadimages(0);},3000);

    function lazyload_img(imgs,bodyRect,window_height,win_width){

        for (i = 0; i < imgs.length; i++) {



            if(imgs[i].getAttribute("data-class") == "LazyLoad"){

                var elemRect = imgs[i].getBoundingClientRect(),

                offset   = elemRect.top - bodyRect.top;

                if(elemRect.top != 0 && elemRect.top - window_height < 200 ){

                    /*console.log(imgs[i].getAttribute("data-src")+" -- "+elemRect.top+" -- "+window_height);*/

                    var src = imgs[i].getAttribute("data-src") ? imgs[i].getAttribute("data-src") : imgs[i].src ;

                    var srcset = imgs[i].getAttribute("data-srcset") ? imgs[i].getAttribute("data-srcset") : "";

					

                    imgs[i].src = src;

                    if(imgs[i].srcset != null & imgs[i].srcset != ""){

                        imgs[i].srcset = srcset;

                    }

                    delete imgs[i].dataset.class;

                    imgs[i].setAttribute("data-done","Loaded");

                }

            }

        }

    }

    function lazyload_video(imgs,top,window_height,win_width){

        for (i = 0; i < imgs.length; i++) {

            var source = imgs[i].getElementsByTagName("source")[0];

		    if(typeof source != "undefined" && source.getAttribute("data-class") == "LazyLoad"){

                var elemRect = imgs[i].getBoundingClientRect();

        	    if(elemRect.top - window_height < 0 && top > 0){

		            var src = source.getAttribute("data-src") ? source.getAttribute("data-src") : source.src ;

                    var srcset = source.getAttribute("data-srcset") ? source.getAttribute("data-srcset") : "";

                    imgs[i].src = src;

                    if(source.srcset != null & source.srcset != ""){

                        source.srcset = srcset;

                    }

                    delete source.dataset.class;

                    source.setAttribute("data-done","Loaded");

                }

            }

        }

    }

    function lazyloadimages(top){

        var imgs = document.getElementsByTagName("img");

        var ads = document.getElementsByClassName("lazyload-ads");

        var sources = document.getElementsByTagName("video");

        var bodyRect = document.body.getBoundingClientRect();

        var window_height = window.innerHeight;

        var win_width = screen.availWidth;

        lazyload_img(imgs,bodyRect,window_height,win_width);

        lazyload_video(sources,top,window_height,win_width);

    }

    

    lazyloadimages(0);

    function lazyloadiframes(top){

        var bodyRect = document.body.getBoundingClientRect();

        var window_height = window.innerHeight;

        var win_width = screen.availWidth;

        var iframes = document.getElementsByTagName("iframe");

        lazyload_img(iframes,bodyRect,window_height,win_width);

    }
</script>
<?php
}

/*
*
*https://studio-gost.ru/otklyuchenie-avtoformatirovanie-v-wordpress/
*
// */
// remove_filter(‘the_content’,’wptexturize’); // Отключаем автоформатирование в полном посте
// remove_filter(‘the_excerpt’,’wptexturize’); // Отключаем автоформатирование в кратком(анонсе) посте
// remove_filter(‘comment_text’, ‘wptexturize’); // Отключаем автоформатирование в комментариях