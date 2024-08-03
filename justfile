#!/usr/bin/just -f

files := ""

_:
	@just --list

build:
	gleam build --target javascript

format:
	gleam format ./src/morse_code_translator.gleam
	just files="./src/morse_code_translator.gleam" format-js

[private]
format-js:
	#!/usr/bin/env node
	const fs = require('fs');
	"{{ files }}".split(";").forEach(f => {
		if (f.length > 1) {
			const input = fs.readFileSync(f, "utf8");
			fs.writeFileSync(f, input.replace(/(?!\n)(  )(?=\D*)/g, "   "));
		}
	})

[confirm]
gh-pages:
	git switch gh-pages
	git merge main --strategy-option theirs --no-commit
	just build
	git add ./build
	git commit
	git push
	git switch -
