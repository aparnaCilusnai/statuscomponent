# material-svg-icons-react

> material svg icons using react

[![NPM](https://img.shields.io/npm/v/xampr-svg-icons.svg)](https://www.npmjs.com/package/material-svg-icons-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save xampr-svg-icons
```

## Usage

```jsx
import React, { Component } from 'react'

import Icon from 'material-svg-icons-react'

class Example extends Component {
  render () {
    let temp=['view-module','view-quilt','home','attachment']
    return (
      <div>
        {temp.map((item,index)=> (
          <Icon name={item} size='24px' color='grey' />
        ))}
         
      </div>
    )
  }
}

```

## License

MIT © [https://github.com/AparnaCilusani/xampr-svg-icons](https://github.com/https://github.com/AparnaCilusani/xampr-svg-icons)
