import * as morse_code from "./build/dev/javascript/morse_code_translator/morse_code_translator.mjs"
import * as option from "./build/dev/javascript/gleam_stdlib/gleam/option.mjs"

// button.onclick
function set_lang(mc_lang) {
	window.mc_lang = mc_lang
	oninp(window.inputs[0])
}

// button.onclick
function add_row(dot, dash, sp, sep) {
	document.getElementById("add_row_div").style.display = "block";
	if (dot.value.length == 0) { dot.focus(); return; }
	if (dash.value.length == 0) { dash.focus(); return; }
	if (sp.value.length == 0) { sp.focus(); return; }
	if (sep.value.lenth == 0) { sep.focus(); return; }
	main_table_add_row(oninp, {
		str_dot: dot.value, str_dash: dash.value, str_sp: sp.value, str_sep: sep.value
	})
	dot.value = ""
	dash.value = ""
	sp.value = ""
	sep.value = ""
	document.getElementById("add_row_div").style.display = "none";
}

// textarea.oninput
function oninp(this_inp, skip_abc) {
	// if abc textarea
	if (this_inp.str_dot === "abc" && this_inp.str_dash === "") {
		// first non abc textarea
		const t_inp = window.inputs[0]
		const result = morse_code.encode(this_inp.el.value, new morse_code.EncodeOptions(
			new option.Some(t_inp.str_dot), new option.Some(t_inp.str_dash),
			new option.Some(t_inp.str_sp), new option.Some(t_inp.str_sep),
			new option.Some(false), new option.Some(window.mc_lang)),
			window.characters_list)
		// TODO: improve
		if (result.isOk()) {
			t_inp.el.value = result["0"]
		} else {
			window.inputs.forEach(inp => {
				inp.el.value = result["0"].msg
			})
			return
		}
		// only convert
		oninp(window.inputs[0], true)
	} else {
		// skip because abc is input
		if (!skip_abc) {
			window.input_abc.el.value = morse_code.decode_to_string(
				this_inp.el.value, new morse_code.DecodeOptions(
					new option.Some(this_inp.str_dot), new option.Some(this_inp.str_dash),
					new option.Some(this_inp.str_sp), new option.Some(this_inp.str_sep),
					new option.Some(false), new option.Some(window.mc_lang)),
				window.characters_list)

		}
		window.inputs.forEach(inp => {
			// skip input object
			if (!(this_inp.str_dot === inp.str_dot && this_inp.str_dash === inp.str_dash &&
				this_inp.str_sp === inp.str_sp && this_inp.str_sep === inp.str_sep)) {
				inp.el.value = morse_code.convert_to_string(this_inp.el.value,
					new morse_code.ConvertOptions(
						this_inp.str_dot, inp.str_dot,
						this_inp.str_dash, inp.str_dash,
						this_inp.str_sp, inp.str_sp,
						this_inp.str_sep, inp.str_sep))

			}
		})
	}
}

function set_element_language(d, dlo, lang) {
	try {
		const dp = JSON.parse(dlo)
		if (!dp.hasOwnProperty(lang)) {
			lang = "en"
		}
		switch (dp.type) {
			case 0: window.document.title = dp[lang]; break;
			case 1: d.textContent = dp[lang]; break;
			case 2: d.textContent = dp[lang]; break;
			case 3: d.value = dp[lang]; break;
			case 4: d.placeholder = dp[lang]; break;
			default: console.warn(dp); break;
		}
	} catch (err) {
		console.error(err)
	}
}

function set_page_language(lang) {
	document.documentElement.lang = lang
	document.querySelectorAll('[data-lo]').forEach(d => {
		set_element_language(d, d.dataset.lo, lang)
	})
	set_element_language(null, '{"type": 0, "en": "Morse Code Translator", "ru": "Переводчик Азбуки Морзе", "bg": "Преводач на морзова азбука"}', lang)
}

function escapeHtml(unsafe) {
	return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll(
		'>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function main_table_add_row(fn_oninput, options) {
	const new_row = window.main_table.insertRow(0)
	const new_row_span = document.createElement("span")
	new_row_span.textContent = options.str_dot + options.str_dash
	new_row.insertCell(0).appendChild(new_row_span)
	const new_cell = new_row.insertCell(1)
	new_cell.style.width = "100%"
	const el_text_area = document.createElement("textarea")
	el_text_area.rows = "5"
	el_text_area.style.width = "100%"
	el_text_area.dataset.lo = '{"type": 4, "en": "enter code", "ru": "введите код", "bg": "въведете код"}'
	options.el = el_text_area
	el_text_area.oninput = function () {
		fn_oninput(options)
	}
	new_cell.appendChild(el_text_area)
	if (options.str_dot === "abc" || options.str_dash === "") {
		new_row_span.dataset.lo = '{"type": 1, "en": "abc", "ru": "абв", "bg": "абв"}'
		el_text_area.dataset.lo = '{"type": 4, "en": "enter text", "ru": "введите текст", "bg": "въведете текст"}'
		window.input_abc = options
	} else {
		window.inputs.push(options)
	}
	set_element_language(el_text_area, el_text_area.dataset.lo, document.documentElement.lang)
}

document.body.onload = function () {
	window.inputs = []
	window.input_abc = {}
	window.characters_list = new option.Some(morse_code.morse_code_list)
	window.mc_lang = "1"
	// html table
	window.el_main_table = document.getElementById("main_table")
	// used in html
	window.set_lang = set_lang
	window.add_row = add_row

	main_table_add_row(oninp, { str_dot: "•", str_dash: "−", str_sp: "/", str_sep: " " })
	main_table_add_row(oninp, { str_dot: ".", str_dash: "-", str_sp: "/", str_sep: " " })
	main_table_add_row(oninp, { str_dot: "abc", str_dash: "", str_sp: "/", str_sep: " " })

	window.set_page_language = set_page_language
	switch (navigator.language || navigator.userLanguage) {
		case "ru": set_page_language("ru"); break;
		case "bg": set_page_language("bg"); break;
	}

	// focus first textarea
	window.input_abc.el.focus()
}
