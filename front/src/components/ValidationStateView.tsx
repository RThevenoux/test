import { Badge, Button, CloseButton } from 'react-bootstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import { Mutation, ValidationState } from '../service/mutation.type';
import { mutationService } from '../service/mutationService';

export function ValidationStateView({ mutation, updateValidationState }: { mutation: Mutation, updateValidationState: Function }) {

  async function handleClickValidate(e:any) {
    e.preventDefault();
    await mutationService.updateState(mutation.id, ValidationState.VALIDATED);
    updateValidationState(mutation.id, ValidationState.VALIDATED);
  }

  async function handleClickFalse() {
    await mutationService.updateState(mutation.id, ValidationState.FALSE_DETECTION);
    updateValidationState(mutation.id, ValidationState.FALSE_DETECTION);
  }

  async function handleClickRemove() {
    await mutationService.updateState(mutation.id, ValidationState.NOT_VALIDATED);
    updateValidationState(mutation.id, ValidationState.NOT_VALIDATED);
  }

  if (mutation.state === ValidationState.NOT_VALIDATED) {
    return <>
      <Button variant="outline-success" onClick={handleClickValidate}>
        <CheckLg /> Valide
      </Button>
      <Button variant="outline-danger" onClick={handleClickFalse}>
        <XLg /> Fausse détection
      </Button>
    </>
  }


  return <Badge bg={mutation.state === ValidationState.VALIDATED ? "success" : "danger"}>
    {mutation.state === ValidationState.VALIDATED ? "Valide" : "Fausse détection"}{' '}
    <CloseButton onClick={handleClickRemove} />
  </Badge>
}