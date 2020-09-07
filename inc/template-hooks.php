<?php
/**
 * Template Hook
 *
 * @package justg
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Header
 *
 * @see justg_header_open()
 * @see justg_header_logo()
 * @see justg_header_menu()
 * @see justg_header_cart()
 * @see justg_header_close()
 */
add_action( 'justg_header', 'justg_header_open' );
add_action( 'justg_header', 'justg_header_logo' );
add_action( 'justg_header', 'justg_header_menu' );
add_action( 'justg_header', 'justg_header_cart' );
add_action( 'justg_header', 'justg_header_close' );

/**
 * Cart Fragment
 * 
 * @see justg_cart_link_fragment()
 * @see justg_widget_shopping_cart_button_view_cart()
 * @see justg_widget_shopping_cart_proceed_to_checkout()
 */
add_filter( 'woocommerce_add_to_cart_fragments', 'justg_cart_link_fragment' );

// Remove default function
remove_action( 'woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_button_view_cart', 10 );
remove_action( 'woocommerce_widget_shopping_cart_buttons', 'woocommerce_widget_shopping_cart_proceed_to_checkout', 20 );

// replace with new function
add_action( 'woocommerce_widget_shopping_cart_buttons', 'justg_widget_shopping_cart_button_view_cart', 10 );
add_action( 'woocommerce_widget_shopping_cart_buttons', 'justg_widget_shopping_cart_proceed_to_checkout', 20 );