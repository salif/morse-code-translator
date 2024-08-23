# Morse Code Translator

[![Package Version](https://img.shields.io/hexpm/v/morse_code_translator)](https://hex.pm/packages/morse_code_translator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/morse_code_translator/)

## Links

* [Web tool](https://salif.github.io/morse-code-translator/)
* [Source code](https://codeberg.org/salif/morse-code-translator)
* [Discussions (Github)](https://github.com/salif/morse-code-translator/discussions)

## Gleam library

### Installation

```sh
gleam add morse_code_translator@2
```

### Usage

```gleam
import gleam/io
import gleam/option.{None, Some}
import gleam/result
import morse_code_translator as mct

pub fn main() {
   let demo_encode_options =
      mct.EncodeOptions(
         output_dot: None,
         output_dash: None,
         output_space: None,
         output_separator: None,
         is_uppercase: None,
         language: None,
      )

   let demo_decode_options =
      mct.DecodeOptions(
         input_dot: None,
         input_dash: None,
         input_space: None,
         input_separator: None,
         to_uppercase: None,
         language: None,
      )

   " Test "
   |> mct.encode(demo_encode_options, None)
   |> result.map(io.println)
   // "/ - . ... - /"

   "/ - . ... - /"
   |> mct.decode(demo_decode_options, None)
   |> result.map(io.println)
   // " test "

   "demo"
   |> mct.encode_to_string(demo_encode_options, None)
   |> mct.decode_to_string(demo_decode_options, None)
   |> io.println
   // "demo"

   "_.. . __ ___"
   |> mct.decode_to_string(
      mct.DecodeOptions(
         ..demo_decode_options,
         input_dash: Some("_"),
         language: Some(mct.language_cyrillic),
      ),
      None,
   )
   |> io.println
   // "демо"

   let demo_convert_options =
      mct.ConvertOptions(
         input_dot: mct.default_dot,
         output_dot: "0",
         input_dash: mct.default_dash,
         output_dash: "1",
         input_space: mct.default_space,
         output_space: mct.default_space,
         input_separator: mct.default_separator,
         output_separator: mct.default_separator,
      )

   "-.. . -- ---"
   |> mct.convert(demo_convert_options)
   |> result.map(io.println)
   // "100 0 11 111"

   "="
   |> mct.convert_to_string(demo_convert_options)
   |> io.println
   // "Invalid morse code symbol: ="
}
```

### Version 2.2.0

Version `2.2.0` contains backward incompatible changes.
If you are using `EncodeOptions` and `DecodeOptions`, change `language_num` to `language`.

Further documentation can be found at <https://hexdocs.pm/morse_code_translator>.

## Web tool

### Add new page language

Open `index.html` and find all occurrences of `set_page_language`, `data-lo=` 
and `dataset.lo =`, then add translations and send a pull request.

### Manually set page language

Use this bookmarklet, save it as a bookmark, then open it while on the web page:

```javascript
javascript:(function(){window.set_page_language(window.prompt('Enter language code')??'');})()
```

## Development

```sh
# just format
just build
just serve
```
