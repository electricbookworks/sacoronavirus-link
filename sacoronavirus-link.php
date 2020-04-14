<?php
/*
Plugin Name: SACoronavirus Link
Plugin URI: https://github.com/electricbookworks/sacoronavirus-link
Description: Implements a link to the the official South Africa government COVID-19 portal on your site.
Version: 1.0.6
Author: Electric Book Works / Lateral Alternative CC
Author URI: https://www.lateral.co.za
License: GPL 3.0
*/

function sacoronavirus_link_wp_enqueue_scripts()
{
    $settings = sacoronavirus_link_get_js_settings();
    if ((!$settings['homepage']) || (is_home())) {
        $url = plugins_url().'/'.basename(dirname(__FILE__)).'/';
        wp_enqueue_script('sacoronavirus-link', $url.'/dist/sacoronavirus-link.min.js');
        wp_localize_script('sacoronavirus-link', 'sacoronavirusOptions', $settings);
    }
}

add_action('wp_enqueue_scripts', 'sacoronavirus_link_wp_enqueue_scripts');

function sacoronavirus_link_get_options()
{
    $options = get_option('sacoronavirus_link_options');
    $defaults = [
        'backgroundColor' => '#ffffff',
        'textColor' => '#222222',
        'homepage' => is_array($options) && array_key_exists('homepage', $options),
        'top' => '',
        'size' => 1,
        'font' => '',
    ];
    if (!$options) {
        return $defaults;
    }
    foreach ($defaults as $k => $v) {
        if (!array_key_exists($k, $options)) {
            $options[$k] = $v;
        }
    }

    return $options;
}
function sacoronavirus_link_get($option, $options)
{
    if (!$options) {
        $options = sacoronavirus_link_get_options();
    }
    if (!isset($options[$option])) {
        return false;
    }

    return trim($options[$option]);
}

function sacoronavirus_link_get_js_settings()
{
    $options = sacoronavirus_link_get_options();
    $a = [];
    foreach (['homepage', 'font', 'backgroundColor', 'textColor', 'size', 'top'] as $k) {
        $a[$k] = sacoronavirus_link_get($k, $options);
    }

    return $a;
}

function sacoronavirus_link_settings_init()
{
    add_settings_section(
        'sacoronavirus_link_section',
        __('Tab Configuration', 'sacoronavirus_link'),
        'sacoronavirus_link_section_cb',
        'sacoronavirus_link'
    );

    register_setting('sacoronavirus_link', 'sacoronavirus_link_options');

    $options = sacoronavirus_link_get_options();

    add_settings_field(
        'sacoronavirus_link_field_homepage',
        __('Homepage Only', 'sacoronavirus_link'),
        'sacoronavirus_link_field_checkbox_cb',
        'sacoronavirus_link',
        'sacoronavirus_link_section',
        [
            'label_for' => 'sacoronavirus_link_homepage',
            'class' => 'sacoronavirus_link_row',
            'sacoronavirus_link_field_desc' => 'Only show the tab on the Home page.',
            'sacoronavirus_link_field_value' => $options['homepage'],
            'sacoronavirus_link_field_key' => 'homepage',
        ]
    );

    add_settings_field(
        'sacoronavirus_link_field_top',
        __('Show at Top', 'sacoronavirus_link'),
        'sacoronavirus_link_field_text_cb',
        'sacoronavirus_link',
        'sacoronavirus_link_section',
        [
            'label_for' => 'sacoronavirus_link_top',
            'class' => 'sacoronavirus_link_row',
            'sacoronavirus_link_field_value' => $options['top'],
            'sacoronavirus_link_field_key' => 'top',
            'sacoronavirus_link_field_desc' => 'Leave blank to place the tab at the bottom, or specify the distance to place the tab from the top of the screen.',
        ]
    );

    add_settings_field(
        'sacoronavirus_link_field_font',
        __('Font', 'sacoronavirus_link'),
        'sacoronavirus_link_field_text_cb',
        'sacoronavirus_link',
        'sacoronavirus_link_section',
        [
            'label_for' => 'sacoronavirus_link_font',
            'class' => 'sacoronavirus_link_row',
            'sacoronavirus_link_field_value' => $options['font'],
            'sacoronavirus_link_field_key' => 'font',
            'sacoronavirus_link_field_desc' => 'Comma-delimited list of fonts to use, without inverted commas. (eg Arial,Roboto,Sans-Serif)',
        ]
    );

    $colors = ['backgroundColor' => 'Background Color', 'textColor' => 'Text Color'];
    foreach ($colors as $k => $v) {
        add_settings_field(
            "sacoronavirus_link_field_{$k}",
            __($v, 'sacoronavirus_link'),
            'sacoronavirus_link_field_color_cb',
            'sacoronavirus_link',
            'sacoronavirus_link_section',
            [
                'sacoronavirus_link_field_value' => $options[$k],
                'sacoronavirus_link_field_key' => $k,

                'label_for' => "sacoronavirus_link_{$k}",
                'class' => 'sacoronavirus_link_row',
                'sacoronavirus_link_field_desc' => $v.' for the tab',
            ]
        );
    }

    add_settings_field(
        'sacoronavirus_link_field_size',
        __('Size of Tab', 'sacoronavirus_link'),
        'sacoronavirus_link_field_size_cb',
        'sacoronavirus_link',
        'sacoronavirus_link_section',
        [
            'label_for' => 'sacoronavirus_link_size',
            'class' => 'sacoronavirus_link_row',
            'sacoronavirus_link_field_value' => $options['size'],
            'sacoronavirus_link_field_key' => 'size',
            'sacoronavirus_link_field_desc' => 'Scale the tab by this factor (1=normal size)',
        ]
    );
}

add_action('admin_init', 'sacoronavirus_link_settings_init');

function sacoronavirus_link_section_cb($args)
{
    ?>
<p id="<?php echo esc_attr($args['id']); ?>"><?php esc_html_e('Configure the SA Coronavirus Link Tab here.', 'sacoronavirus_link'); ?></p>
<?php
}

function sacoronavirus_link_field_checkbox_cb($args)
{
    $id = $args['label_for'];
    $key = $args['sacoronavirus_link_field_key'];
    $value = $args['sacoronavirus_link_field_value'];
    $desc = $args['sacoronavirus_link_field_desc'];
    $name = "sacoronavirus_link_options[{$key}]"; ?>
 <input type="checkbox" 
 		id="<?php echo $id; ?>" 
 		name="<?php echo $name; ?>]" 
 		<?php if ($value) {
        echo 'checked';
    } ?>
 		/>
 <p class="description">
 <?php esc_html_e($desc, 'sacoronavirus_link'); ?>
 </p>
 <?php
}

function sacoronavirus_link_field_text_cb($args)
{
    $id = $args['label_for'];
    $key = $args['sacoronavirus_link_field_key'];
    $value = $args['sacoronavirus_link_field_value'];
    $desc = $args['sacoronavirus_link_field_desc'];
    $name = "sacoronavirus_link_options[{$key}]"; ?>
 <input type="text" 
 		id="<?php echo $id; ?>" 
 		name="<?php echo $name; ?>" 
 		value="<?php esc_html_e($value); ?>"
 		/>
 <p class="description">
 <?php esc_html_e($desc, 'sacoronavirus_link'); ?>
 </p>
 <?php
}

function sacoronavirus_link_field_color_cb($args)
{
    $id = $args['label_for'];
    $key = $args['sacoronavirus_link_field_key'];
    $value = $args['sacoronavirus_link_field_value'];
    $desc = $args['sacoronavirus_link_field_desc'];
    $name = "sacoronavirus_link_options[{$key}]"; ?>
 <input type="color" 
 		id="<?php echo $id; ?>" 
 		name="<?php echo $name; ?>" 
 		value="<?php esc_html_e($value); ?>"
 		/>
 <p class="description">
 <?php esc_html_e($args['sacoronavirus_link_field_desc'], 'sacoronavirus_link'); ?>
 </p>
 <?php
}

function sacoronavirus_link_field_size_cb($args)
{
    $id = $args['label_for'];
    $key = $args['sacoronavirus_link_field_key'];
    $value = $args['sacoronavirus_link_field_value'];
    $desc = $args['sacoronavirus_link_field_desc'];
    $name = "sacoronavirus_link_options[{$key}]"; ?>
 <input type="number" 
 		id="<?php echo $id; ?>" 
 		name="<?php echo $name; ?>" 
 		min="0.01"
 		max="100"
 		step="0.01"
 		value="<?php echo $value; ?>"
 		/>
 <p class="description">
 <?php esc_html_e($desc, 'sacoronavirus_link'); ?>
 </p>
 <?php
}

function sacoronavirus_link_admin_menu()
{
    $img = base64_encode(file_get_contents(dirname(__FILE__).'/img/icon.svg'));
    $inlineImage = 'data:image/svg+xml;base64,'.$img;
    add_menu_page(
        __('SA Coronavirus Link', 'sacoronavirus_link'),
        __('Coronavirus', 'sacoronavirus_link'),
        'edit_theme_options',
        'sacoronavirus_link',
        'sacoronavirus_link_options_page_html',
        $inlineImage
    );
}

add_action('admin_menu', 'sacoronavirus_link_admin_menu');

function sacoronavirus_link_options_page_html()
{
    if (!current_user_can('edit_theme_options')) {
        return;
    }
    if (isset($_GET['settings-updated'])) {
        add_settings_error('sacoronavirus_link_messages', 'sacoronavirus_link_message', __('Settings Saved', 'sacoronavirus_link'), 'updated');
    }

    settings_errors('sacoronavirus_link_messages'); ?>
 <div class="wrap">
 <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
 <form action="options.php" method="post">
 <?php
 settings_fields('sacoronavirus_link');
    do_settings_sections('sacoronavirus_link');
    submit_button('Save Settings'); ?>
 </form>
 </div>
 <?php
}
