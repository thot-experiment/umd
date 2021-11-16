# umd
tiny doc renderer for the browser console with markdown-ish syntax

## usage
see [github pages](https://thot-experiment.github.io/umd/) and open up console for a demo

![example image](https://raw.githubusercontent.com/thot-experiment/umd/main/umd_demo.png)

the renderer can be imported via `import umd from './umd.js'`
and input text is rendered via `umd(input_text)`, optionally an object can
be passed in as a second parameter and it's members can be included in the 
rendered text via `~name~`

the supported syntax elements are
 - `#title#` for a heading
 - `` `code` `` for code
 - `_italic_` and `*bold*`
 - `~objectname~` to insert an object from a scope

all blocks must be closed, any use of the `` *,`,~,_,# `` characters must be escaped

```js
import umd from './umd.js'

umd(
`#micromarkdown demo# 
it currently supports rendering text in a variable width font
making things *bold* and _italic_ or even *_bold and italic_*
and little \`code blocks\` like so

but the super neatoburrito feature is that it can also
inject objects from a scope by name
~foo~ 
and also
~bar~

feel free to try it yourself right here in the console \`> umd(...)\`
`, 
  {
    foo: {gotta:'pumpit', to: 'jumpit'},
    bar: 'tube city!'.split('')
  }
)
```


