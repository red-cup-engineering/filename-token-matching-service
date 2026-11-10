// Adapted from test/match-filename-token.test.mjs to import the installed package.
import assert from "node:assert/strict";
import test from "node:test";

import { matchFilenameToken } from "@red-cup-engineering/filename-token-matching-service";

const FILES = Object.freeze([
  { path: "services/witness-journal-rdf-projection-service/README.md" },
  { path: "services/witness-journal-rdf-projection-service/package.json" },
  { path: "services/witness-journal-rdf-projection-service/ops/cloud-run/README.md" },
  { path: "services/cover-nerve-rank-readout-service/README.md" },
  { path: "services/other-service/WitnessJournal.md" },
  { path: "services/other-service/src/notes.mjs" },
]);

test("FILENAME-TOKEN-QUICKSTART", () => {
  const matches = matchFilenameToken({ token: "WitnessJournal", files: FILES });
  const paths = matches.map((m) => m.path);
  assert.ok(paths.includes("services/witness-journal-rdf-projection-service/README.md"));
  assert.ok(paths.includes("services/witness-journal-rdf-projection-service/ops/cloud-run/README.md"));
  assert.equal(paths.includes("services/other-service/src/notes.mjs"), false);
});
