import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
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

export class Language extends $CustomType {
  constructor(num) {
    super();
    this.num = num;
  }
}

export class EncodeOptions extends $CustomType {
  constructor(output_dot, output_dash, output_space, output_separator, is_uppercase, language) {
    super();
    this.output_dot = output_dot;
    this.output_dash = output_dash;
    this.output_space = output_space;
    this.output_separator = output_separator;
    this.is_uppercase = is_uppercase;
    this.language = language;
  }
}

export class DecodeOptions extends $CustomType {
  constructor(input_dot, input_dash, input_space, input_separator, to_uppercase, language) {
    super();
    this.input_dot = input_dot;
    this.input_dash = input_dash;
    this.input_space = input_space;
    this.input_separator = input_separator;
    this.to_uppercase = to_uppercase;
    this.language = language;
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

function list_key_find(keys, desired_key, language) {
  let $ = $list.filter(keys, (k) => { return k[1] === desired_key; });
  if ($.hasLength(0)) {
    return new Error(undefined);
  } else if ($.hasLength(1)) {
    let only_key = $.head;
    return new Ok(only_key[2]);
  } else {
    let dublic_keys = $;
    let $1 = $list.filter(dublic_keys, (key) => { return key[0] === language; });
    if ($1.hasLength(0)) {
      let _pipe = dublic_keys;
      let _pipe$1 = $list.first(_pipe);
      return $result.map(_pipe$1, (key) => { return key[2]; });
    } else if ($1.hasLength(1)) {
      let only_lang_key = $1.head;
      return new Ok(only_lang_key[2]);
    } else {
      let dublic_lang_keys = $1;
      let _pipe = dublic_lang_keys;
      let _pipe$1 = $list.first(_pipe);
      return $result.map(_pipe$1, (key) => { return key[2]; });
    }
  }
}

function list_value_find(values, desired_value, language) {
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
      (value) => { return value[0] === language; },
    );
    if ($1.hasLength(0)) {
      let _pipe = dublic_values;
      let _pipe$1 = $list.first(_pipe);
      return $result.map(_pipe$1, (value) => { return value[1]; });
    } else if ($1.hasLength(1)) {
      let only_lang_value = $1.head;
      return new Ok(only_lang_value[1]);
    } else {
      let dublic_lang_values = $1;
      let _pipe = dublic_lang_values;
      let _pipe$1 = $list.first(_pipe);
      return $result.map(_pipe$1, (value) => { return value[1]; });
    }
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

function if_(condition, if_true, if_false) {
  if (condition) {
    return if_true;
  } else {
    return if_false;
  }
}

export const morse_code_list = $characters.base_characters;

export const default_dot = ".";

export const default_dash = "-";

export const default_space = "/";

export const default_separator = " ";

export const default_is_uppercase = false;

export const default_to_uppercase = false;

export const language_latin = /* @__PURE__ */ new Language("1");

export const default_language = language_latin;

export function encode(input, options, morse_code_dict) {
  let opt_output_dot = $option.unwrap(options.output_dot, default_dot);
  let opt_output_dash = $option.unwrap(options.output_dash, default_dash);
  let opt_output_space = $option.unwrap(options.output_space, default_space);
  let opt_output_separator = $option.unwrap(
    options.output_separator,
    default_separator,
  );
  let opt_is_uppercase = $option.unwrap(
    options.is_uppercase,
    default_is_uppercase,
  );
  let opt_language = $option.unwrap(options.language, default_language).num;
  let _pipe = input;
  let _pipe$1 = $string.to_graphemes(_pipe);
  let _pipe$2 = $list.try_map(
    _pipe$1,
    (g) => {
      if (g === " ") {
        return new Ok(opt_output_space);
      } else if (g === "\n") {
        return new Ok(opt_output_space);
      } else if (g === "\r") {
        return new Ok(opt_output_space);
      } else if (g === "\t") {
        return new Ok(opt_output_space);
      } else {
        let g$1 = if_(opt_is_uppercase, g, $string.uppercase(g));
        let $ = list_key_find(
          $option.unwrap(morse_code_dict, morse_code_list),
          g$1,
          opt_language,
        );
        if ($.isOk()) {
          let bools = $[0];
          let _pipe$2 = bools;
          let _pipe$3 = $list.map(
            _pipe$2,
            (_capture) => {
              return if_(_capture, opt_output_dash, opt_output_dot);
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
    (_capture) => { return $string.join(_capture, opt_output_separator); },
  );
}

export function encode_to_string(input, options, morse_code_dict) {
  let $ = encode(input, options, morse_code_dict);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

export function decode(input, options, morse_code_dict) {
  let opt_input_dot = $option.unwrap(options.input_dot, default_dot);
  let opt_input_dash = $option.unwrap(options.input_dash, default_dash);
  let opt_input_space = $option.unwrap(options.input_space, default_space);
  let opt_input_separator = $option.unwrap(
    options.input_separator,
    default_separator,
  );
  let opt_to_uppercase = $option.unwrap(
    options.to_uppercase,
    default_to_uppercase,
  );
  let opt_language = $option.unwrap(options.language, default_language).num;
  let _pipe = input;
  let _pipe$1 = $string.split(_pipe, opt_input_separator);
  let _pipe$2 = $list.try_map(
    _pipe$1,
    (w) => {
      let $ = true;
      if (w === "") {
        return new Ok("");
      } else if (w === opt_input_space) {
        return new Ok(" ");
      } else {
        let _pipe$2 = w;
        let _pipe$3 = $string.to_graphemes(_pipe$2);
        let _pipe$4 = $list.try_map(
          _pipe$3,
          (g) => {
            let $1 = true;
            if (g === opt_input_dot) {
              return new Ok(false);
            } else if (g === opt_input_dash) {
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
              $option.unwrap(morse_code_dict, morse_code_list),
              bools,
              opt_language,
            );
            if ($1.isOk()) {
              let value = $1[0];
              return if_(
                opt_to_uppercase,
                new Ok(value),
                new Ok($string.lowercase(value)),
              );
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

export function decode_to_string(input, options, morse_code_dict) {
  let $ = decode(input, options, morse_code_dict);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

export const language_numbers = /* @__PURE__ */ new Language("2");

export const language_punctuation = /* @__PURE__ */ new Language("3");

export const language_latin_extended = /* @__PURE__ */ new Language("4");

export const language_cyrillic = /* @__PURE__ */ new Language("5");

export const language_greek = /* @__PURE__ */ new Language("6");

export const language_hebrew = /* @__PURE__ */ new Language("7");

export const language_arabic = /* @__PURE__ */ new Language("8");

export const language_persian = /* @__PURE__ */ new Language("9");

export const language_japanese = /* @__PURE__ */ new Language("10");

export const language_korean = /* @__PURE__ */ new Language("11");

export const language_thai = /* @__PURE__ */ new Language("12");
