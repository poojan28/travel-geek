<?php 

function my_theme_get_root_directory() {
    return get_template_directory_uri();
}

function my_theme_get_site_url() {
    return get_bloginfo( 'url' );
}

if ( ! function_exists( 'mytheme_register_nav_menu' ) ) {
 
    function mytheme_register_nav_menu(){
        register_nav_menus( array(
            'primary_menu' => __( 'Primary Menu', 'travel-joy' ),
            'footer_menu'  => __( 'Footer Menu', 'travel-joy' ),
        ) );
    }
    add_action( 'after_setup_theme', 'mytheme_register_nav_menu' );
}

/**
 * Register our sidebars and widgetized areas.
 *
 */
function arphabet_widgets_init() {

	register_sidebar( array(
		'name'          => 'Home right sidebar',
		'id'            => 'home_right_1',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'arphabet_widgets_init' );