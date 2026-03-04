import { generateName } from "@/lib/naming/generator";

export default function Page() {
  const name = generateName();
  return (
    <div>
      {name}
    </div>
  )
}