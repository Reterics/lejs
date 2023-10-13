
# ![Lionel](logo-64.png)  Lionel Embedded JavaScript Templates (LeJS)


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
