# Easy link to sacoronavirus.co.za

To help ensure that South Africans get official, up-to-date information about COVID-19, and to fight fake news and misleading stories, the government has made it compulsory for all domains that end in `.za` to include a visible link to [sacoronavirus.co.za](https://sacoronavirus.co.za) on their landing page. This site is the government's official 'Covid-19 South African Online Portal'.

Modifying a website quickly and elegantly can be tricky. Here is a **quick and easy way to include that link**. You do need some technical knowledge to implement it. Once implemented, your site will show a small popup that users can close. It will stay closed for that visit (or 'session').

This script is tiny (less than 3KB), and does not collect or transmit any data.

## To use

Include this line in your site's HTML:

``` html
<script src="https://corona.ebw.co/sacoronavirus-link.min.js"></script>
```

It's best to place this before the `</body>` tag. To meet the regulations, you only need this on your home page. But if it appears elsewhere, too, that's fine.

### Options

Optionally, you can pass colour settings to the script. Add these by including this immediately *before* the `<script>` tag mentioned above:

```html
<script>
    var sacoronavirusOptions = {
        backgroundColor: '#fff',
        textColor: '#222'
    }
</script>
```

The values there (e.g. `#fff` for 'white') are the defaults. You can change them to suit your site.

## Contributing

If you have feedback or changes, please log an issue or a pull request.
