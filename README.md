
# ![Lionel](logo/logo-42.png)  Lionel Embedded JavaScript Templates (LeJS)

[![LeJS Actions](https://github.com/Reterics/lejs/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/Reterics/lejs/actions/workflows/npm-publish-github-packages.yml) [![Build Status](https://app.travis-ci.com/Reterics/lejs.svg?branch=main)](https://app.travis-ci.com/Reterics/lejs)

This repository is dedicated to serving as a platform for practice and training purposes.
It should not be used in production environment.

# Features

 - Unescaped output with `{{ }}`
 - IF statement with `{# }} {/# ]]`
 - Maping objects with `{> }} {/> }}`

## Usage

### Node

```javascript
let template = lejs.compile(str, options);
template(data);
// => Rendered String

lejs.render(str, data, options);
// => Rendered String

lejs.renderFile(filename, data, options);
```

### CLI

**.lejs**
```html
<p>Hello {{world}}</p>
<ul>
{>li}}
    <li>Index: {{+index}}. {{+value}}</li>
{/>li}}
</ul>
{#details}}
<details>
    {{detail}}
</details>
{/#details}}

```

**JSON data**
```json
{
  "world": "World",
  "li": [
    {
      "value": "Line 1"
    },
    {
      "value": "Line 2"
    }
  ],
  "details": true,
  "detail": "This value is visible, because details is true"
}
```

**Output**
```html
<p>Hello World</p>
<ul>

    <li>Index: 0. Line 1</li>

    <li>Index: 1. Line 2</li>

</ul>

<details>
    This value is visible, because details is true
</details>
```

**CLI call**
```bash
node ./dist/bin/cli.js ./test/files/example.lejs -f ./test/files/example.json
# OR
lejs ./test/files/example.lejs -f ./test/files/example.json
```



### Tags
  - `{{ }}` Value output tag
  - `{# }}` IF statement start tag
  - `{/# }}` IF statement end tag
  - `{>  }}` MAP start tag
  - `{{+ }}` MAP variable tag
  - `{/> }}` MAP end tag
