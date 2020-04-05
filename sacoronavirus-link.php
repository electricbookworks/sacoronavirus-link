<?php
/*
Plugin Name: SACoronavirus Link Plugin
Plugin URI: https://github.com/electricbookworks/sacoronavirus-link
Description: Places sa coronavirus links on wordpress site.
Version: 1.0.0
Author: Electric Book Works / Lateral Alternative CC
Author URI: https://www.electricbook.works / https://www.lateral.co.za
License: GPL 3.0
*/
function sacoronavirus_link_wp_enqueue_scripts() {
	if (is_home()) {
		$url = plugins_url() . '/' . basename(dirname(__FILE__)) . '/';
		wp_enqueue_script('sacoronavirus-link', $url . '/dist/sacoronavirus-link.min.js');
	}
}

add_action('wp_enqueue_scripts', 'sacoronavirus_link_wp_enqueue_scripts');
