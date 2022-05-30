import { useState } from 'react';
import { Accordion, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import { Mutation, ValidationState } from '../service/mutation.type';
import { MutationItem } from './MutationItem';

type MutationListProps = {
  mutations: Mutation[],
  updateValidationState: Function,
};

export function MutationList({ mutations, updateValidationState }: MutationListProps) {

  const duplicatedAlgorithms = mutations.flatMap(mutation => mutation.supports).map(support => support.source);
  const algorithms = Array.from(new Set(duplicatedAlgorithms));
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);

  const [showNotValidated, setShowFilterNotValidated] = useState(true);
  const [showValidated, setShowFilterValidated] = useState(true);
  const [showFalseDetection, setShowFalseDetection] = useState(true);

  function handleAlgoChange(event: any) {
    setSelectedAlgo(event.target.value);
  }

  const filteredMutation = mutations.filter(mutation => {
    switch (mutation.state) {
      case ValidationState.FALSE_DETECTION: return showFalseDetection;
      case ValidationState.NOT_VALIDATED: return showNotValidated;
      case ValidationState.VALIDATED: return showValidated;
    }
  });

  return <div>
    <Container>
      <Row>
        <Col>
          Localisation
        </Col>
        <Col>
          Fréquence Max
        </Col>
        <Col>
          <label>'Alt depth' par algorithme</label>
          <Form.Select value={selectedAlgo} onChange={handleAlgoChange}>
            {algorithms.map(algo => <option key={algo}>{algo}</option>)}
          </Form.Select>
        </Col>
        <Col>
          Filters
        </Col>
        <Col>
          Algorithme
        </Col>
        <Col>
          Filtre par status
          <ButtonGroup>
            <ToggleButton
              type="checkbox"
              value={"NOT_VALIDATED"}
              checked={showNotValidated}
              onClick={() => setShowFilterNotValidated(!showNotValidated)}
              variant="outline-secondary"
            >
              ?
            </ToggleButton>
            <ToggleButton
              type="checkbox"
              value={"VALIDATED"}
              checked={showValidated}
              onClick={() => setShowFilterValidated(!showValidated)}
              variant="outline-success"
            >
              Y
            </ToggleButton>
            <ToggleButton
              type="checkbox"
              value={"FALSE_DETECTION"}
              checked={showFalseDetection}
              onClick={() => setShowFalseDetection(!showFalseDetection)}
              variant="outline-danger"
            >
              N
            </ToggleButton>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
    {filteredMutation.length === 0
      ? (
        mutations.length === 0 ?
          <div>Liste vide.</div>
          :
          <div>Aucune mutation à afficher, modifiez les filtres pour voir les mutations</div>
      )
      :
      filteredMutation.map(mutation => <MutationItem
        key={mutation.id}
        mutation={mutation}
        selectedAlgo={selectedAlgo}
        updateValidationState={updateValidationState}
      />)
    }
  </div>;
}