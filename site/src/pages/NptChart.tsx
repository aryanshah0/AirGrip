import { CHARTS } from "../data/products";
import { ChartPage } from "../templates/ChartPage";

export default function NptChart() {
  return <ChartPage c={CHARTS.npt} />;
}
