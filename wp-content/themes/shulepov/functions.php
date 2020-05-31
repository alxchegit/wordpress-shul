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
	wp_enqueue_style( 'shulepov', get_stylesheet_uri(), array(), _S_VERSION );
	wp_enqueue_style( 'animate', get_template_directory_uri()."/css/animate.css");

	wp_deregister_script( 'jquery' );	
	// wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.min.js', array(), _S_VERSION, true );
	// wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.4.1.min.js' );
	wp_deregister_script( 'sweetalert2' );
	wp_deregister_style( 'sweetalert2' );
}
add_action( 'wp_enqueue_scripts', 'default_s_scripts' );

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