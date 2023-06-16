import { IProjects } from "../types/types";
import { OBOL } from "./projects/obol";
import { MASSA } from "./projects/massa";
import { SHARDEUM } from "./projects/shardeum";
import { KYVE } from "./projects/kyve";
import { CELESTIA } from "./projects/celestia";
import { STARKNET } from "./projects/starknet";
import { BASE } from "./projects/base";
import { ALEO } from "./projects/aleo";

export const PROJECTS: IProjects = {
  obol: OBOL,
  massa: MASSA,
  shardeum: SHARDEUM,
  kyve: KYVE,
  celestia: CELESTIA,
  starknet: STARKNET,
  base: BASE,
  aleo: ALEO
};
