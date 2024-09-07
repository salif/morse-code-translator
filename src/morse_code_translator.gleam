import characters
import gleam/list
import gleam/option
import gleam/result
import gleam/string

pub const morse_code_list: MorseCodeList = characters.base_characters

pub const default_dot: String = "."

pub const default_dash: String = "-"

pub const default_space: String = "/"

pub const default_separator: String = " "

/// Default language is ASCII
pub const default_language: Language = language_latin

/// Input will be converted to uppercase
pub const default_is_uppercase: Bool = False

/// Output will be converted to lowercase
pub const default_to_uppercase: Bool = False

/// ASCII
pub const language_latin = Language("1")

/// Numbers
pub const language_numbers = Language("2")

/// Punctuation
pub const language_punctuation = Language("3")

/// Latin Extended (Turkish, Polish etc.)
pub const language_latin_extended = Language("4")

/// Cyrillic languages
pub const language_cyrillic = Language("5")

/// Greek
pub const language_greek = Language("6")

/// Hebrew
pub const language_hebrew = Language("7")

/// Arabic
pub const language_arabic = Language("8")

/// Persian
pub const language_persian = Language("9")

/// Japanese
pub const language_japanese = Language("10")

/// Korean
pub const language_korean = Language("11")

/// Thai
pub const language_thai = Language("12")

pub const default_invalid_symbol = "#"

pub type MorseCodeList =
   List(#(String, String, List(Bool)))

pub type MorseCodeError {
   MorseCodeError(msg: String)
}

pub type Language {
   Language(num: String)
}

pub type EncodeOptions {
   EncodeOptions(
      output_dot: option.Option(String),
      output_dash: option.Option(String),
      output_space: option.Option(String),
      output_separator: option.Option(String),
      is_uppercase: option.Option(Bool),
      language: option.Option(Language),
   )
}

pub fn encode(
   input: String,
   options: EncodeOptions,
   morse_code_dict: option.Option(MorseCodeList),
) -> Result(String, MorseCodeError) {
   let opt_output_dot: String = option.unwrap(options.output_dot, default_dot)
   let opt_output_dash: String =
      option.unwrap(options.output_dash, default_dash)
   let opt_output_space: String =
      option.unwrap(options.output_space, default_space)
   let opt_output_separator: String =
      option.unwrap(options.output_separator, default_separator)
   let opt_is_uppercase: Bool =
      option.unwrap(options.is_uppercase, default_is_uppercase)
   let opt_language: String =
      option.unwrap(options.language, default_language).num
   let opt_morse_code_dict: MorseCodeList =
      option.unwrap(morse_code_dict, morse_code_list)

   input
   |> string.to_graphemes
   |> list.try_map(fn(g: String) -> Result(String, MorseCodeError) {
      case g {
         " " | "\n" | "\r" | "\t" -> Ok(opt_output_space)
         _ -> {
            let g: String = if_(opt_is_uppercase, g, string.uppercase(g))
            case list_key_find(opt_morse_code_dict, g, opt_language) {
               Ok(bools) -> {
                  bools
                  |> list.map(if_(_, opt_output_dash, opt_output_dot))
                  |> string.join("")
                  |> Ok
               }
               Error(_) -> Error(MorseCodeError("Invalid symbol: " <> g))
            }
         }
      }
   })
   |> result.map(string.join(_, opt_output_separator))
}

pub fn encode_to_string(
   input: String,
   options: EncodeOptions,
   morse_code_dict: option.Option(MorseCodeList),
) -> String {
   case encode(input, options, morse_code_dict) {
      Ok(value) -> value
      Error(value) -> value.msg
   }
}

pub type DecodeOptions {
   DecodeOptions(
      input_dot: option.Option(String),
      input_dash: option.Option(String),
      input_space: option.Option(String),
      input_separator: option.Option(String),
      to_uppercase: option.Option(Bool),
      language: option.Option(Language),
      skip_invalid_symbols: option.Option(Bool),
   )
}

pub fn decode(
   input: String,
   options: DecodeOptions,
   morse_code_dict: option.Option(MorseCodeList),
) -> Result(String, MorseCodeError) {
   let opt_input_dot: String = option.unwrap(options.input_dot, default_dot)
   let opt_input_dash: String = option.unwrap(options.input_dash, default_dash)
   let opt_input_space: String =
      option.unwrap(options.input_space, default_space)
   let opt_input_separator: String =
      option.unwrap(options.input_separator, default_separator)
   let opt_to_uppercase: Bool =
      option.unwrap(options.to_uppercase, default_to_uppercase)
   let opt_language: String =
      option.unwrap(options.language, default_language).num
   let opt_skip_invalid_symbols: Bool =
      option.unwrap(options.skip_invalid_symbols, False)

   input
   |> string.split(opt_input_separator)
   |> list.try_map(fn(w: String) -> Result(String, MorseCodeError) {
      case True {
         _ if w == "" -> Ok("")
         _ if w == opt_input_space -> Ok(" ")
         _ -> {
            w
            |> string.to_graphemes
            |> list.try_map(fn(g: String) -> Result(Bool, MorseCodeError) {
               case True {
                  _ if g == opt_input_dot -> Ok(False)
                  _ if g == opt_input_dash -> Ok(True)
                  _ -> Error(MorseCodeError("Invalid morse code symbol: " <> g))
               }
            })
            |> result.try(fn(bools: List(Bool)) -> Result(
               String,
               MorseCodeError,
            ) {
               case
                  list_value_find(
                     option.unwrap(morse_code_dict, morse_code_list),
                     bools,
                     opt_language,
                  )
               {
                  Ok(value) ->
                     if_(
                        opt_to_uppercase,
                        Ok(value),
                        Ok(string.lowercase(value)),
                     )
                  Error(_) ->
                     case opt_skip_invalid_symbols {
                        True -> Ok(default_invalid_symbol)
                        False -> Error(MorseCodeError("Invalid symbol: " <> w))
                     }
               }
            })
         }
      }
   })
   |> result.map(string.join(_, ""))
}

pub fn decode_to_string(
   input: String,
   options: DecodeOptions,
   morse_code_dict: option.Option(MorseCodeList),
) -> String {
   case decode(input, options, morse_code_dict) {
      Ok(value) -> value
      Error(value) -> value.msg
   }
}

fn list_key_find(
   keys: MorseCodeList,
   desired_key: String,
   language: String,
) -> Result(List(Bool), Nil) {
   case list.filter(keys, fn(k) { k.1 == desired_key }) {
      [] -> Error(Nil)
      [only_key] -> Ok(only_key.2)
      dublic_keys ->
         case list.filter(dublic_keys, fn(key) { key.0 == language }) {
            [] ->
               dublic_keys
               |> list.first
               |> result.map(fn(key) { key.2 })
            [only_lang_key] -> Ok(only_lang_key.2)
            dublic_lang_keys ->
               dublic_lang_keys
               |> list.first
               |> result.map(fn(key) { key.2 })
         }
   }
}

fn list_value_find(
   values: MorseCodeList,
   desired_value: List(Bool),
   language: String,
) -> Result(String, Nil) {
   case list.filter(values, fn(v) { v.2 == desired_value }) {
      [] -> Error(Nil)
      [only_value] -> Ok(only_value.1)
      dublic_values ->
         case list.filter(dublic_values, fn(value) { value.0 == language }) {
            [] ->
               dublic_values
               |> list.first
               |> result.map(fn(value) { value.1 })
            [only_lang_value] -> Ok(only_lang_value.1)
            dublic_lang_values ->
               dublic_lang_values
               |> list.first
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

pub fn convert(
   input: String,
   options: ConvertOptions,
) -> Result(String, MorseCodeError) {
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

fn if_(condition: Bool, if_true: a, if_false: a) -> a {
   case condition {
      True -> if_true
      False -> if_false
   }
}
