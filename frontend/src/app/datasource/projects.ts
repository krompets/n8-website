import { IProjects } from "../types/types";
import { OBOL } from "./projects/obol";
import { MASSA } from "./projects/massa";
import { SHARDEUM } from "./projects/shardeum";
import { KYVE } from "./projects/kyve";
import { CELESTIA } from "./projects/celestia";
import { STARKNET } from "./projects/starknet";
import { BASE } from "./projects/base";
import { ALEO } from "./projects/aleo";
import { LAMINA1 } from "./projects/lamina1";
import { NAMADA } from "./projects/namada";
import { NIBIRU } from "./projects/nibiru";
import { QUAI } from "./projects/quai";
import { ARCHWAY } from "./projects/archway";
import { IRONFISH } from "./projects/ironfish";

export const PROJECTS: IProjects = {
  obol: OBOL,
  massa: MASSA,
  shardeum: SHARDEUM,
  kyve: KYVE,
  celestia: CELESTIA,
  starknet: STARKNET,
  base: BASE,
  aleo: ALEO,
  lamina1: LAMINA1,
  namada: NAMADA,
  nibiru: NIBIRU,
  quai: QUAI,
  archway: ARCHWAY,
  ironfish: IRONFISH
};
