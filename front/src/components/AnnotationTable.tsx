import { Table } from 'react-bootstrap';
import { Annotation } from '../service/mutation.type';

type AnnotationItemProps = {
  annotations: Annotation[]
};

const gradientColors = [
  "#029406",
  "#219300",
  "#319100",
  "#3d9000",
  "#488e00",
  "#518d00",
  "#5a8b00",
  "#628900",
  "#6a8700",
  "#728500",
  "#798200",
  "#808000",
  "#887d00",
  "#8f7a00",
  "#957700",
  "#9c7400",
  "#a37000",
  "#a96c00",
  "#b06800",
  "#b66400",
  "#bc5f00",
  "#c25a00",
  "#c75400",
  "#cd4e00",
  "#d24700",
  "#d84000",
  "#dd3700",
  "#e12c00",
  "#e61e00",
  "#ea0404"
];

function computeColor(pathogenicity: number) {
  const index = Math.round(pathogenicity);
  return gradientColors[index];
}

export function AnnotationTable({ annotations }: AnnotationItemProps) {
  return <Table>
    <thead>
      <tr>
        <th>Gène</th>
        <th>Mutation</th>
        <th>Pathogénicité</th>
      </tr>
    </thead>
    <tbody>
      {annotations.map((annotation, index) => <tr key={index}>
        {annotation.gene ? <>
          <td>{annotation.gene}</td>
          <td>{annotation.mutation ?? <em>non_coding_transcript_exon_variant</em>}</td>
        </>
          :
          <td colSpan={2}><em>regulatory_region_variant</em></td>
        }
        <td style={{ backgroundColor: computeColor(annotation.pathogenicity) }}>{annotation.pathogenicity}</td>
      </tr>)}
    </tbody>
  </Table >
};