import gleam/string
import gleam/list
import gleam/result
import characters

pub const morse_code_list: MorseCodeList = characters.base_characters

pub const default_dot: String = "."

pub const default_dash: String = "-"

pub const default_space: String = "/"

pub const default_separator: String = " "

pub const default_language_num: String = language_num_latin

pub const default_is_uppercase: Bool = False

pub const default_to_uppercase: Bool = False

pub const language_num_latin: String = "1"

pub const language_num_numbers: String = "2"

pub const language_num_punctuation: String = "3"

pub const language_num_latin_extended: String = "4"

pub const language_num_cyrillic: String = "5"

pub const language_num_greek: String = "6"

pub const language_num_hebrew: String = "7"

pub const language_num_arabic: String = "8"

pub const language_num_persian: String = "9"

pub const language_num_japanese: String = "10"

pub const language_num_korean: String = "11"

pub const language_num_thai: String = "12"

pub type MorseCodeList =
   List(#(String, String, List(Bool)))

pub type MorseCodeError {
   MorseCodeError(msg: String)
}

pub type EncodeOptions {
   EncodeOptions(
      output_dot: String,
      output_dash: String,
      output_space: String,
      output_separator: String,
      is_uppercase: Bool,
      language_num: String,
   )
}

pub fn encode(
   input: String,
   morse_code_list: MorseCodeList,
   options: EncodeOptions,
) -> Result(String, MorseCodeError) {
   input
   |> string.to_graphemes
   |> list.try_map(fn(g: String) -> Result(String, MorseCodeError) {
      case g {
         " " | "\n" | "\r" | "\t" -> Ok(options.output_space)
         _ -> {
            let g: String = case options.is_uppercase {
               True -> g
               False -> string.uppercase(g)
            }
            case list_key_find(morse_code_list, g, options.language_num) {
               Ok(bools) -> {
                  bools
                  |> list.map(fn(b: Bool) -> String {
                     case b {
                        True -> options.output_dash
                        False -> options.output_dot
                     }
                  })
                  |> string.join("")
                  |> Ok
               }
               Error(_) -> Error(MorseCodeError("Invalid symbol: " <> g))
            }
         }
      }
   })
   |> result.map(string.join(_, options.output_separator))
}

pub fn encode_to_string(
   input: String,
   morse_code_list: MorseCodeList,
   options: EncodeOptions,
) -> String {
   case encode(input, morse_code_list, options) {
      Ok(value) -> value
      Error(value) -> value.msg
   }
}

pub type DecodeOptions {
   DecodeOptions(
      input_dot: String,
      input_dash: String,
      input_space: String,
      input_separator: String,
      to_uppercase: Bool,
      language_num: String,
   )
}

pub fn decode(
   input: String,
   morse_code_list: MorseCodeList,
   options: DecodeOptions,
) -> Result(String, MorseCodeError) {
   input
   |> string.split(options.input_separator)
   |> list.try_map(fn(w: String) -> Result(String, MorseCodeError) {
      case True {
         _ if w == "" -> Ok("")
         _ if w == options.input_space -> Ok(" ")
         _ -> {
            w
            |> string.to_graphemes
            |> list.try_map(fn(g: String) -> Result(Bool, MorseCodeError) {
               case True {
                  _ if g == options.input_dot -> Ok(False)
                  _ if g == options.input_dash -> Ok(True)
                  _ -> Error(MorseCodeError("Invalid morse code symbol: " <> g))
               }
            })
            |> result.try(fn(bools: List(Bool)) -> Result(String, MorseCodeError) {
               case list_value_find(morse_code_list, bools, options.language_num) {
                  Ok(value) -> {
                     case options.to_uppercase {
                        True -> Ok(value)
                        False -> Ok(string.lowercase(value))
                     }
                  }
                  Error(_) -> Error(MorseCodeError("Invalid symbol: " <> w))
               }
            })
         }
      }
   })
   |> result.map(string.join(_, ""))
}

pub fn decode_to_string(
   input: String,
   morse_code_list: MorseCodeList,
   options: DecodeOptions,
) -> String {
   case decode(input, morse_code_list, options) {
      Ok(value) -> value
      Error(value) -> value.msg
   }
}

fn list_key_find(
   keys: List(#(String, String, List(Bool))),
   desired_key: String,
   language_num: String,
) -> Result(List(Bool), Nil) {
   case list.filter(keys, fn(k) { k.1 == desired_key }) {
      [] -> Error(Nil)
      [only_key] -> Ok(only_key.2)
      dublic_keys ->
         case list.filter(dublic_keys, fn(key) { key.0 == language_num }) {
            [] ->
               list.at(dublic_keys, 0)
               |> result.map(fn(key) { key.2 })
            [only_lang_key] -> Ok(only_lang_key.2)
            dublic_lang_keys ->
               list.at(dublic_lang_keys, 0)
               |> result.map(fn(key) { key.2 })
         }
   }
}

fn list_value_find(
   values: List(#(String, String, List(Bool))),
   desired_value: List(Bool),
   language_num: String,
) -> Result(String, Nil) {
   case list.filter(values, fn(v) { v.2 == desired_value }) {
      [] -> Error(Nil)
      [only_value] -> Ok(only_value.1)
      dublic_values ->
         case list.filter(dublic_values, fn(value) { value.0 == language_num }) {
            [] ->
               list.at(dublic_values, 0)
               |> result.map(fn(value) { value.1 })
            [only_lang_value] -> Ok(only_lang_value.1)
            dublic_lang_values ->
               list.at(dublic_lang_values, 0)
               |> result.map(fn(value) { value.1 })
         }
   }
}

pub type ConvertOptions {
   ConvertOptions(
      input_dot: String,
      output_dot: String,
      input_dash: String,
      output_dash: String,
      input_space: String,
      output_space: String,
      input_separator: String,
      output_separator: String,
   )
}

pub fn convert(input: String, options: ConvertOptions) -> Result(String, MorseCodeError) {
   input
   |> string.to_graphemes
   |> list.try_map(fn(g: String) -> Result(String, MorseCodeError) {
      case True {
         _ if g == options.input_separator -> Ok(options.output_separator)
         _ if g == options.input_space -> Ok(options.output_space)
         _ if g == options.input_dot -> Ok(options.output_dot)
         _ if g == options.input_dash -> Ok(options.output_dash)
         _ -> Error(MorseCodeError("Invalid morse code symbol: " <> g))
      }
   })
   |> result.map(string.join(_, ""))
}

pub fn convert_to_string(input: String, options: ConvertOptions) -> String {
   case convert(input, options) {
      Ok(value) -> value
      Error(value) -> value.msg
   }
}
