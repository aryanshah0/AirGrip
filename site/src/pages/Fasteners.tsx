import { GROUPS } from "../data/products";
import { GroupPage } from "../templates/GroupPage";

export default function Fasteners() {
  return <GroupPage g={GROUPS.fasteners} />;
}
