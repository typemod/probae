const { AssertionError } = require("./dist/index.js")

throw new AssertionError({ refrence: "test\nte\ntesasdr\nd", value: "test\ntes\ntesasr\nf\nd" })