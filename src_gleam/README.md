# morse_code_translator

[![Package Version](https://img.shields.io/hexpm/v/morse_code_translator)](https://hex.pm/packages/morse_code_translator)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/morse_code_translator/)

```sh
gleam add morse_code_translator
```
```gleam
import gleam/io
import morse_code_translator as mct

pub fn main() {
  let demo_encode_options =
    mct.EncodeOptions(
      mct.default_dot,
      mct.default_dash,
      mct.default_space,
      mct.default_separator,
      mct.default_is_uppercase,
      mct.default_language_num,
    )

  let demo_decode_options =
    mct.DecodeOptions(
      input_dot: mct.default_dot,
      input_dash: mct.default_dash,
      input_space: mct.default_space,
      input_separator: mct.default_separator,
      to_uppercase: mct.default_to_uppercase,
      language_num: mct.default_language_num,
    )

  let demo_encode: Result(String, mct.MorseCodeError) =
    mct.encode(" Test ", mct.morse_code_list, demo_encode_options)
  io.debug(demo_encode)
  // Ok("/ - . ... - /")

  let demo_decode: Result(String, mct.MorseCodeError) =
    mct.decode("/ - . ... - /", mct.morse_code_list, demo_decode_options)
  io.debug(demo_decode)
  // Ok(" test ")

  "demo"
  |> mct.encode_to_string(mct.morse_code_list, demo_encode_options)
  |> mct.decode_to_string(mct.morse_code_list, demo_decode_options)
  |> io.debug
  // "demo"

  "-.. . -- ---"
  |> mct.decode_to_string(
    mct.morse_code_list,
    mct.DecodeOptions(..demo_decode_options, language_num: "5"),
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
