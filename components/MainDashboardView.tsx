import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateOneThousandRandomNames } from "@/lib/naming/generator";
import EthnicityPieChart from "./EthnicityPieChart";
import NameFrequencyChart from "./NameFrequencyChart";

export default async function MainDashboardView() {
  const names = generateOneThousandRandomNames();
  const metrics = {
    totalNames: names.length,
    numberOfMales: names.filter(name => name.gender === 'male').length,
    numberOfFemales: names.filter(name => name.gender === 'female').length,
    numberOfWhites: names.filter(name => name.ethnicity === 'white').length,
    numberOfLatinos: names.filter(name => name.ethnicity === 'latino').length,
    numberOfBlacks: names.filter(name => name.ethnicity === 'black').length,
    numberOfAsians: names.filter(name => name.ethnicity === 'asian').length,
    numberOfNativeAmericans: names.filter(name => name.ethnicity === 'nativeAmerican').length,
    numberOfMenas: names.filter(name => name.ethnicity === 'mena').length,
    numberOfPacificIslanders: names.filter(name => name.ethnicity === 'pacificIslander').length,
    numberWithOneGivenName: names.filter(name => name.numberOfGivenNames === 1).length,
    numberWithTwoGivenNames: names.filter(name => name.numberOfGivenNames === 2).length,
    numberWithThreeGivenNames: names.filter(name => name.numberOfGivenNames === 3).length,
    numberWithFourGivenNames: names.filter(name => name.numberOfGivenNames === 4).length,
  };


  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row space-x-4">
        <NameFrequencyChart names={names} />
        <EthnicityPieChart metrics={metrics} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Ethnicity</TableHead>
            <TableHead>Number of Given Names</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {names.map((name, index) => (
            <TableRow key={index}>
              <TableCell>{name.name}</TableCell>
              <TableCell>{name.gender}</TableCell>
              <TableCell>{name.ethnicity}</TableCell>
              <TableCell>{name.numberOfGivenNames}</TableCell>
            </TableRow >
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

