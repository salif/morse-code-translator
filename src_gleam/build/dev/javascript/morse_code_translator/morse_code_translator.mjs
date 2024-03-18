import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $characters from "./characters.mjs";
import { Ok, Error, CustomType as $CustomType, isEqual } from "./gleam.mjs";

export class MorseCodeError extends $CustomType {
  constructor(msg) {
    super();
    this.msg = msg;
  }
}

export class EncodeOptions extends $CustomType {
  constructor(output_dot, output_dash, output_space, output_separator, is_uppercase, language_num) {
    super();
    this.output_dot = output_dot;
    this.output_dash = output_dash;
    this.output_space = output_space;
    this.output_separator = output_separator;
    this.is_uppercase = is_uppercase;
    this.language_num = language_num;
  }
}

export class DecodeOptions extends $CustomType {
  constructor(input_dot, input_dash, input_space, input_separator, to_uppercase, language_num) {
    super();
    this.input_dot = input_dot;
    this.input_dash = input_dash;
    this.input_space = input_space;
    this.input_separator = input_separator;
    this.to_uppercase = to_uppercase;
    this.language_num = language_num;
  }
}

export class ConvertOptions extends $CustomType {
  constructor(input_dot, output_dot, input_dash, output_dash, input_space, output_space, input_separator, output_separator) {
    super();
    this.input_dot = input_dot;
    this.output_dot = output_dot;
    this.input_dash = input_dash;
    this.output_dash = output_dash;
    this.input_space = input_space;
    this.output_space = output_space;
    this.input_separator = input_separator;
    this.output_separator = output_separator;
  }
}

function list_key_find(keys, desired_key, language_num) {
  let $ = $list.filter(keys, (k) => { return k[1] === desired_key; });
  if ($.hasLength(0)) {
    return new Error(undefined);
  } else if ($.hasLength(1)) {
    let only_key = $.head;
    return new Ok(only_key[2]);
  } else {
    let dublic_keys = $;
    let $1 = $list.filter(
      dublic_keys,
      (key) => { return key[0] === language_num; },
    );
    if ($1.hasLength(0)) {
      let _pipe = $list.at(dublic_keys, 0);
      return $result.map(_pipe, (key) => { return key[2]; });
    } else if ($1.hasLength(1)) {
      let only_lang_key = $1.head;
      return new Ok(only_lang_key[2]);
    } else {
      let dublic_lang_keys = $1;
      let _pipe = $list.at(dublic_lang_keys, 0);
      return $result.map(_pipe, (key) => { return key[2]; });
    }
  }
}

export function encode(input, morse_code_list, options) {
  let _pipe = input;
  let _pipe$1 = $string.to_graphemes(_pipe);
  let _pipe$2 = $list.try_map(
    _pipe$1,
    (g) => {
      if (g === " ") {
        return new Ok(options.output_space);
      } else if (g === "\n") {
        return new Ok(options.output_space);
      } else if (g === "\r") {
        return new Ok(options.output_space);
      } else if (g === "\t") {
        return new Ok(options.output_space);
      } else {
        let g$1 = (() => {
          let $ = options.is_uppercase;
          if ($) {
            return g;
          } else {
            return $string.uppercase(g);
          }
        })();
        let $ = list_key_find(morse_code_list, g$1, options.language_num);
        if ($.isOk()) {
          let bools = $[0];
          let _pipe$2 = bools;
          let _pipe$3 = $list.map(
            _pipe$2,
            (b) => {
              if (b) {
                return options.output_dash;
              } else {
                return options.output_dot;
              }
            },
          );
          let _pipe$4 = $string.join(_pipe$3, "");
          return new Ok(_pipe$4);
        } else {
          return new Error(new MorseCodeError("Invalid symbol: " + g$1));
        }
      }
    },
  );
  return $result.map(
    _pipe$2,
    (_capture) => { return $string.join(_capture, options.output_separator); },
  );
}

export function encode_to_string(input, morse_code_list, options) {
  let $ = encode(input, morse_code_list, options);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

function list_value_find(values, desired_value, language_num) {
  let $ = $list.filter(values, (v) => { return isEqual(v[2], desired_value); });
  if ($.hasLength(0)) {
    return new Error(undefined);
  } else if ($.hasLength(1)) {
    let only_value = $.head;
    return new Ok(only_value[1]);
  } else {
    let dublic_values = $;
    let $1 = $list.filter(
      dublic_values,
      (value) => { return value[0] === language_num; },
    );
    if ($1.hasLength(0)) {
      let _pipe = $list.at(dublic_values, 0);
      return $result.map(_pipe, (value) => { return value[1]; });
    } else if ($1.hasLength(1)) {
      let only_lang_value = $1.head;
      return new Ok(only_lang_value[1]);
    } else {
      let dublic_lang_values = $1;
      let _pipe = $list.at(dublic_lang_values, 0);
      return $result.map(_pipe, (value) => { return value[1]; });
    }
  }
}

export function decode(input, morse_code_list, options) {
  let _pipe = input;
  let _pipe$1 = $string.split(_pipe, options.input_separator);
  let _pipe$2 = $list.try_map(
    _pipe$1,
    (w) => {
      let $ = true;
      if (w === "") {
        return new Ok("");
      } else if (w === options.input_space) {
        return new Ok(" ");
      } else {
        let _pipe$2 = w;
        let _pipe$3 = $string.to_graphemes(_pipe$2);
        let _pipe$4 = $list.try_map(
          _pipe$3,
          (g) => {
            let $1 = true;
            if (g === options.input_dot) {
              return new Ok(false);
            } else if (g === options.input_dash) {
              return new Ok(true);
            } else {
              return new Error(
                new MorseCodeError("Invalid morse code symbol: " + g),
              );
            }
          },
        );
        return $result.try$(
          _pipe$4,
          (bools) => {
            let $1 = list_value_find(
              morse_code_list,
              bools,
              options.language_num,
            );
            if ($1.isOk()) {
              let value = $1[0];
              let $2 = options.to_uppercase;
              if ($2) {
                return new Ok(value);
              } else {
                return new Ok($string.lowercase(value));
              }
            } else {
              return new Error(new MorseCodeError("Invalid symbol: " + w));
            }
          },
        );
      }
    },
  );
  return $result.map(
    _pipe$2,
    (_capture) => { return $string.join(_capture, ""); },
  );
}

export function decode_to_string(input, morse_code_list, options) {
  let $ = decode(input, morse_code_list, options);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

export function convert(input, options) {
  let _pipe = input;
  let _pipe$1 = $string.to_graphemes(_pipe);
  let _pipe$2 = $list.try_map(
    _pipe$1,
    (g) => {
      let $ = true;
      if (g === options.input_separator) {
        return new Ok(options.output_separator);
      } else if (g === options.input_space) {
        return new Ok(options.output_space);
      } else if (g === options.input_dot) {
        return new Ok(options.output_dot);
      } else if (g === options.input_dash) {
        return new Ok(options.output_dash);
      } else {
        return new Error(new MorseCodeError("Invalid morse code symbol: " + g));
      }
    },
  );
  return $result.map(
    _pipe$2,
    (_capture) => { return $string.join(_capture, ""); },
  );
}

export function convert_to_string(input, options) {
  let $ = convert(input, options);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

export const morse_code_list = $characters.base_characters;

export const default_dot = ".";

export const default_dash = "-";

export const default_space = "/";

export const default_separator = " ";

export const default_is_uppercase = false;

export const default_to_uppercase = false;

export const language_num_latin = "1";

export const default_language_num = language_num_latin;

export const language_num_numbers = "2";

export const language_num_punctuation = "3";

export const language_num_latin_extended = "4";

export const language_num_cyrillic = "5";

export const language_num_greek = "6";

export const language_num_hebrew = "7";

export const language_num_arabic = "8";

export const language_num_persian = "9";

export const language_num_japanese = "10";

export const language_num_korean = "11";

export const language_num_thai = "12";
