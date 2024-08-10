import { KinDeviation } from "../kinematic_deviation";
import { displaySelectedImpairment } from "../selectedimpairment";

export interface InsightList{
    kinematic:KinDeviation,
    impairments:displaySelectedImpairment[]
}