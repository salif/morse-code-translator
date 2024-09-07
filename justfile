#!/usr/bin/env -S just -f

_:
	@just --list

build:
	gleam build --target javascript

format:
	gleam format ./src/morse_code_translator.gleam
	just format-js ./src/morse_code_translator.gleam

[private]
format-js files:
	#!/usr/bin/env node
	const fs = require('fs');
	"{{ files }}".split(";").forEach(f => {
		if (f.length > 1) {
			const input = fs.readFileSync(f, "utf8");
			fs.writeFileSync(f, input.replace(/(?!\n)(  )(?=\D*)/g, "   "));
		}
	})

[private]
build-ifn:
	@if ! test -d build/dev/javascript/morse_code_translator/morse_code_translator.mjs; then just build; fi

serve port='8080': build-ifn
	python3 -m http.server {{port}}

[confirm]
gh-pages:
	git switch gh-pages
	git merge main --strategy-option theirs --no-commit
	just build
	git add ./build
	git commit
	git push
	git switch -
