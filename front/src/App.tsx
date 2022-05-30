import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
// import './App.css';
import { MutationList } from './components/MutationList';
import { Mutation, ValidationState } from './service/mutation.type';
import { mutationService } from './service/mutationService';

function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mutations, setMutations] = useState<Mutation[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const mutations = await mutationService.getList();
        setMutations(mutations);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    })()
  }, []);

  function updateValidationState(id: string, state: ValidationState) {
    const index = mutations.findIndex(mutation => mutation.id === id);
    const updated = { ...(mutations[index]), state };

    const newArrays = [...mutations];
    newArrays[index] = updated;
    setMutations(newArrays);
  }

  return (
    <Container>
      <h1>Liste des Mutations </h1>
      {loading && <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}
      {(!loading && error) && <p>error</p>}
      {(!loading && !error) && < MutationList mutations={mutations} updateValidationState={updateValidationState} />}
    </Container>
  );
}

export default App;
