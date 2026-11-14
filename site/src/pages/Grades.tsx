import { CHARTS } from "../data/products";
import { ChartPage } from "../templates/ChartPage";

export default function Grades() {
  return <ChartPage c={CHARTS.grades} />;
}
