import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $ch from "./characters.mjs";
import { Ok, Error, CustomType as $CustomType, isEqual } from "./gleam.mjs";

export class MorseCodeError extends $CustomType {
  constructor(msg) {
    super();
    this.msg = msg;
  }
}

export class EncodeOptions extends $CustomType {
  constructor(output_dot, output_dash, output_space, output_separator, is_uppercase_only) {
    super();
    this.output_dot = output_dot;
    this.output_dash = output_dash;
    this.output_space = output_space;
    this.output_separator = output_separator;
    this.is_uppercase_only = is_uppercase_only;
  }
}

export class DecodeOptions extends $CustomType {
  constructor(input_dot, input_dash, input_space, input_separator, to_uppercase) {
    super();
    this.input_dot = input_dot;
    this.input_dash = input_dash;
    this.input_space = input_space;
    this.input_separator = input_separator;
    this.to_uppercase = to_uppercase;
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

export function encode(morse_code_dict, input, options) {
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
          let $ = options.is_uppercase_only;
          if ($) {
            return g;
          } else {
            return $string.uppercase(g);
          }
        })();
        let $ = $dict.get(morse_code_dict, g$1);
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

export function encode_to_string(morse_code_dict, input, options) {
  let $ = encode(morse_code_dict, input, options);
  if ($.isOk()) {
    let value = $[0];
    return value;
  } else {
    let value = $[0];
    return value.msg;
  }
}

function list_value_find(values, desired_value) {
  let key = (() => {
    let _pipe = values;
    return $list.find(
      _pipe,
      (k) => {
        let v = k[1];
        if (isEqual(v, desired_value)) {
          return true;
        } else {
          return false;
        }
      },
    );
  })();
  if (key.isOk()) {
    let value = key[0];
    return new Ok(value[0]);
  } else {
    return new Error(undefined);
  }
}

export function decode(morse_code_list, input, options) {
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
            let $1 = list_value_find(morse_code_list, bools);
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

export function decode_to_string(morse_code_list, input, options) {
  let $ = decode(morse_code_list, input, options);
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
