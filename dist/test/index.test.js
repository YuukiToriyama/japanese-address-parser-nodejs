const test = require("node:test");
const assert = require("node:assert");

test("default constructor", async () => {
    const {Parser} = require("../");
    const parser = new Parser();
    const result = await parser.parse("東京都千代田区丸の内一丁目9番1号");
    assert.strictEqual(
        result.prefecture,
        "東京都"
    );
    assert.strictEqual(
        result.city,
        "千代田区"
    );
    assert.strictEqual(
        result.town,
        "丸の内一丁目"
    );
    assert.strictEqual(
        result.rest,
        "9番1号"
    );
});

test("custom factory", async () => {
    const {Parser} = require("../");
    const parser = Parser.initWithOptions({
        dataSource: "ChimeiRuiju",
        correctIncompleteCityNames: true,
        verbose: true,
    });
    const result = await parser.parse("東京都千代田区丸の内一丁目9番1号");
    assert.strictEqual(
        result.prefecture,
        "東京都"
    );
    assert.strictEqual(
        result.city,
        "千代田区"
    );
    assert.strictEqual(
        result.town,
        "丸の内一丁目"
    );
    assert.strictEqual(
        result.rest,
        "9番1号"
    );
});
