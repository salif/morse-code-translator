import gleam/dict
import gleam/string
import gleam/list
import characters as ch

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
) -> String {
    input
    |> string.to_graphemes
    |> list.map(fn(g: String) -> String {
        case g {
            // if space, new line, tab
            " " | "\n" | "\r" | "\t" -> options.output_space
            _ -> {
                let g: String = case options.is_uppercase_only {
                    True -> g
                    False -> string.uppercase(g)
                }
                let mc_bools: Result(List(Bool), Nil) =
                    dict.get(morse_code_dict, g)
                let mc_bools = case mc_bools {
                    Ok(value) -> value
                    Error(_) -> panic as { "Invalid symbol: " <> g }
                }
                mc_bools
                |> list.map(fn(b: Bool) -> String {
                    case b {
                        True -> options.output_dash
                        False -> options.output_dot
                    }
                })
                |> string.join("")
            }
        }
    })
    |> string.join(options.output_separator)
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
) -> String {
    input
    |> string.split(options.input_separator)
    |> list.map(fn(w: String) -> String {
        case True {
            _ if w == "" -> ""
            _ if w == options.input_space -> " "
            _ -> {
                let mc_bools: List(Bool) =
                    w
                    |> string.to_graphemes
                    |> list.map(fn(g: String) -> Bool {
                        case True {
                            _ if g == options.input_dot -> False
                            _ if g == options.input_dash -> True
                            _ -> panic as { "Invalid morse code symbol: " <> g }
                        }
                    })
                let mc_found: Result(#(String, List(Bool)), Nil) =
                    morse_code_list
                    |> list.find(fn(k: #(String, List(Bool))) -> Bool {
                        let v: List(Bool) = k.1
                        case v {
                            _ if v == mc_bools -> True
                            _ -> False
                        }
                    })
                case mc_found {
                    Ok(value) ->
                        case options.to_uppercase {
                            True -> value.0
                            False -> string.lowercase(value.0)
                        }
                    Error(_) -> panic as { "Invalid symbol: " <> w }
                }
            }
        }
    })
    |> string.join("")
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

pub fn convert(input: String, options: ConvertOptions) -> String {
    input
    |> string.to_graphemes
    |> list.map(fn(g: String) -> String {
        case True {
            _ if g == options.input_separator -> options.output_separator
            _ if g == options.input_space -> options.output_space
            _ if g == options.input_dot -> options.output_dot
            _ if g == options.input_dash -> options.output_dash
            _ -> panic as { "Invalid morse code symbol: " <> g }
        }
    })
    |> string.join("")
}
