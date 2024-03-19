# Morse Code Translator

[![Package Version](https://img.shields.io/hexpm/v/morse_code_translator)](https://hex.pm/packages/morse_code_translator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/morse_code_translator/)

## Links

* Gleam: [./src_gleam/README.md](./src_gleam/README.md)
* Homepage: [salif.github.io/morse-code-translator](https://salif.github.io/morse-code-translator/)
* GitHub: [github.com/salif/morse-code-translator](https://github.com/salif/morse-code-translator)
* Codeberg: [codeberg.org/salif/morse-code-translator](https://codeberg.org/salif/morse-code-translator)

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
         Some(mct.default_dot),
         Some(mct.default_dash),
         Some(mct.default_space),
         Some(mct.default_separator),
         Some(mct.default_is_uppercase),
         Some(mct.default_language_num),
      )

   let demo_decode_options =
      mct.DecodeOptions(
         input_dot: Some(mct.default_dot),
         input_dash: Some(mct.default_dash),
         input_space: Some(mct.default_space),
         input_separator: Some(mct.default_separator),
         to_uppercase: Some(mct.default_to_uppercase),
         language_num: Some(mct.default_language_num),
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

   "-.. . -- ---"
   |> mct.decode_to_string(
      mct.DecodeOptions(
         ..demo_decode_options,
         to_uppercase: None,
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
