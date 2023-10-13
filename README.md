
# ![Lionel](logo/logo-42.png)  Lionel Embedded JavaScript Templates (LeJS)

[![LeJS Actions](https://github.com/Reterics/lejs/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/Reterics/lejs/actions/workflows/npm-publish-github-packages.yml) [![Build Status](https://app.travis-ci.com/Reterics/lejs.svg?branch=main)](https://app.travis-ci.com/Reterics/lejs)

This repository is dedicated to serving as a platform for practice and training purposes.
It should not be used in production environment.

# Features

 - Unescaped output with `{{ }}`
 - Static caching of templates

## Examples

```
<p>Hello {{world}}</p>
```

## Usage

```javascript
let template = lejs.compile(str, options);
template(data);
// => Rendered String

lejs.render(str, data, options);
// => Rendered String

lejs.renderFile(filename, data, options);
```

### Tags
  - `{{` Value output for template
  - `}}` End Tag
