import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x599CfB26D418E27828eb6bF22b68EC054372e489",
        abi as any,
        signer
    );
}