import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $ch from "./characters.mjs";
import { CustomType as $CustomType, makeError, isEqual } from "./gleam.mjs";

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
  let _pipe$2 = $list.map(
    _pipe$1,
    (g) => {
      if (g === " ") {
        return options.output_space;
      } else if (g === "\n") {
        return options.output_space;
      } else if (g === "\r") {
        return options.output_space;
      } else if (g === "\t") {
        return options.output_space;
      } else {
        let g$1 = (() => {
          let $ = options.is_uppercase_only;
          if ($) {
            return g;
          } else {
            return $string.uppercase(g);
          }
        })();
        let mc_bools = $dict.get(morse_code_dict, g$1);
        let mc_bools$1 = (() => {
          if (mc_bools.isOk()) {
            let value = mc_bools[0];
            return value;
          } else {
            throw makeError(
              "todo",
              "morse_code_translator",
              36,
              "",
              ("Invalid symbol: " + g$1),
              {}
            )
          }
        })();
        let _pipe$2 = mc_bools$1;
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
        return $string.join(_pipe$3, "");
      }
    },
  );
  return $string.join(_pipe$2, options.output_separator);
}

export function decode(morse_code_list, input, options) {
  let _pipe = input;
  let _pipe$1 = $string.split(_pipe, options.input_separator);
  let _pipe$2 = $list.map(
    _pipe$1,
    (w) => {
      let $ = true;
      if (w === "") {
        return "";
      } else if (w === options.input_space) {
        return " ";
      } else {
        let mc_bools = (() => {
          let _pipe$2 = w;
          let _pipe$3 = $string.to_graphemes(_pipe$2);
          return $list.map(
            _pipe$3,
            (g) => {
              let $1 = true;
              if (g === options.input_dot) {
                return false;
              } else if (g === options.input_dash) {
                return true;
              } else {
                throw makeError(
                  "todo",
                  "morse_code_translator",
                  81,
                  "",
                  ("Invalid morse code symbol: " + g),
                  {}
                )
              }
            },
          );
        })();
        let mc_found = (() => {
          let _pipe$2 = morse_code_list;
          return $list.find(
            _pipe$2,
            (k) => {
              let v = k[1];
              if (isEqual(v, mc_bools)) {
                return true;
              } else {
                return false;
              }
            },
          );
        })();
        if (mc_found.isOk()) {
          let value = mc_found[0];
          let $1 = options.to_uppercase;
          if ($1) {
            return value[0];
          } else {
            return $string.lowercase(value[0]);
          }
        } else {
          throw makeError(
            "todo",
            "morse_code_translator",
            99,
            "",
            ("Invalid symbol: " + w),
            {}
          )
        }
      }
    },
  );
  return $string.join(_pipe$2, "");
}

export function convert(input, options) {
  let _pipe = input;
  let _pipe$1 = $string.to_graphemes(_pipe);
  let _pipe$2 = $list.map(
    _pipe$1,
    (g) => {
      let $ = true;
      if (g === options.input_separator) {
        return options.output_separator;
      } else if (g === options.input_space) {
        return options.output_space;
      } else if (g === options.input_dot) {
        return options.output_dot;
      } else if (g === options.input_dash) {
        return options.output_dash;
      } else {
        throw makeError(
          "todo",
          "morse_code_translator",
          129,
          "",
          ("Invalid morse code symbol: " + g),
          {}
        )
      }
    },
  );
  return $string.join(_pipe$2, "");
}
