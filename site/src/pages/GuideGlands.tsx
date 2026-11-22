import { GUIDES } from "../data/guides";
import { GuidePage } from "../templates/GuidePage";

export default function GuideGlands() {
  return <GuidePage g={GUIDES.glands} />;
}
