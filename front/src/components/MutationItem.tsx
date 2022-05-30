import { Mutation, Sample } from '../service/mutation.type';
import { Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { GeoAlt } from 'react-bootstrap-icons';
import { AnnotationTable } from './AnnotationTable';
import { FrequencyItem } from './FrequencyItem';
import { toPercent } from '../util/percentageFormatter';
import { ValidationStateView } from './ValidationStateView';

type MutationItemProps = {
  mutation: Mutation,
  selectedAlgo: string,
  updateValidationState: Function,
}

function AltDepth({ sample }: { sample: Sample }) {
  return <span>{toPercent(sample.positiveCount / sample.count)} ({sample.positiveCount})</span>
}

export function MutationItem({ mutation, selectedAlgo, updateValidationState }: MutationItemProps) {
  const filtersWithDuplicate = mutation.supports.flatMap(support => support.filters);
  const filters = Array.from(new Set(filtersWithDuplicate));
  const sampleByAlgo = mutation.supports.find(support => support.source === selectedAlgo)?.sample;

  return <Card>
    <Card.Header>
      <Container>
        <Row>
          <Col>
            <p><GeoAlt /> <strong>{mutation.coordinates.region}</strong> : {mutation.coordinates.position}</p>
          </Col>
          <Col>
            {mutation.maxFrequency ?
              <FrequencyItem frequency={mutation.maxFrequency} />
              :
              <span>Fréquence inconnue</span>
            }
          </Col>
          <Col>
            {sampleByAlgo
              ? <span><AltDepth sample={sampleByAlgo} /></span>
              : <span>Pas détection avec {selectedAlgo}</span>}
          </Col>
          <Col>
            <Stack>{filters.map(filter => <Badge key={filter}>{filter}</Badge>)}</Stack>
          </Col>
          <Col>
            <Stack>{mutation.supports.map(support => <Badge key={support.source}>{support.source}</Badge>)}</Stack>
          </Col>
          <Col>
            <ValidationStateView mutation={mutation} updateValidationState={updateValidationState} />
          </Col>
        </Row>
      </Container>
    </Card.Header>
    <Card.Body>
      <AnnotationTable annotations={mutation.annotations}></AnnotationTable>
    </Card.Body>
  </Card >
}