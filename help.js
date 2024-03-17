function gleam_gen(characters) {
	return "let characters: dict.Dict(String, dict.Dict(String, List(Bool))) = dict.from_list([\n    " +
		Object.entries(characters).map(wskv => {
			const wsk = wskv[0]
			const wsv = wskv[1]
			return [
				"#(\"" + wsk + "\"",
				"dict.from_list([" + Object.entries(wsv).map(kv => [
					"#(\"" + kv[0] + "\"",
					"[" + kv[1].split("").map(bit =>
						bit === "0" ? "False" : "True").join(", ") + "])"
				]).join(",\n        ") + "\n]))"
			]
		}).join(",\n    ") + "])"
}