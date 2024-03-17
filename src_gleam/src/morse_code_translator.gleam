import gleam/dict
import gleam/string
import gleam/list
import gleam/result
import characters as ch

pub type MorseCodeError {
    MorseCodeError(msg: String)
}

pub type EncodeOptions {
    EncodeOptions(
        output_dot: String,
        output_dash: String,
        output_space: String,
        output_separator: String,
        is_uppercase_only: Bool,
    )
}

pub fn encode(
    morse_code_dict: ch.MorseCodeDict,
    input: String,
    options: EncodeOptions,
) -> Result(String, MorseCodeError) {
    input
    |> string.to_graphemes
    |> list.try_map(fn(g: String) -> Result(String, MorseCodeError) {
        case g {
            " " | "\n" | "\r" | "\t" -> Ok(options.output_space)
            _ -> {
                let g: String = case options.is_uppercase_only {
                    True -> g
                    False -> string.uppercase(g)
                }
                case dict.get(morse_code_dict, g) {
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
    morse_code_dict: ch.MorseCodeDict,
    input: String,
    options: EncodeOptions,
) -> String {
    case encode(morse_code_dict, input, options) {
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
    )
}

pub fn decode(
    morse_code_list: ch.MorseCodeList,
    input: String,
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
                        _ ->
                            Error(MorseCodeError(
                                "Invalid morse code symbol: " <> g,
                            ))
                    }
                })
                |> result.try(fn(bools: List(Bool)) -> Result(
                    String,
                    MorseCodeError,
                ) {
                    case list_value_find(morse_code_list, bools) {
                        Ok(value) ->
                            case options.to_uppercase {
                                True -> Ok(value)
                                False -> Ok(string.lowercase(value))
                            }
                        Error(_) ->
                            Error(MorseCodeError("Invalid symbol: " <> w))
                    }
                })
            }
        }
    })
    |> result.map(string.join(_, ""))
}

fn list_value_find(
    in values: List(#(String, List(Bool))),
    find desired_value: List(Bool),
) -> Result(String, Nil) {
    let key: Result(#(String, List(Bool)), Nil) =
        values
        |> list.find(fn(k: #(String, List(Bool))) -> Bool {
            let v: List(Bool) = k.1
            case v {
                _ if v == desired_value -> True
                _ -> False
            }
        })
    case key {
        Ok(value) -> Ok(value.0)
        Error(_) -> Error(Nil)
    }
}

pub fn decode_to_string(
    morse_code_list: ch.MorseCodeList,
    input: String,
    options: DecodeOptions,
) -> String {
    case decode(morse_code_list, input, options) {
        Ok(value) -> value
        Error(value) -> value.msg
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
