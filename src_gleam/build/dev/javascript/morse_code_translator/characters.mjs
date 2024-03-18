import { toList } from "./gleam.mjs";

export const base_characters = toList([
  ["1", "A", toList([false, true])],
  ["1", "B", toList([true, false, false, false])],
  ["1", "C", toList([true, false, true, false])],
  ["1", "D", toList([true, false, false])],
  ["1", "E", toList([false])],
  ["1", "F", toList([false, false, true, false])],
  ["1", "G", toList([true, true, false])],
  ["1", "H", toList([false, false, false, false])],
  ["1", "I", toList([false, false])],
  ["1", "J", toList([false, true, true, true])],
  ["1", "K", toList([true, false, true])],
  ["1", "L", toList([false, true, false, false])],
  ["1", "M", toList([true, true])],
  ["1", "N", toList([true, false])],
  ["1", "O", toList([true, true, true])],
  ["1", "P", toList([false, true, true, false])],
  ["1", "Q", toList([true, true, false, true])],
  ["1", "R", toList([false, true, false])],
  ["1", "S", toList([false, false, false])],
  ["1", "T", toList([true])],
  ["1", "U", toList([false, false, true])],
  ["1", "V", toList([false, false, false, true])],
  ["1", "W", toList([false, true, true])],
  ["1", "X", toList([true, false, false, true])],
  ["1", "Y", toList([true, false, true, true])],
  ["1", "Z", toList([true, true, false, false])],
  ["2", "0", toList([true, true, true, true, true])],
  ["2", "1", toList([false, true, true, true, true])],
  ["2", "2", toList([false, false, true, true, true])],
  ["2", "3", toList([false, false, false, true, true])],
  ["2", "4", toList([false, false, false, false, true])],
  ["2", "5", toList([false, false, false, false, false])],
  ["2", "6", toList([true, false, false, false, false])],
  ["2", "7", toList([true, true, false, false, false])],
  ["2", "8", toList([true, true, true, false, false])],
  ["2", "9", toList([true, true, true, true, false])],
  ["3", ".", toList([false, true, false, true, false, true])],
  ["3", ",", toList([true, true, false, false, true, true])],
  ["3", "?", toList([false, false, true, true, false, false])],
  ["3", "'", toList([false, true, true, true, true, false])],
  ["3", "!", toList([true, false, true, false, true, true])],
  ["3", "/", toList([true, false, false, true, false])],
  ["3", "(", toList([true, false, true, true, false])],
  ["3", ")", toList([true, false, true, true, false, true])],
  ["3", "&", toList([false, true, false, false, false])],
  ["3", ":", toList([true, true, true, false, false, false])],
  ["3", ";", toList([true, false, true, false, true, false])],
  ["3", "=", toList([true, false, false, false, true])],
  ["3", "+", toList([false, true, false, true, false])],
  ["3", "-", toList([true, false, false, false, false, true])],
  ["3", "_", toList([false, false, true, true, false, true])],
  ["3", "\"", toList([false, true, false, false, true, false])],
  ["3", "$", toList([false, false, false, true, false, false, true])],
  ["3", "@", toList([false, true, true, false, true, false])],
  ["3", "¿", toList([false, false, true, false, true])],
  ["3", "¡", toList([true, true, false, false, false, true])],
  ["4", "Ã", toList([false, true, true, false, true])],
  ["4", "Á", toList([false, true, true, false, true])],
  ["4", "Å", toList([false, true, true, false, true])],
  ["4", "À", toList([false, true, true, false, true])],
  ["4", "Â", toList([false, true, true, false, true])],
  ["4", "Ä", toList([false, true, false, true])],
  ["4", "Ą", toList([false, true, false, true])],
  ["4", "Æ", toList([false, true, false, true])],
  ["4", "Ç", toList([true, false, true, false, false])],
  ["4", "Ć", toList([true, false, true, false, false])],
  ["4", "Ĉ", toList([true, false, true, false, false])],
  ["4", "Č", toList([true, true, false])],
  ["4", "Ð", toList([false, false, true, true, false])],
  ["4", "È", toList([false, true, false, false, true])],
  ["4", "Ę", toList([false, false, true, false, false])],
  ["4", "Ë", toList([false, false, true, false, false])],
  ["4", "É", toList([false, false, true, false, false])],
  ["4", "Ê", toList([true, false, false, true, false])],
  ["4", "Ğ", toList([true, true, false, true, false])],
  ["4", "Ĝ", toList([true, true, false, true, false])],
  ["4", "Ĥ", toList([true, true, true, true])],
  ["4", "İ", toList([false, true, false, false, true])],
  ["4", "Ï", toList([true, false, false, true, true])],
  ["4", "Ì", toList([false, true, true, true, false])],
  ["4", "Ĵ", toList([false, true, true, true, false])],
  ["4", "Ł", toList([false, true, false, false, true])],
  ["4", "Ń", toList([true, true, false, true, true])],
  ["4", "Ñ", toList([true, true, false, true, true])],
  ["4", "Ó", toList([true, true, true, false])],
  ["4", "Ò", toList([true, true, true, false])],
  ["4", "Ö", toList([true, true, true, false])],
  ["4", "Ô", toList([true, true, true, false])],
  ["4", "Ø", toList([true, true, true, false])],
  ["4", "Ś", toList([false, false, false, true, false, false, false])],
  ["4", "Ş", toList([false, true, true, false, false])],
  ["4", "Ș", toList([true, true, true, true])],
  ["4", "Š", toList([true, true, true, true])],
  ["4", "Ŝ", toList([false, false, false, true, false])],
  ["4", "ß", toList([false, false, false, false, false, false])],
  ["4", "Þ", toList([false, true, true, false, false])],
  ["4", "Ü", toList([false, false, true, true])],
  ["4", "Ù", toList([false, false, true, true])],
  ["4", "Ŭ", toList([false, false, true, true])],
  ["4", "Ž", toList([true, true, false, false, true])],
  ["4", "Ź", toList([true, true, false, false, true, false])],
  ["4", "Ż", toList([true, true, false, false, true])],
  ["5", "А", toList([false, true])],
  ["5", "Б", toList([true, false, false, false])],
  ["5", "В", toList([false, true, true])],
  ["5", "Г", toList([true, true, false])],
  ["5", "Д", toList([true, false, false])],
  ["5", "Е", toList([false])],
  ["5", "Ж", toList([false, false, false, true])],
  ["5", "З", toList([true, true, false, false])],
  ["5", "И", toList([false, false])],
  ["5", "Й", toList([false, true, true, true])],
  ["5", "К", toList([true, false, true])],
  ["5", "Л", toList([false, true, false, false])],
  ["5", "М", toList([true, true])],
  ["5", "Н", toList([true, false])],
  ["5", "О", toList([true, true, true])],
  ["5", "П", toList([false, true, true, false])],
  ["5", "Р", toList([false, true, false])],
  ["5", "С", toList([false, false, false])],
  ["5", "Т", toList([true])],
  ["5", "У", toList([false, false, true])],
  ["5", "Ф", toList([false, false, true, false])],
  ["5", "Х", toList([false, false, false, false])],
  ["5", "Ц", toList([true, false, true, false])],
  ["5", "Ч", toList([true, true, true, false])],
  ["5", "Ш", toList([true, true, true, true])],
  ["5", "Щ", toList([true, true, false, true])],
  ["5", "Ъ", toList([true, true, false, true, true])],
  ["5", "Ы", toList([true, false, true, true])],
  ["5", "Ь", toList([true, false, false, true])],
  ["5", "Э", toList([false, false, true, false, false])],
  ["5", "Ю", toList([false, false, true, true])],
  ["5", "Я", toList([false, true, false, true])],
  ["5", "Ї", toList([false, true, true, true, false])],
  ["5", "Є", toList([false, false, true, false, false])],
  ["5", "І", toList([false, false])],
  ["5", "Ґ", toList([true, true, false])],
  ["6", "Α", toList([false, true])],
  ["6", "Β", toList([true, false, false, false])],
  ["6", "Γ", toList([true, true, false])],
  ["6", "Δ", toList([true, false, false])],
  ["6", "Ε", toList([false])],
  ["6", "Ζ", toList([true, true, false, false])],
  ["6", "Η", toList([false, false, false, false])],
  ["6", "Θ", toList([true, false, true, false])],
  ["6", "Ι", toList([false, false])],
  ["6", "Κ", toList([true, false, true])],
  ["6", "Λ", toList([false, true, false, false])],
  ["6", "Μ", toList([true, true])],
  ["6", "Ν", toList([true, false])],
  ["6", "Ξ", toList([true, false, false, true])],
  ["6", "Ο", toList([true, true, true])],
  ["6", "Π", toList([false, true, true, false])],
  ["6", "Ρ", toList([false, true, false])],
  ["6", "Σ", toList([false, false, false])],
  ["6", "Τ", toList([true])],
  ["6", "Υ", toList([true, false, true, true])],
  ["6", "Φ", toList([false, false, true, false])],
  ["6", "Χ", toList([true, true, true, true])],
  ["6", "Ψ", toList([true, true, false, true])],
  ["6", "Ω", toList([false, true, true])],
  ["7", "א", toList([false, true])],
  ["7", "ב", toList([true, false, false, false])],
  ["7", "ג", toList([true, true, false])],
  ["7", "ד", toList([true, false, false])],
  ["7", "ה", toList([true, true, true])],
  ["7", "ו", toList([false])],
  ["7", "ז", toList([true, true, false, false])],
  ["7", "ח", toList([false, false, false, false])],
  ["7", "ט", toList([false, false, true])],
  ["7", "י", toList([false, false])],
  ["7", "כ", toList([true, false, true])],
  ["7", "ל", toList([false, true, false, false])],
  ["7", "מ", toList([true, true])],
  ["7", "נ", toList([true, false])],
  ["7", "ס", toList([true, false, true, false])],
  ["7", "ע", toList([false, true, true, true])],
  ["7", "פ", toList([false, true, true, false])],
  ["7", "צ", toList([false, true, true])],
  ["7", "ק", toList([true, true, false, true])],
  ["7", "ר", toList([false, true, false])],
  ["7", "ש", toList([false, false, false])],
  ["7", "ת", toList([true])],
  ["8", "ا", toList([false, true])],
  ["8", "ب", toList([true, false, false, false])],
  ["8", "ت", toList([true])],
  ["8", "ث", toList([true, false, true, false])],
  ["8", "ج", toList([false, true, true, true])],
  ["8", "ح", toList([false, false, false, false])],
  ["8", "خ", toList([true, true, true])],
  ["8", "د", toList([true, false, false])],
  ["8", "ذ", toList([true, true, false, false])],
  ["8", "ر", toList([false, true, false])],
  ["8", "ز", toList([true, true, true, false])],
  ["8", "س", toList([false, false, false])],
  ["8", "ش", toList([true, true, true, true])],
  ["8", "ص", toList([true, false, false, true])],
  ["8", "ض", toList([false, false, false, true])],
  ["8", "ط", toList([false, false, true])],
  ["8", "ظ", toList([true, false, true, true])],
  ["8", "ع", toList([false, true, false, true])],
  ["8", "غ", toList([true, true, false])],
  ["8", "ف", toList([false, false, true, false])],
  ["8", "ق", toList([true, true, false, true])],
  ["8", "ك", toList([true, false, true])],
  ["8", "ل", toList([false, true, false, false])],
  ["8", "م", toList([true, true])],
  ["8", "ن", toList([true, false])],
  ["8", "ه", toList([false, false, true, false, false])],
  ["8", "و", toList([false, true, true])],
  ["8", "ي", toList([false, false])],
  ["8", "ﺀ", toList([false])],
  ["9", "ا", toList([false, true])],
  ["9", "ب", toList([true, false, false, false])],
  ["9", "پ", toList([false, true, true, false])],
  ["9", "ت", toList([true])],
  ["9", "ث", toList([true, false, true, false])],
  ["9", "ج", toList([false, true, true, true])],
  ["9", "چ", toList([true, true, true, false])],
  ["9", "ح", toList([false, false, false, false])],
  ["9", "خ", toList([true, false, false, true])],
  ["9", "د", toList([true, false, false])],
  ["9", "ذ", toList([false, false, false, true])],
  ["9", "ر", toList([false, true, false])],
  ["9", "ز", toList([true, true, false, false])],
  ["9", "ژ", toList([true, true, false])],
  ["9", "س", toList([false, false, false])],
  ["9", "ش", toList([true, true, true, true])],
  ["9", "ص", toList([false, true, false, true])],
  ["9", "ض", toList([false, false, true, false, false])],
  ["9", "ط", toList([false, false, true])],
  ["9", "ظ", toList([true, false, true, true])],
  ["9", "ع", toList([true, true, true])],
  ["9", "غ", toList([false, false, true, true])],
  ["9", "ف", toList([false, false, true, false])],
  ["9", "ق", toList([true, true, true, false, false, false])],
  ["9", "ک", toList([true, false, true])],
  ["9", "گ", toList([true, true, false, true])],
  ["9", "ل", toList([false, true, false, false])],
  ["9", "م", toList([true, true])],
  ["9", "ن", toList([true, false])],
  ["9", "و", toList([false, true, true])],
  ["9", "ه", toList([false])],
  ["9", "ی", toList([false, false])],
  ["10", "ア", toList([true, true, false, true, true])],
  ["10", "カ", toList([false, true, false, false])],
  ["10", "サ", toList([true, false, true, false, true])],
  ["10", "タ", toList([true, false])],
  ["10", "ナ", toList([false, true, false])],
  ["10", "ハ", toList([true, false, false, false])],
  ["10", "マ", toList([true, false, false, true])],
  ["10", "ヤ", toList([false, true, true])],
  ["10", "ラ", toList([false, false, false])],
  ["10", "ワ", toList([true, false, true])],
  ["10", "イ", toList([false, true])],
  ["10", "キ", toList([true, false, true, false, false])],
  ["10", "シ", toList([true, true, false, true, false])],
  ["10", "チ", toList([false, false, true, false])],
  ["10", "ニ", toList([true, false, true, false])],
  ["10", "ヒ", toList([true, true, false, false, true])],
  ["10", "ミ", toList([false, false, true, false, true])],
  ["10", "リ", toList([true, true, false])],
  ["10", "ヰ", toList([false, true, false, false, true])],
  ["10", "ウ", toList([false, false, true])],
  ["10", "ク", toList([false, false, false, true])],
  ["10", "ス", toList([true, true, true, false, true])],
  ["10", "ツ", toList([false, true, true, false])],
  ["10", "ヌ", toList([false, false, false, false])],
  ["10", "フ", toList([true, true, false, false])],
  ["10", "ム", toList([true])],
  ["10", "ユ", toList([true, false, false, true, true])],
  ["10", "ル", toList([true, false, true, true, false])],
  ["10", "ン", toList([false, true, false, true, false])],
  ["10", "エ", toList([true, false, true, true, true])],
  ["10", "ケ", toList([true, false, true, true])],
  ["10", "セ", toList([false, true, true, true, false])],
  ["10", "テ", toList([false, true, false, true, true])],
  ["10", "ネ", toList([true, true, false, true])],
  ["10", "ヘ", toList([false])],
  ["10", "メ", toList([true, false, false, false, true])],
  ["10", "レ", toList([true, true, true])],
  ["10", "ヱ", toList([false, true, true, false, false])],
  ["10", "オ", toList([false, true, false, false, false])],
  ["10", "コ", toList([true, true, true, true])],
  ["10", "ソ", toList([true, true, true, false])],
  ["10", "ト", toList([false, false, true, false, false])],
  ["10", "ノ", toList([false, false, true, true])],
  ["10", "ホ", toList([true, false, false])],
  ["10", "モ", toList([true, false, false, true, false])],
  ["10", "ヨ", toList([true, true])],
  ["10", "ロ", toList([false, true, false, true])],
  ["10", "ヲ", toList([false, true, true, true])],
  ["10", "゛", toList([false, false])],
  ["10", "゜", toList([false, false, true, true, false])],
  ["10", "。", toList([false, true, false, true, false, false])],
  ["10", "ー", toList([false, true, true, false, true])],
  ["10", "、", toList([false, true, false, true, false, true])],
  ["10", "（", toList([true, false, true, true, false, true])],
  ["10", "）", toList([false, true, false, false, true, false])],
  ["11", "ㄱ", toList([false, true, false, false])],
  ["11", "ㄴ", toList([false, false, true, false])],
  ["11", "ㄷ", toList([true, false, false, false])],
  ["11", "ㄹ", toList([false, false, false, true])],
  ["11", "ㅁ", toList([true, true])],
  ["11", "ㅂ", toList([false, true, true])],
  ["11", "ㅅ", toList([true, true, false])],
  ["11", "ㅇ", toList([true, false, true])],
  ["11", "ㅈ", toList([false, true, true, false])],
  ["11", "ㅊ", toList([true, false, true, false])],
  ["11", "ㅋ", toList([true, false, false, true])],
  ["11", "ㅌ", toList([true, true, false, false])],
  ["11", "ㅍ", toList([true, true, true])],
  ["11", "ㅎ", toList([false, true, true, true])],
  ["11", "ㅏ", toList([false])],
  ["11", "ㅑ", toList([false, false])],
  ["11", "ㅓ", toList([true])],
  ["11", "ㅕ", toList([false, false, false])],
  ["11", "ㅗ", toList([false, true])],
  ["11", "ㅛ", toList([true, false])],
  ["11", "ㅜ", toList([false, false, false, false])],
  ["11", "ㅠ", toList([false, true, false])],
  ["11", "ㅡ", toList([true, false, false])],
  ["11", "ㅣ", toList([false, false, true])],
  ["12", "ก", toList([true, true, false])],
  ["12", "ข", toList([true, false, true, false])],
  ["12", "ค", toList([true, false, true])],
  ["12", "ง", toList([true, false, true, true, false])],
  ["12", "จ", toList([true, false, false, true, false])],
  ["12", "ฉ", toList([true, true, true, true])],
  ["12", "ช", toList([true, false, false, true])],
  ["12", "ซ", toList([true, true, false, false])],
  ["12", "ญ", toList([false, true, true, true])],
  ["12", "ด", toList([true, false, false])],
  ["12", "ต", toList([true])],
  ["12", "ถ", toList([true, false, true, false, false])],
  ["12", "ท", toList([true, false, false, true, true])],
  ["12", "น", toList([true, false])],
  ["12", "บ", toList([true, false, false, false])],
  ["12", "ป", toList([false, true, true, false])],
  ["12", "ผ", toList([true, true, false, true])],
  ["12", "ฝ", toList([true, false, true, false, true])],
  ["12", "พ", toList([false, true, true, false, false])],
  ["12", "ฟ", toList([false, false, true, false])],
  ["12", "ม", toList([true, true])],
  ["12", "ย", toList([true, false, true, true])],
  ["12", "ร", toList([false, true, false])],
  ["12", "ล", toList([false, true, false, false])],
  ["12", "ว", toList([false, true, true])],
  ["12", "ส", toList([false, false, false])],
  ["12", "ห", toList([false, false, false, false])],
  ["12", "อ", toList([true, false, false, false, true])],
  ["12", "ฮ", toList([true, true, false, true, true])],
  ["12", "ฤ", toList([false, true, false, true, true])],
  ["12", "ะ", toList([false, true, false, false, false])],
  ["12", "า", toList([false, true])],
  ["12", "ิ", toList([false, false, true, false, false])],
  ["12", "ี", toList([false, false])],
  ["12", "ึ", toList([false, false, true, true, false])],
  ["12", "ื", toList([false, false, true, true])],
  ["12", "ุ", toList([false, false, true, false, true])],
  ["12", "ู", toList([true, true, true, false])],
  ["12", "เ", toList([false])],
  ["12", "แ", toList([false, true, false, true])],
  ["12", "ไ", toList([false, true, false, false, true])],
  ["12", "โ", toList([true, true, true])],
  ["12", "ำ", toList([false, false, false, true, false])],
  ["12", "่", toList([false, false, true])],
  ["12", "้", toList([false, false, false, true])],
  ["12", "๊", toList([true, true, false, false, false])],
  ["12", "๋", toList([false, true, false, true, false])],
  ["12", "ั", toList([false, true, true, false, true])],
  ["12", "็", toList([true, true, true, false, false])],
  ["12", "์", toList([true, true, false, false, true])],
  ["12", "ๆ", toList([true, false, true, true, true])],
  ["12", "ฯ", toList([true, true, false, true, false])],
]);
