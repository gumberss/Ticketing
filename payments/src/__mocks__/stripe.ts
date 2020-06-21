export const stripe = {
  charges: {
    create: jest.fn()
    // return a promise
    .mockResolvedValue({id: '123'})
  }
}