
# ![Lionel](logo/logo-42.png)  Lionel Embedded JavaScript Templates (LeJS)

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
