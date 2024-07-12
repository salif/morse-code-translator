# Morse Code Translator

[![Package Version](https://img.shields.io/hexpm/v/morse_code_translator)](https://hex.pm/packages/morse_code_translator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/morse_code_translator/)

## Links

* [Homepage](https://salif.github.io/morse-code-translator/)
* [Source code \(Github\)](https://github.com/salif/morse-code-translator)
* [Source code \(Codeberg\)](https://codeberg.org/salif/morse-code-translator)

## Usage

```sh
gleam add morse_code_translator
```

```gleam
import gleam/io
import gleam/option.{None, Some}
import morse_code_translator as mct

pub fn main() {
   let demo_encode_options =
      mct.EncodeOptions(
         output_dot: None,
         output_dash: None,
         output_space: None,
         output_separator: None,
         is_uppercase: None,
         language_num: None,
      )

   let demo_decode_options =
      mct.DecodeOptions(
         input_dot: None,
         input_dash: None,
         input_space: None,
         input_separator: None,
         to_uppercase: None,
         language_num: None,
      )

   let demo_encode: Result(String, mct.MorseCodeError) =
      mct.encode(" Test ", demo_encode_options, None)
   io.debug(demo_encode)
   // Ok("/ - . ... - /")

   let demo_decode: Result(String, mct.MorseCodeError) =
      mct.decode("/ - . ... - /", demo_decode_options, None)
   io.debug(demo_decode)
   // Ok(" test ")

   "demo"
   |> mct.encode_to_string(demo_encode_options, None)
   |> mct.decode_to_string(demo_decode_options, None)
   |> io.debug
   // "demo"

   "_.. . __ ___"
   |> mct.decode_to_string(
      mct.DecodeOptions(
         ..demo_decode_options,
         input_dash: Some("_"),
         language_num: Some(mct.language_num_cyrillic),
      ),
      None,
   )
   |> io.debug
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
   |> io.debug
   // Ok("100 0 11 111")

   "="
   |> mct.convert_to_string(demo_convert_options)
   |> io.debug
   // "Invalid morse code symbol: ="
}
```

Further documentation can be found at <https://hexdocs.pm/morse_code_translator>.

## Development

```sh
gleam build
```
