# Easy link to sacoronavirus.co.za

To help ensure that South Africans get official, up-to-date information about COVID-19, and to fight fake news and misleading stories, the government has made it compulsory for all domains that end in `.za` to include a visible link to [sacoronavirus.co.za](https://sacoronavirus.co.za) on their landing page. This site is the government's official 'Covid-19 South African Online Portal'.

Modifying a website quickly and elegantly can be tricky. Here is a **quick and easy way to include that link**. You do need some technical knowledge to implement it. Once implemented, your site will show a small tab that users can close. It will stay closed for that visit (or 'session').

This script is tiny (less than 3KB), and does not collect or transmit any data.

## To use

Include this line in your site's HTML:

``` html
<script src="https://corona.ebw.co/sacoronavirus-link.min.js"></script>
```

It's best to place this before the `</body>` tag. To meet the regulations, you only need this on your home page. But if it appears elsewhere, too, that's fine.

### Options

Optionally, you can pass settings to the script. Add these by including this immediately *before* the `<script>` tag mentioned above:

```html
<script>
    var sacoronavirusOptions = {}
</script>
```

Then, inside the `{}`, add any of the following options, separated by commas:

- `backgroundColor`: the background colour of the tab (by default, this is white).
- `font`: the name of the font you want to use by default. The script does not load any fonts, so this should be the name of a font already available on your website.
- `size`: a decimal number by which the tab's size should be multiplied to make it bigger or smaller.
- `textColor`: the colour of the tab's text and icons (by default, this is `#222`, almost black).
- `top`: if you want to position the tab vertically, the distance from the top of the page (by default, the tab is 1rem from the bottom of the page).

For example, to create a larger, pink tab, with a Source Sans Pro font and purple text, 2 rems from the top, you'd add:

```html
<script>
    var sacoronavirusOptions = {
        backgroundColor: 'pink',
        font: 'Source Sans Pro',
        size: '1.5',
        textColor: 'purple',
        top: '2rem'
    }
</script>
```

### Using in WordPress

If you have a WordPress site, this repo also works as a WordPress plugin. Just copy it to your `wp-content/plugins` directory, then activate the plugin in your WordPress admin. If you use the plugin, you cannot configure the script's options at present.

There are many other ways to add the script tag, depending on how your site is built. The simplest option is often to use a plugin for adding scripts.

We have successfully used the [Header and Footer Scripts plugin](https://wordpress.org/plugins/header-and-footer-scripts/) for this. Install the plugin, and add the tags as described above to the plugin's 'Scripts in footer' box.

## Contributing

If you have feedback or changes, please log an issue or a pull request.

This plugin was created by [Electric Book Works](https://electricbookworks.com) with design by [Hybrid Creative](https://hybridcreative.co.za).
