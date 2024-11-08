import type { Config } from "jest";

const config: Config = {
	moduleFileExtensions: ["js", "json", "ts"],
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
	coverageDirectory: "./coverage",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/shared/(.*)$": "<rootDir>/../shared/$1",
	},
};

export default config;
