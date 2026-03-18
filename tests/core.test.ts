import { describe, it, expect } from "vitest";
import { Fedmed } from "../src/core.js";
describe("Fedmed", () => {
  it("init", () => { expect(new Fedmed().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Fedmed(); await c.learn(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Fedmed(); await c.learn(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
