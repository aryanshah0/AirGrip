import { CHARTS } from "../data/products";
import { ChartPage } from "../templates/ChartPage";

export default function MetricChart() {
  return <ChartPage c={CHARTS.metric} />;
}
