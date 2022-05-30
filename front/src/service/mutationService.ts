import axios from 'axios';
import { Mutation, ValidationState } from './mutation.type';

class MutationService {

  public async getList(): Promise<Mutation[]> {
    const res = await axios.get('/api/mutation');
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Invalid response status: ${res.status}`);
    }
  }

  public async updateState(id: string, newState: ValidationState): Promise<void> {
    const res = await axios.put(`/api/mutation/${id}/state`, null, {
      params: {
        state: newState,
      }
    });

    if (res.status === 200) {
      return;
    } else {
      throw new Error(`Invalid response status: ${res.status}`);
    }
  }
}

export const mutationService = new MutationService();