import { GUIDES } from "../data/guides";
import { GuidePage } from "../templates/GuidePage";

export default function GuideCert() {
  return <GuidePage g={GUIDES.cert} />;
}
