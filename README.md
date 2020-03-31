# Easy links to sacoronavirus.co.za

To help ensure that South Africans get official, up-to-date information about COVID-19, and to fight fake news and misleading stories, the government has made it compulsory for all domains that end in `.za` to include a visible link to [sacoronavirus.co.za](https://sacoronavirus.co.za) on their landing page.

That can be tricky for many organisations. Here is a quick and easy way to include that link. You do need some technical knowledge to implement it. Once implemented, your site will show a small popup that users can close.

## Usage

Include this line before the `</body>` tag of your home page (or your page templates):

``` html
<script src="http://corona.ebw.co/index.js"></script>
```

### Options

This is optional The script includes some optional settings. Add these by also including this immediately *before* the `<script>` tag mentioned above:

```html
<script>
    var sacoronavirusOptions = {
        backgroundColor: '#fff'
        textColor: '#222'
    }
</script>
```

The values there (e.g. `yellow`) are the defaults. You can change them to suit your site, for instance changing the popup's colour to match your site design.

## Contributing

If you have feedback or changes, please log an issue or a pull request.
