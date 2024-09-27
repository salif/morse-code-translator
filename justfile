#!/usr/bin/env -S just -f

gleam_cmd := "gleam"

_:
	@just --list

[doc('Build the project')]
build:
	{{ gleam_cmd }} build --target javascript

[doc('Format source code')]
format:
	@if command -v gleam-patched 2>&1 >/dev/null; then \
		gleam-patched format ./src/morse_code_translator.gleam; \
	else \
		{{ gleam_cmd }} format ./src/morse_code_translator.gleam; \
		printf "Using format-js\n"; \
		just format-js ./src/morse_code_translator.gleam; fi

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

[doc('Start an HTTP server')]
serve port='8080':
	@if ! test -f build/dev/javascript/morse_code_translator/morse_code_translator.mjs; \
		then just build; fi
	python3 -m http.server {{port}}

[confirm]
[doc('Publish to GitHub Pages')]
gh-pages:
	git diff --cached --quiet
	git switch gh-pages
	git merge main -X theirs --no-commit
	{{ gleam_cmd }} clean
	just gleam_cmd="{{ gleam_cmd }}" build
	git add ./build
	git merge --continue
	git push
	git switch -
