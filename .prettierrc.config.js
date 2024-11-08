/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	arrowParens: "always",
	bracketSameLine: false,
	printWidth: 80,
	tabWidth: 2,
	singleQuote: false,
	trailingComma: "es5",
	semi: true,
	experimentalTernaries: false,
	bracketSpacing: true,
	jsxSingleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	singleAttributePerLine: true,
	embeddedLanguageFormatting: "auto",
	printWidth: 120,
	plugins: ["prettier-plugin-organize-imports"],
};

module.exports = config;
