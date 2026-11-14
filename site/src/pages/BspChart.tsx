import { CHARTS } from "../data/products";
import { ChartPage } from "../templates/ChartPage";

export default function BspChart() {
  return <ChartPage c={CHARTS.bsp} />;
}
