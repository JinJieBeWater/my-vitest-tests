import { describe, expect, it } from "vitest";
import { setupAuthorizedTrpc, setupTrpc } from "./utils/setupTrpc";

describe("post router", async () => {
	it("returns the correct greeting", async () => {
		const { caller } = await setupTrpc();
		const result = await caller.post.hello({
			text: "vitest",
		});
		expect(result).toMatchObject({ greeting: "Hello vitest" });
	});

	it("throws an error if not logged in", async () => {
		const { caller } = await setupTrpc();
		await expect(() =>
			caller.post.getSecretMessage(),
		).rejects.toThrowErrorMatchingInlineSnapshot("[TRPCError: UNAUTHORIZED]");
	});

	it("returns the secret message if logged in", async () => {
		const { callerAuthorized } = await setupAuthorizedTrpc();
		const result = await callerAuthorized.post.getSecretMessage();
		expect(result).toMatchInlineSnapshot(
			`"you can now see this secret message!"`,
		);
	});
});
