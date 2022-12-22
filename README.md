# The Cayman-Docs theme

Cayman-Docs is a fork of the Jekyll theme [Cayman](https://github.com/pages-themes/cayman) for GitHub Pages. This theme was edited from the original Cayman to be more docs friendly; This is achieved by defaulting the layout on dark mode, adding content navigation, and friendly layer indention. Originally made for [coro-docs](https://bilal2453.github.io/coro-docs/).

![Thumbnail of Cayman](thumbnail.png)

## Todo

1. Implementing heading indention.
2. General styling enhancements.
3. Add anchor element to next of each header.
4. Do something with the original Cayman gemfiles.
5. Make navigator style customizable through Sass variables.

## Usage

To use the Cayman-Docs theme:

1. Add the following to your site's `_config.yml`:

    ```yml
    remote_theme: Bilal2453/cayman-docs
    ```

## Customizing

### Configuration variables

Cayman will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
show_downloads: ["true" or "false" to indicate whether to provide a download URL]
google_analytics: [Your Google Analytics tracking ID]
```

Cayman-Docs also provides additional variables to control varies stuff, such as:

- Navigation and Table of Contents generation:
```yml
navigation:
  name_over_title: [true or false to indicate whether to use the page file name instead of title in the header navigator]
  toc_parameter: [all toc module parameters can be optionally passed over here]
```

### Table of Content parameters

  * sanitize      (bool)   : false  - when set to true, the headers will be stripped of any HTML in the TOC
  * class         (string) :   ''   - a CSS class assigned to the TOC
  * id            (string) :   ''   - an ID to assigned to the TOC
  * h_min         (int)    :   1    - the minimum TOC header level to use; any header lower than this value will be ignored
  * h_max         (int)    :   6    - the maximum TOC header level to use; any header greater than this value will be ignored
  * ordered       (bool)   : false  - when set to true, an ordered list will be outputted instead of an unordered list
  * item_class    (string) :   ''   - add custom class(es) for each list item; has support for '%level%' placeholder, which is the current heading level
  * submenu_class (string) :   ''   - add custom class(es) for each child group of headings; has support for '%level%' placeholder which is the current "submenu" heading level
  * base_url      (string) :   ''   - add a base url to the TOC links for when your TOC is on another page than the actual content
  * anchor_class  (string) :   ''   - add custom class(es) for each anchor element
  * skip_no_ids   (bool)   : false  - skip headers that do not have an `id` attribute
  * strip_par     (bool)   : false  - strips any parenthesis at the end of title. E.x: `find(str, index)` -> `find`.

### Stylesheet

If you'd like to add your own custom styles:

1. Create a file called `/assets/css/style.scss` in your site
2. Add the following content to the top of the file, exactly as shown:
    ```scss
    ---
    ---

    @import "{{ site.theme }}";
    ```
3. Add any custom CSS (or Sass, including imports) you'd like immediately after the `@import` line

*Note: If you'd like to change the theme's Sass variables, you must set new values before the `@import` line in your stylesheet.*

### Layouts

If you'd like to change the theme's HTML layout:

1. [Copy the original default template](https://github.com/Bilal2453/cayman-docs/blob/master/_layouts/default.html) or [the documentation layout page](https://github.com/Bilal2453/cayman-docs/blob/master/_layouts/doc.html) from the theme's repository<br />(*Pro-tip: click "raw" to make copying easier*)
2. Create a file called `/_layouts/default.html` (or `/_layouts/doc.html`) in your site
3. Paste the default layout content copied in the first step
4. Customize the layout as you'd like

### Overriding GitHub-generated URLs

Templates often rely on URLs supplied by GitHub such as links to your repository or links to download your project. If you'd like to override one or more default URLs:

1. Look at [the template source](https://github.com/Bilal2453/cayman-docs/blob/master/_layouts/default.html) to determine the name of the variable. It will be in the form of `{{ site.github.zip_url }}`.
2. Specify the URL that you'd like the template to use in your site's `_config.yml`. For example, if the variable was `site.github.url`, you'd add the following:
    ```yml
    github:
      zip_url: http://example.com/download.zip
      another_url: another value
    ```
3. When your site is built, Jekyll will use the URL you specified, rather than the default one provided by GitHub.

*Note: You must remove the `site.` prefix, and each variable name (after the `github.`) should be indent with two space below `github:`.*

For more information, see [the Jekyll variables documentation](https://jekyllrb.com/docs/variables/).

### Previewing the theme locally

If you'd like to preview the theme locally (for example, in the process of proposing a change):

1. Clone down the theme's repository (`git clone https://github.com/Bilal2453/cayman-docs`)
2. `cd` into the theme's directory
3. Run `script/bootstrap` to install the necessary dependencies
4. Run `bundle exec jekyll serve` to start the preview server
5. Visit [`localhost:4000`](http://localhost:4000) in your browser to preview the theme
