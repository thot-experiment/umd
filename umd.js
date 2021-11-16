const umd = (markdown, scope) => {
  const md_css = {
    '#':`font-weight: bold; font-size: 24px;`,
    '`':`font-family: monospace; background: #EEE; display: inline-block; border-radius: 3px; border: 1px solid #CCC; padding: 0px 3px; line-height: 1.2em;`,
    '*':`font-weight: bold;`,
'_':`font-style: italic ;`,
    text:`font-family: sans-serif; line-height: 1.6em; margin-bottom: 3px;`,
    clear:``
  }

  let markdown_array = [...markdown].reverse()
  let output_string = '%c'
  let output_substitutions = [md_css.text]

  let state = [md_css.text]
  let process_token = token => () => {
    output_string += '%c'
    if (state[state.length-1] === md_css[token]) {
      state.pop()
      output_substitutions.push(state.join(' '))
    } else {
      state.push(md_css[token])
      output_substitutions.push(state.join(' '))
    }
  }

  let supported_tokens = new Map(Object.entries({
    '\\': () => output_string += markdown_array.pop(),
    '*':  process_token('*'),
    '`': process_token('`'),
    '_': process_token('_'),
    '~': () => {
      let token = markdown_array.splice(markdown_array.lastIndexOf('~')+1).reverse().join('')
      markdown_array.pop()
      if (scope[token]) {
        output_string += '%c%o%c'
        output_substitutions.push(md_css.clear, scope[token], state.join(' '))
      }
    },
    '#': process_token('#'),
  }))

  while (markdown_array.length) {
    let char = markdown_array.pop()
    let token = supported_tokens.get(char)
    if (token) {
      token()
    } else {
      output_string += char
    }
  }
  console.log(output_string, ...output_substitutions)
}


export default umd
