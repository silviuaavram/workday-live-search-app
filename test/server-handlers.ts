import { rest } from "msw";
import { DATA_SOURCE } from "../src/data.utils";
import { data } from "./test-data";

export const handlers = [
  rest.get(DATA_SOURCE, (req, res, ctx) => {
    return res(ctx.json(data));
  }),
];
