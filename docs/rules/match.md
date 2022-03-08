# Enforce a case style for files and folders names

Enforces all linted files to have their names in a certain case style and lowercase file extension (can be disabled). The default case is `camel`.

## Cases

### `kebab`

- `foo-bar.ext`
- `foo-bar.test.ext`
- `foo-bar.test-utils.ext`

### `camel`

- `fooBar.ext`
- `fooBar.test.ext`
- `fooBar.testUtils.ext`

### `snake`

- `foo_bar.ext`
- `foo_bar.test.ext`
- `foo_bar.test_utils.ext`

### `pascal`

- `FooBar.ext`
- `FooBar.Test.ext`
- `FooBar.TestUtils.ext`

## Options

### Single case

Type: `{string}`

Case your naming should match

#### Example:
```json
"filename-consistency/match": [
  "error",
  "camel"
]
```

### Multiple cases

Type: `{string[]}`

Array of cases your naming should match

#### Example:
```json
"filename-consistency/match": [ 
  "error",
  ["camel", "kebab"]
]
```

### Options object

Options object has the following properties:

| Name                 | Type                  | Default                               | Description                                                      |
|----------------------|-----------------------|---------------------------------------|------------------------------------------------------------------|
| `match`              | `string[]`            | `["camel"]`                           | List of cases to match                                           |
| `ignore`             | `string[]` `RegExp[]` | [See here](#files-ignored-by-default) | List of regular expressions                                      |
| `defaultIgnore`      | `boolean`             | `true`                                | Property that allows turning off default ignored values          |
| `validateFolders`    | `boolean`             | `true`                                | Property that allows turning off folders naming validation       |
| `validateExtensions` | `boolean`             | `true`                                | Property that allows turning off extensions lowercase validation |

#### Example:
```json
"filename-consistency/match": [
  "error",
  {
    "match": ["camel"],
    "ignore": ["^CODE_OF_CONDUCT$"],
    "defaultIgnore": true,
    "validateFolders": true,
    "validateExtensions": true
  }
]
```

### Files ignored by default
* `index` files
* `readme` files
* `license` files
* `contributing` files

These files will be ignored no matter if values provided into ignore array or not.
The only way to remove these default ignored files from options is to use `defaultIgnore` property
