import { rest } from "msw";
import { DATA_SOURCE } from "../src/data.utils";
import * as testData from "./test-data.json";

export const handlers = [
  rest.get(DATA_SOURCE, (req, res, ctx) => {
    return res(ctx.json(testData));
  }),
];
